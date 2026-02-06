"use client";

import { useState } from "react";
import { AttendeeTable } from "@/components/admin/AttendeeTable";
import { ReferralCodeTable } from "@/components/admin/ReferralCodeTable";

type Tab = "attendees" | "referral-codes";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>("attendees");

  return (
    <div className="min-h-screen bg-[var(--color-bg-900)]">
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
        <div className="flex gap-1 mb-6 border-b border-[var(--color-border-700)]">
          <TabButton
            active={activeTab === "attendees"}
            onClick={() => setActiveTab("attendees")}
          >
            Attendees
          </TabButton>
          <TabButton
            active={activeTab === "referral-codes"}
            onClick={() => setActiveTab("referral-codes")}
          >
            Referral Codes
          </TabButton>
        </div>

        {activeTab === "attendees" && <AttendeeTable />}
        {activeTab === "referral-codes" && <ReferralCodeTable />}
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
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
