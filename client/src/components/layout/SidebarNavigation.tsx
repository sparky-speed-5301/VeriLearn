import { Link, useLocation } from "wouter";
import { VeriLearnLogo } from "./VeriLearnLogo";

const primary = [
  { href: "/workspace", label: "Workspace", icon: "⌂" },
  { href: "/workspace/upload", label: "Add lecture", icon: "+" },
];

export function SidebarNavigation({ onNavigate }: { onNavigate?: () => void }) {
  const [location] = useLocation();
  return (
    <aside className="sidebar" aria-label="Workspace navigation">
      <div className="sidebar-top">
        <VeriLearnLogo />
        <span className="sidebar-kicker">EVIDENCE PRISM STUDIO</span>
      </div>
      <nav className="sidebar-nav">
        <span className="nav-label">Navigate</span>
        {primary.map((item) => {
          const active = location === item.href || (item.href === "/workspace" && location.startsWith("/lecture"));
          return (
            <Link key={item.href} href={item.href} onClick={onNavigate} className={`nav-item ${active ? "active" : ""}`}>
              <span className="nav-icon" aria-hidden="true">{item.icon}</span>
              <span>{item.label}</span>
              {active && <span className="nav-active-line" aria-hidden="true" />}
            </Link>
          );
        })}
        <span className="nav-label nav-label-spaced">Workspace</span>
        <Link href="/lecture/attention-mechanisms" onClick={onNavigate} className={`nav-item ${location.startsWith("/lecture") ? "active" : ""}`}>
          <span className="nav-icon" aria-hidden="true">◫</span>
          <span className="nav-item-truncate">Attention mechanisms</span>
        </Link>
        <Link href="/lecture/attention-mechanisms/concepts" onClick={onNavigate} className={`nav-item ${location.endsWith("/concepts") ? "active" : ""}`}>
          <span className="nav-icon" aria-hidden="true">◇</span>
          <span>Concept library</span>
        </Link>
        <Link href="/lecture/attention-mechanisms/quiz" onClick={onNavigate} className={`nav-item ${location.endsWith("/quiz") ? "active" : ""}`}>
          <span className="nav-icon" aria-hidden="true">?</span>
          <span>Grounded quiz</span>
        </Link>
      </nav>
      <div className="sidebar-bottom">
        <div className="workspace-stamp">
          <span className="status-dot supported" />
          <div><strong>Personal workspace</strong><span>Demo mode · local data</span></div>
        </div>
        <Link href="/settings" onClick={onNavigate} className={`nav-item settings-link ${location === "/settings" ? "active" : ""}`}>
          <span className="nav-icon" aria-hidden="true">⚙</span><span>Settings</span>
        </Link>
      </div>
    </aside>
  );
}
