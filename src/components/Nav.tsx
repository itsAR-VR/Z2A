"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { Button } from "./Button";

const navLinks = [
  { id: "why", label: "Why" },
  { id: "speakers", label: "Speakers" },
  { id: "outcomes", label: "Outcomes" },
  { id: "how", label: "How" },
  { id: "agenda", label: "Agenda" },
  { id: "pricing", label: "Pricing" },
  { id: "faq", label: "FAQ" },
];

const sectionIds = ["top", ...navLinks.map((l) => l.id), "apply"];

export function Nav() {
  const activeId = useScrollSpy(sectionIds);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[var(--color-bg-900)]/95 backdrop-blur-md border-b border-[var(--color-border-700)]"
            : "bg-transparent"
        }`}
      >
        <div className="container-content flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link
            href="/"
            className="font-heading font-bold text-lg text-[var(--color-text-100)] hover:text-[var(--color-accent-500)] transition-colors"
          >
            Zero-to-Agent
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`text-sm font-medium transition-colors duration-200 ${
                  activeId === link.id
                    ? "text-[var(--color-accent-500)]"
                    : "text-[var(--color-text-300)] hover:text-[var(--color-text-100)]"
                }`}
              >
                {link.label}
              </a>
            ))}
            <Button href="/apply" className="ml-2 text-xs px-4 py-2">
              Apply
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 text-[var(--color-text-100)] cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile overlay menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[var(--color-bg-900)] flex flex-col items-center justify-center gap-6 animate-fade-in">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`font-heading text-2xl font-semibold transition-colors ${
                activeId === link.id
                  ? "text-[var(--color-accent-500)]"
                  : "text-[var(--color-text-100)]"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Button href="/apply" className="mt-4" onClick={() => setMenuOpen(false)}>
            Apply / Reserve Seat
          </Button>
        </div>
      )}
    </>
  );
}
