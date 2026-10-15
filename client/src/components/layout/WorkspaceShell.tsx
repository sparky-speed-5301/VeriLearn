import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "wouter";
import { SidebarNavigation } from "./SidebarNavigation";

export function WorkspaceShell({ children, eyebrow, title, action }: { children: ReactNode; eyebrow?: string; title?: string; action?: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileTriggerRef = useRef<HTMLButtonElement>(null);
  const wasMobileOpen = useRef(false);
  useEffect(() => {
    if (!mobileOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setMobileOpen(false); };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [mobileOpen]);
  useEffect(() => {
    if (mobileOpen) {
      window.requestAnimationFrame(() => document.querySelector<HTMLElement>("#mobile-navigation a, #mobile-navigation button")?.focus());
    } else if (wasMobileOpen.current) {
      mobileTriggerRef.current?.focus();
    }
    wasMobileOpen.current = mobileOpen;
  }, [mobileOpen]);
  return (
    <div className="app-shell">
      <div id="mobile-navigation" className={`mobile-sidebar ${mobileOpen ? "open" : ""}`} aria-hidden={!mobileOpen}>{mobileOpen && <SidebarNavigation onNavigate={() => setMobileOpen(false)} />}</div>
      {mobileOpen && <button className="mobile-scrim" aria-label="Close navigation" onClick={() => setMobileOpen(false)} />}
      <div className="desktop-sidebar"><SidebarNavigation /></div>
      <main className="main-canvas">
        <header className="mobile-topbar">
          <button ref={mobileTriggerRef} className="icon-button" onClick={() => setMobileOpen(true)} aria-label="Open navigation" aria-expanded={mobileOpen} aria-controls="mobile-navigation">☰</button>
          <Link href="/workspace" className="mobile-title">verilearn</Link>
          <Link href="/workspace/upload" className="icon-button" aria-label="Add lecture">+</Link>
        </header>
        {(eyebrow || title || action) && <div className="page-head">
          <div>{eyebrow && <span className="eyebrow">{eyebrow}</span>}{title && <h1>{title}</h1>}</div>
          {action && <div className="page-head-action">{action}</div>}
        </div>}
        {children}
      </main>
    </div>
  );
}
