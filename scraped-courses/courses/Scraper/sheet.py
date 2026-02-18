import os
import re
import json
import io
import logging
import time
from pathlib import Path

import gspread
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseDownload
from googleapiclient.errors import HttpError

# === Configuration ===
SERVICE_ACCOUNT_FILE = 'scraper-458904-eef209196d3b.json'
SPREADSHEET_ID = '1h46f1mzygm3FJkJLk0ck3GdcnxB_0Jbx9p9NZ6KKwlM'
SHEET_NAME = 'Asset Tracker'
MAIN_FOLDER = Path('Downloaded_Drive_Assets')
STATE_FILE = Path('download_state.json')
LOG_FILE = Path('download.log')

# Setup logging
logging.basicConfig(
    filename=LOG_FILE,
    level=logging.INFO,
    format='%(asctime)s %(levelname)s: %(message)s'
)

# === Helpers ===


def load_state():
    if STATE_FILE.exists():
        return json.loads(STATE_FILE.read_text())
    return {'completed_folders': [], 'processed_count': 0}


def save_state(state):
    STATE_FILE.write_text(json.dumps(state, indent=2))


def extract_folder_id(url):
    m = re.search(r'drive\.google\.com/(?:drive/)?folders/([\w-]+)', url)
    return m.group(1) if m else None


def sanitize_filename(name):
    return re.sub(r'[\\/*?"<>|: ]+', '_', name)


def download_file(service, file_id, orig_name, dest_folder):
    safe_name = sanitize_filename(Path(orig_name).stem)
    ext = Path(orig_name).suffix
    new_name = f"{safe_name}_{file_id}{ext}"
    out_path = dest_folder / new_name
    if out_path.exists():
        logging.info(f"Already downloaded: {out_path}")
        return

    try:
        request = service.files().get_media(fileId=file_id)
        fh = io.FileIO(out_path, 'wb')
        downloader = MediaIoBaseDownload(fh, request)
        done = False
        while not done:
            status, done = downloader.next_chunk()
        logging.info(f"Downloaded: {new_name}")
    except Exception as e:
        logging.error(f"Error downloading {orig_name}: {e}")


def download_folder_recursive(service, folder_id, parent_path):
    try:
        meta = service.files().get(
            fileId=folder_id,
            fields='name',
            supportsAllDrives=True
        ).execute()
        fname = sanitize_filename(meta['name'])
        folder_path = parent_path / fname
        folder_path.mkdir(parents=True, exist_ok=True)

        query = f"'{folder_id}' in parents and trashed=false"
        res = service.files().list(
            q=query,
            supportsAllDrives=True,
            includeItemsFromAllDrives=True,
            fields='files(id,name,mimeType)'
        ).execute()

        for item in res.get('files', []):
            if item['mimeType'] == 'application/vnd.google-apps.folder':
                download_folder_recursive(service, item['id'], folder_path)
            else:
                download_file(service, item['id'], item['name'], folder_path)
    except HttpError as e:
        logging.error(f"API error for folder {folder_id}: {e}")
    except Exception as e:
        logging.error(f"Unexpected error for folder {folder_id}: {e}")

# === Main ===


def main():
    MAIN_FOLDER.mkdir(exist_ok=True)
    state = load_state()

    creds = Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE,
        scopes=[
            'https://www.googleapis.com/auth/spreadsheets.readonly',
            'https://www.googleapis.com/auth/drive.readonly'
        ]
    )
    gc = gspread.authorize(creds)
    drive_service = build('drive', 'v3', credentials=creds)

    sheet = gc.open_by_key(SPREADSHEET_ID).worksheet(SHEET_NAME)
    links = sheet.col_values(5)[1:]
    total_links = len(links)
    start_time = time.time()

    for idx, url in enumerate(links, start=1):
        fid = extract_folder_id(url)
        if not fid:
            logging.warning(f"Invalid link skipped: {url}")
        elif fid not in state['completed_folders']:
            download_folder_recursive(drive_service, fid, MAIN_FOLDER)
            state['completed_folders'].append(fid)
        state['processed_count'] += 1
        save_state(state)

        elapsed = time.time() - start_time
        print(f"Processed {idx}/{total_links} links | Elapsed {elapsed:.1f}s")

    total_elapsed = time.time() - start_time
    print(
        f"All done: {state['processed_count']} of {total_links} links processed in {total_elapsed:.1f}s")
    print("Check download.log for details.")


if __name__ == "__main__":
    main()
