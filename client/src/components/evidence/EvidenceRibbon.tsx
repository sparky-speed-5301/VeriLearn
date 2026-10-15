import type { EvidenceBackedConcept, EvidenceReference } from "../../../../shared/types";
import { formatTime, percent } from "../../lib/format";
import { StatusBadge } from "../ui/StatusBadge";
import { ConfidenceMeter } from "./ConfidenceMeter";

export function EvidenceRibbon({ concept, evidence, onOpenSource, onReview, compact = false }: { concept: EvidenceBackedConcept; evidence?: EvidenceReference; onOpenSource?: (evidence: EvidenceReference) => void; onReview?: () => void; compact?: boolean }) {
  const source = evidence ?? concept.evidence[0];
  return <article className={`evidence-ribbon ribbon-${concept.verificationStatus} ${compact ? "ribbon-compact" : ""}`}>
    <div className="ribbon-rule" aria-hidden="true" />
    <div className="ribbon-topline"><span className="eyebrow">EVIDENCE RIBBON / {source ? source.segmentId.toUpperCase() : "NO SOURCE"}</span><StatusBadge status={concept.verificationStatus} compact /></div>
    <div className="ribbon-grid">
      <div className="ribbon-concept"><span className="tiny-label">CLAIM UNDER INSPECTION</span><h3>{concept.title}</h3><p>{concept.explanation}</p></div>
      <div className="ribbon-source">
        <span className="tiny-label">SOURCE MOMENT</span>
        {source ? <>
          <button className="timestamp-button" onClick={() => onOpenSource?.(source)} aria-label={`Open source at ${formatTime(source.startMs)}`}><span className="play-mark" aria-hidden="true">▶</span>{formatTime(source.startMs)} — {formatTime(source.endMs)}</button>
          <blockquote>“{source.quote}”</blockquote>
          <div className="source-meta"><span className="mono">{source.segmentId}</span><span>Support {percent(source.supportScore)}</span></div>
        </> : <div className="empty-source"><span className="empty-source-mark">—</span><span>No reliable source moment found for this claim.</span></div>}
      </div>
    </div>
    {!compact && <div className="ribbon-footer"><ConfidenceMeter value={concept.confidence} label="Model confidence" tone={concept.verificationStatus === "unverified" ? "red" : concept.verificationStatus === "needs_review" ? "amber" : undefined} /><div className="ribbon-actions"><button className="text-button" onClick={() => source && onOpenSource?.(source)} disabled={!source}>Open source ↗</button>{onReview && <button className="button button-small button-outline" onClick={onReview}>{concept.verificationStatus === "needs_review" ? "Mark reviewed" : "Review claim"}</button>}</div></div>}
  </article>;
}
