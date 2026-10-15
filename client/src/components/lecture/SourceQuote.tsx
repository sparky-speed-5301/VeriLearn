import { formatTime } from "../../lib/format";
import type { EvidenceReference } from "../../../../shared/types";

export function SourceQuote({ evidence, onOpen }: { evidence: EvidenceReference; onOpen?: () => void }) {
  return <button className="source-quote" onClick={onOpen} aria-label={`Open source quote at ${formatTime(evidence.startMs)}`}>
    <span className="source-quote-meta"><span className="mono">{evidence.segmentId}</span><span className="mono">{formatTime(evidence.startMs)}</span></span>
    <span>“{evidence.quote}”</span>
  </button>;
}
