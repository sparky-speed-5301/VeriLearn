import { useMemo, useState } from "react";
import type { EvidenceReference, TranscriptSegment } from "../../../../shared/types";
import { formatTime, percent } from "../../lib/format";

export function TranscriptViewer({ segments, selectedId, onSelect, onFlag, onOpenSource }: { segments: TranscriptSegment[]; selectedId?: string; onSelect: (segment: TranscriptSegment) => void; onFlag?: (id: string) => void; onOpenSource?: (evidence: EvidenceReference) => void }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => segments.filter((segment) => segment.text.toLowerCase().includes(query.toLowerCase())), [segments, query]);
  return <section className="transcript-panel panel-lined">
    <div className="panel-heading"><div><span className="eyebrow">02 / TRANSCRIPT</span><h2>Source record</h2></div><span className="mono muted">{filtered.length} segments</span></div>
    <div className="transcript-toolbar"><label className="search-field"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find in transcript" aria-label="Find in transcript" />{query && <button onClick={() => setQuery("")} aria-label="Clear search">×</button>}</label><span className="transcript-hint mono">⌘ K</span></div>
    <div className="transcript-list">
      {filtered.map((segment, index) => <TranscriptSegmentRow key={segment.id} segment={segment} index={index} selected={selectedId === segment.id} onSelect={() => onSelect(segment)} onFlag={() => onFlag?.(segment.id)} onOpenSource={() => onOpenSource?.({ segmentId: segment.id, quote: segment.text, startMs: segment.startMs, endMs: segment.endMs, supportScore: segment.confidence })} />)}
      {filtered.length === 0 && <div className="empty-state compact-empty"><span className="empty-number">00</span><h3>No source moments found</h3><p>Try a different phrase. Search only scans the demo transcript.</p></div>}
    </div>
  </section>;
}

function TranscriptSegmentRow({ segment, index, selected, onSelect, onFlag, onOpenSource }: { segment: TranscriptSegment; index: number; selected: boolean; onSelect: () => void; onFlag: () => void; onOpenSource: () => void }) {
  return <article className={`transcript-segment ${selected ? "selected" : ""}`} role="button" aria-pressed={selected} onClick={onSelect} tabIndex={0} onKeyDown={(event) => { if (event.target !== event.currentTarget) return; if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onSelect(); } }}>
    <div className="segment-gutter"><button className="timestamp-button timestamp-quiet" onClick={(event) => { event.stopPropagation(); onOpenSource(); }}><span className="segment-number">{String(index + 1).padStart(2, "0")}</span>{formatTime(segment.startMs)}</button><span className={`confidence-chip ${segment.confidence < 0.9 ? "confidence-low" : ""}`}>{percent(segment.confidence)}</span></div>
    <div className="segment-body"><p>{segment.text}</p><div className="segment-actions"><button className="segment-action" onClick={(event) => { event.stopPropagation(); onOpenSource(); }}>Open source ↗</button><button className="segment-action" onClick={(event) => { event.stopPropagation(); onFlag(); }}>{segment.isFlagged ? "Flagged" : "Flag segment"}</button></div></div>
    {selected && <span className="segment-selected-mark" aria-label="Selected segment">●</span>}
  </article>;
}
