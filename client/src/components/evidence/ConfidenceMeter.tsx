import { percent } from "../../lib/format";

export function ConfidenceMeter({ value, label = "Confidence", tone }: { value: number; label?: string; tone?: "blue" | "amber" | "red" }) {
  const meterTone = tone ?? (value >= 0.85 ? "blue" : value >= 0.6 ? "amber" : "red");
  return <div className="confidence-meter">
    <div className="confidence-label"><span>{label}</span><span className="mono">{percent(value)}</span></div>
    <div className="meter-track" aria-label={`${label}: ${percent(value)}`} role="meter" aria-valuenow={Math.round(value * 100)} aria-valuemin={0} aria-valuemax={100}><span className={`meter-fill meter-${meterTone}`} style={{ width: `${value * 100}%` }} /></div>
  </div>;
}
