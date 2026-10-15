import type { EvidenceReference } from "../../../../shared/types";
import { formatTime } from "../../lib/format";

const bars = [18, 26, 34, 22, 40, 57, 38, 28, 46, 31, 54, 68, 42, 30, 48, 63, 38, 24, 35, 55, 44, 28, 49, 64, 34, 23, 39, 52, 31, 45, 61, 37, 27, 44, 60, 42, 26, 38, 53, 32, 48, 63, 35, 25, 40, 56, 44, 29, 46, 58, 32, 22, 37, 53, 41, 25, 45, 60, 34, 27, 42, 58, 37, 23, 39, 56, 44, 29, 48, 63, 35, 24, 40, 54, 42, 27, 44, 57, 33, 24, 38, 53, 41, 28, 47, 60, 36, 22, 40, 56, 31, 45, 58];

export function WaveformMock({ currentMs = 586000, durationMs = 2734000, markers = [], onSeek }: { currentMs?: number; durationMs?: number; markers?: EvidenceReference[]; onSeek?: (ms: number) => void }) {
  const currentPercent = (currentMs / durationMs) * 100;
  return <div className="waveform-wrap">
    <div className="waveform-head"><span className="eyebrow">SOURCE AUDIO / VISUAL INDEX</span><span className="mono">{formatTime(currentMs)} / {formatTime(durationMs)}</span></div>
    <div className="waveform" role="slider" aria-label="Lecture timeline" aria-valuemin={0} aria-valuemax={durationMs} aria-valuenow={currentMs} tabIndex={0} onClick={(event) => { const rect = event.currentTarget.getBoundingClientRect(); onSeek?.(Math.round(((event.clientX - rect.left) / rect.width) * durationMs)); }} onKeyDown={(event) => { if (event.key === "ArrowRight") onSeek?.(Math.min(durationMs, currentMs + 10000)); if (event.key === "ArrowLeft") onSeek?.(Math.max(0, currentMs - 10000)); }}>
      <span className="waveform-progress" style={{ width: `${currentPercent}%` }} />
      {bars.map((height, index) => <span key={index} className="wave-bar" style={{ height: `${height}%` }} />)}
      {markers.map((marker) => <button key={marker.segmentId} className="wave-marker" style={{ left: `${(marker.startMs / durationMs) * 100}%` }} onClick={(event) => { event.stopPropagation(); onSeek?.(marker.startMs); }} aria-label={`Evidence marker ${marker.segmentId} at ${formatTime(marker.startMs)}`} />)}
    </div>
    <div className="waveform-ticks"><span>00:00</span><span>09:06</span><span>18:12</span><span>27:18</span><span>45:34</span></div>
  </div>;
}
