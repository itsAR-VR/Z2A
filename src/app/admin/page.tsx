"use client";

import { useId, useState } from "react";
import { AttendeeTable } from "@/components/admin/AttendeeTable";
import { EmailSender } from "@/components/admin/EmailSender";
import { ReferralCodeTable } from "@/components/admin/ReferralCodeTable";
import { WaitlistTable } from "@/components/admin/WaitlistTable";

type Tab = "attendees" | "referral-codes" | "waitlist" | "emails";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>("attendees");
  const [forcedNetworkCode, setForcedNetworkCode] = useState<string | null>(null);
  const ids = useId();

  const tabs: Array<{
    value: Tab;
    label: string;
    tabId: string;
    panelId: string;
  }> = [
    {
      value: "attendees",
      label: "Attendees",
      tabId: `${ids}-tab-attendees`,
      panelId: `${ids}-panel-attendees`,
    },
    {
      value: "referral-codes",
      label: "Referral Codes",
      tabId: `${ids}-tab-referral`,
      panelId: `${ids}-panel-referral`,
    },
    {
      value: "waitlist",
      label: "Waitlist",
      tabId: `${ids}-tab-waitlist`,
      panelId: `${ids}-panel-waitlist`,
    },
    {
      value: "emails",
      label: "Emails",
      tabId: `${ids}-tab-emails`,
      panelId: `${ids}-panel-emails`,
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="hero-orb hero-orb--left animate-drift opacity-85" />
        <div className="hero-orb hero-orb--right animate-drift-slow opacity-85" />
        <div className="hero-orb hero-orb--center animate-drift opacity-85" />
        <div className="hero-orb hero-orb--bottom animate-drift-slow opacity-85" />
        <div className="hero-plane hero-plane--left animate-drift opacity-55" />
        <div className="hero-plane hero-plane--right animate-drift-slow opacity-55" />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] opacity-70">
        <div className="hero-frost-overlay hero-frost-overlay--horizon" />
      </div>

      <div className="relative z-10 min-h-screen bg-[var(--color-bg-900)]/80">
        <div className="border-b border-[var(--color-border-700)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="font-heading font-bold text-xl text-[var(--color-text-100)]">
                Zero-to-Agent Admin
              </h1>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          {/* Tabs */}
          <div
            role="tablist"
            aria-label="Admin sections"
            className="flex gap-1 mb-6 border-b border-[var(--color-border-700)]"
          >
            {tabs.map((t, idx) => (
              <TabButton
                key={t.value}
                id={t.tabId}
                controls={t.panelId}
                active={activeTab === t.value}
                onClick={() => setActiveTab(t.value)}
                onKeyDown={(e) => {
                  const key = e.key;
                  if (
                    key !== "ArrowLeft" &&
                    key !== "ArrowRight" &&
                    key !== "Home" &&
                    key !== "End"
                  ) {
                    return;
                  }
                  e.preventDefault();

                  let nextIdx = idx;
                  if (key === "ArrowLeft") nextIdx = (idx - 1 + tabs.length) % tabs.length;
                  if (key === "ArrowRight") nextIdx = (idx + 1) % tabs.length;
                  if (key === "Home") nextIdx = 0;
                  if (key === "End") nextIdx = tabs.length - 1;

                  const next = tabs[nextIdx];
                  setActiveTab(next.value);
                  requestAnimationFrame(() => {
                    document.getElementById(next.tabId)?.focus();
                  });
                }}
              >
                {t.label}
              </TabButton>
            ))}
          </div>

          <div
            id={tabs[0].panelId}
            role="tabpanel"
            aria-labelledby={tabs[0].tabId}
            hidden={activeTab !== tabs[0].value}
          >
            <AttendeeTable forcedNetworkCode={forcedNetworkCode} />
          </div>
          <div
            id={tabs[1].panelId}
            role="tabpanel"
            aria-labelledby={tabs[1].tabId}
            hidden={activeTab !== tabs[1].value}
          >
            <ReferralCodeTable
              onFilterByCode={(code) => {
                setForcedNetworkCode(code);
                setActiveTab("attendees");
              }}
            />
          </div>
          <div
            id={tabs[2].panelId}
            role="tabpanel"
            aria-labelledby={tabs[2].tabId}
            hidden={activeTab !== tabs[2].value}
          >
            <WaitlistTable />
          </div>
          <div
            id={tabs[3].panelId}
            role="tabpanel"
            aria-labelledby={tabs[3].tabId}
            hidden={activeTab !== tabs[3].value}
          >
            <EmailSender />
          </div>
        </div>
      </div>
    </div>
  );
}

function TabButton({
  id,
  controls,
  active,
  onClick,
  onKeyDown,
  children,
}: {
  id: string;
  controls: string;
  active: boolean;
  onClick: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
}) {
  return (
    <button
      id={id}
      type="button"
      onClick={onClick}
      onKeyDown={onKeyDown}
      role="tab"
      aria-selected={active}
      aria-controls={controls}
      tabIndex={active ? 0 : -1}
      className={`px-4 py-2 text-sm font-medium transition-colors cursor-pointer -mb-px ${
        active
          ? "text-[var(--color-accent-500)] border-b-2 border-[var(--color-accent-500)]"
          : "text-[var(--color-text-500)] hover:text-[var(--color-text-300)]"
      }`}
    >
      {children}
    </button>
  );
}
