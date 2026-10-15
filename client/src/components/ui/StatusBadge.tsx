import type { VerificationStatus } from "../../../../shared/types";

const labels: Record<VerificationStatus, string> = {
  supported: "Supported",
  partially_supported: "Partially supported",
  needs_review: "Needs review",
  unverified: "Unverified",
};

export function StatusBadge({ status, compact = false }: { status: VerificationStatus; compact?: boolean }) {
  return <span className={`status-badge status-${status} ${compact ? "compact" : ""}`}><span className="status-dot" aria-hidden="true" />{labels[status]}</span>;
}

export function ProcessingBadge({ status }: { status: string }) {
  const label = status === "ready" ? "Ready" : status === "failed" ? "Failed" : status === "processing" || status === "indexing" ? "Processing" : status;
  return <span className={`processing-badge processing-${status}`}><span className="status-dot" aria-hidden="true" />{label}</span>;
}
