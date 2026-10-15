export function VeriLearnLogo({ compact = false }: { compact?: boolean }) {
  return (
    <a href="http://localhost:3100/" className="brand-mark" aria-label="VeriLearn home">
      <span className="brand-glyph" aria-hidden="true"><span>V</span></span>
      {!compact && <span className="brand-name">verilearn</span>}
    </a>
  );
}
