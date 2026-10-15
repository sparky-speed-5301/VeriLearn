import { useState } from "react";
import { Link } from "wouter";
import { VeriLearnLogo } from "../components/layout/VeriLearnLogo";
import { StatusBadge } from "../components/ui/StatusBadge";

interface CockpitMoment {
  id: string;
  seg: string;
  time: string;
  title: string;
  quote: string;
  citationId: string;
  accuracy: string;
  status: "supported" | "unverified" | "needs_review" | "partially_supported";
}

const cockpitMoments: CockpitMoment[] = [
  {
    id: "m1",
    seg: "seg-06",
    time: "09:46 — 11:44",
    title: "Self-Attention Weighted Mixture",
    quote: "“That weighted mixture is self-attention: each position updates its representation using information from the other positions in the same sequence.”",
    citationId: "[cite 1]",
    accuracy: "99.8% Grounded",
    status: "supported",
  },
  {
    id: "m2",
    seg: "seg-08",
    time: "14:00 — 16:12",
    title: "Quadratic Compute Bound",
    quote: "“The context window is the bounded number of tokens available to one forward pass. More context is not free: the attention matrix grows with the number of positions quadratically.”",
    citationId: "[cite 2]",
    accuracy: "96.4% Grounded",
    status: "supported",
  },
  {
    id: "m3",
    seg: "seg-12",
    time: "22:15 — 24:30",
    title: "Multi-Head Subspace Projection",
    quote: "“Multi-head attention allows the model to jointly attend to information from different representation subspaces at different positions.”",
    citationId: "[cite 3]",
    accuracy: "98.2% Grounded",
    status: "supported",
  },
];

const faqs = [
  {
    q: "How does VeriLearn eliminate AI hallucinations in technical subjects?",
    a: "Unlike generic chat models that guess or extrapolate facts, VeriLearn enforces strict provenance. Every claim must anchor directly to a verified transcript timestamp and page coordinate. If an idea was not explicitly stated in the source, it is marked as unsupported rather than invented.",
  },
  {
    q: "What types of lecture materials can I upload?",
    a: "VeriLearn supports audio recordings (MP3, WAV, M4A), lecture slide decks (PDF), technical textbook chapters, and direct video transcript inputs with millisecond timestamp indexing.",
  },
  {
    q: "How does the active recall quiz studio work?",
    a: "Our engine analyzes the conceptual graph extracted from your lectures to formulate targeted diagnostic questions. Every quiz answer links back to the exact lecture segment where the concept was taught so you can immediately review weak spots.",
  },
  {
    q: "Can I cross-reference across multiple lectures and courses?",
    a: "Yes! In your VeriLearn Workspace, you can organize notebooks by course, semester, or research topic. The evidence engine seamlessly cross-references ideas across multiple lectures without information silos.",
  },
];

export default function Home() {
  const [activeMoment, setActiveMoment] = useState<CockpitMoment>(cockpitMoments[0]);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="landing-page" style={{ minHeight: "100vh", background: "var(--bg-app)" }}>
      {/* Outstand Sticky Navbar */}
      <header className="landing-nav">
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <VeriLearnLogo />
          <span style={{ background: "var(--blue-soft)", color: "var(--blue-primary)", border: "1px solid #233b66", padding: "0.2rem 0.6rem", borderRadius: "6px", fontSize: "0.72rem", fontWeight: 700, fontFamily: "var(--mono)" }}>
            OUTSTAND v2.4
          </span>
        </div>

        <nav className="landing-nav-links">
          <a href="#cockpit">Cockpit</a>
          <a href="#features">Features</a>
          <a href="#pipeline">Workflow</a>
          <a href="#comparison">Proof Matrix</a>
          <a href="#faq">FAQ</a>
          <Link href="/workspace" className="button button-small button-primary">
            Enter Workspace →
          </Link>
        </nav>
      </header>

      <main>
        {/* Outstand Hero Stage */}
        <section className="outstand-hero-wrap">
          <div className="outstand-pill-badge">
            <span className="outstand-pill-dot" />
            <span>GROUNDED LECTURE INTELLIGENCE ENGINE • RIGOROUS EVIDENCE</span>
          </div>

          <h1 className="outstand-hero-title">
            Where Technical Lectures Become <span className="accent">Verifiable Knowledge</span>.
          </h1>

          <p className="outstand-hero-lede">
            VeriLearn transforms dense university lectures, research seminars, and textbooks into an interactive evidence cockpit. Every generated takeaway is anchored to the exact spoken second. Zero hallucinations.
          </p>

          <div className="outstand-hero-cta">
            <Link href="/workspace" className="button button-primary" style={{ padding: "0.85rem 1.8rem", fontSize: "0.95rem" }}>
              Launch Workspace Now →
            </Link>
            <Link href="/lecture/attention-mechanisms" className="button button-dark" style={{ padding: "0.85rem 1.6rem", fontSize: "0.95rem" }}>
              Explore Live Demo Studio
            </Link>
          </div>

          {/* Social Proof / Metrics Bar */}
          <div className="outstand-stats-bar">
            <div className="outstand-stat-item">
              <strong>99.8%</strong>
              <span>PROVENANCE ACCURACY</span>
            </div>
            <div className="outstand-stat-item">
              <strong>0%</strong>
              <span>HALLUCINATION DRIFT</span>
            </div>
            <div className="outstand-stat-item">
              <strong>1-Click</strong>
              <span>VERBATIM AUDIO SYNC</span>
            </div>
            <div className="outstand-stat-item">
              <strong>10x</strong>
              <span>FASTER EXAM RECALL</span>
            </div>
          </div>

          {/* Outstand Product Cockpit Interactive Frame */}
          <div className="outstand-cockpit" id="cockpit">
            {/* Window Topbar */}
            <div className="outstand-cockpit-bar">
              <div className="outstand-cockpit-dots">
                <span className="outstand-dot red" />
                <span className="outstand-dot yellow" />
                <span className="outstand-dot green" />
              </div>

              <div className="outstand-cockpit-address">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <span>verilearn.app/lecture/attention-mechanisms</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span className="mono" style={{ fontSize: "0.72rem", color: "var(--emerald-verified)", fontWeight: 600 }}>
                  ● GROUNDING ACTIVE
                </span>
              </div>
            </div>

            {/* 3-Column Interactive Cockpit Preview */}
            <div className="outstand-cockpit-body">
              {/* Left Pane: Sources & Transcripts */}
              <div className="outstand-pane">
                <div className="outstand-pane-header">
                  <span className="mono" style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase" }}>
                    Verified Sources (3)
                  </span>
                  <span className="mono" style={{ fontSize: "0.72rem", color: "var(--blue-primary)" }}>
                    45:34 duration
                  </span>
                </div>

                {cockpitMoments.map((m) => (
                  <div
                    key={m.id}
                    className={`outstand-source-item ${activeMoment.id === m.id ? "active" : ""}`}
                    onClick={() => setActiveMoment(m)}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.3rem" }}>
                      <span className="mono" style={{ fontSize: "0.7rem", color: "var(--blue-primary)", fontWeight: 600 }}>
                        {m.seg} · {m.time}
                      </span>
                      <span className="mono" style={{ fontSize: "0.7rem", color: "var(--emerald-verified)" }}>
                        {m.citationId}
                      </span>
                    </div>
                    <div style={{ fontSize: "0.84rem", fontWeight: 600, color: "var(--text-primary)" }}>
                      {m.title}
                    </div>
                  </div>
                ))}

                <div style={{ marginTop: "1rem", padding: "0.75rem", background: "var(--bg-panel)", borderRadius: "8px", border: "1px solid var(--border)" }}>
                  <span className="mono" style={{ fontSize: "0.68rem", color: "var(--text-muted)", display: "block", marginBottom: "0.3rem" }}>
                    INPUT FILE
                  </span>
                  <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)", display: "block" }}>
                    📄 CS224N_Lecture4_Attention.pdf
                  </span>
                </div>
              </div>

              {/* Center Pane: Synthesized Note with Interactive Citations */}
              <div className="outstand-pane" style={{ background: "var(--bg-panel)" }}>
                <div className="outstand-pane-header">
                  <span className="mono" style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase" }}>
                    Interactive Synthesis Note
                  </span>
                  <span className="mono" style={{ fontSize: "0.72rem", color: "var(--emerald-verified)", fontWeight: 600 }}>
                    Strict Mode Enabled
                  </span>
                </div>

                <div style={{ textAlign: "left" }}>
                  <h3 style={{ fontSize: "1.15rem", marginBottom: "0.8rem", color: "var(--text-primary)" }}>
                    Deep Dive: Transformer Self-Attention Architecture
                  </h3>

                  <p style={{ fontSize: "0.88rem", lineHeight: 1.6, color: "var(--text-secondary)", marginBottom: "1rem" }}>
                    The core breakthrough of the Transformer architecture lies in self-attention mechanisms. Rather than passing hidden states sequentially like RNNs, self-attention computes pairwise affinity scores across token embeddings.
                  </p>

                  <div style={{ background: "var(--bg-app)", border: "1px solid var(--border)", borderRadius: "8px", padding: "1rem", marginBottom: "1rem" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                      <strong style={{ fontSize: "0.88rem", color: "var(--text-primary)" }}>
                        Active Grounded Takeaway:
                      </strong>
                      <span className="outstand-cite-badge">
                        {activeMoment.citationId}
                      </span>
                    </div>
                    <div style={{ fontSize: "0.85rem", color: "var(--blue-primary)", fontWeight: 600, marginBottom: "0.4rem" }}>
                      {activeMoment.title}
                    </div>
                    <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontStyle: "italic" }}>
                      {activeMoment.quote}
                    </div>
                  </div>

                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                    Click any source on the left to inspect the verbatim citation anchor and audit score in real time.
                  </p>
                </div>
              </div>

              {/* Right Pane: Grounding Audit Cockpit */}
              <div className="outstand-pane">
                <div className="outstand-pane-header">
                  <span className="mono" style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase" }}>
                    Grounding Inspector
                  </span>
                  <StatusBadge status={activeMoment.status} />
                </div>

                <div style={{ textAlign: "left" }}>
                  <div style={{ marginBottom: "1.2rem" }}>
                    <span className="mono" style={{ fontSize: "0.68rem", color: "var(--text-muted)", display: "block", marginBottom: "0.2rem" }}>
                      AUDIT CONFIDENCE
                    </span>
                    <strong style={{ fontSize: "1.5rem", color: "var(--emerald-verified)", fontFamily: "var(--display)" }}>
                      {activeMoment.accuracy}
                    </strong>
                  </div>

                  <div style={{ marginBottom: "1.2rem" }}>
                    <span className="mono" style={{ fontSize: "0.68rem", color: "var(--text-muted)", display: "block", marginBottom: "0.2rem" }}>
                      VERBATIM PLAYBACK WINDOW
                    </span>
                    <span className="mono" style={{ fontSize: "0.82rem", color: "var(--text-primary)", background: "var(--bg-panel)", border: "1px solid var(--border)", padding: "0.3rem 0.6rem", borderRadius: "6px", display: "inline-block" }}>
                      ▶ {activeMoment.time}
                    </span>
                  </div>

                  <div style={{ marginBottom: "1.2rem" }}>
                    <span className="mono" style={{ fontSize: "0.68rem", color: "var(--text-muted)", display: "block", marginBottom: "0.2rem" }}>
                      INSPECTION STATUS
                    </span>
                    <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                      Direct lexical and semantic alignment confirmed against lecturer speech stream.
                    </p>
                  </div>

                  <Link href="/lecture/attention-mechanisms" className="button button-small button-primary" style={{ width: "100%", justifyContent: "center" }}>
                    Open In Studio →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Outstand Bento Feature Grid */}
        <section className="section-shell" id="features">
          <div className="section-intro">
            <span className="eyebrow">BUILT FOR TECHNICAL MASTERY</span>
            <h2>Architected for Rigorous Academics & Researchers</h2>
            <p>
              Standard AI summarizers lose mathematical context and hallucinate equations. VeriLearn is engineered from the ground up for absolute factual certainty.
            </p>
          </div>

          <div className="outstand-bento-grid">
            {/* Card 1: Span 2 */}
            <div className="outstand-bento-card span-2">
              <div>
                <div className="outstand-bento-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                    <polyline points="2 17 12 22 22 17"></polyline>
                    <polyline points="2 12 12 17 22 12"></polyline>
                  </svg>
                </div>
                <h3>Multimodal Lecture Synchronization</h3>
                <p>
                  Sync spoken audio, word-level timestamps, LaTeX equations, and slide pages into a unified searchable vector space. Jump from any formula directly to the lecturer's spoken explanation.
                </p>
              </div>

              <div style={{ marginTop: "1.8rem", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="mono" style={{ fontSize: "0.75rem", color: "var(--blue-primary)" }}>
                    LaTeX Formula Preservation: Attention(Q, K, V) = softmax(QK^T / √d_k)V
                  </span>
                  <span className="mono" style={{ fontSize: "0.72rem", color: "var(--emerald-verified)" }}>
                    100% Parsed
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="outstand-bento-card">
              <div>
                <div className="outstand-bento-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
                <h3>Inline Citation Grounding</h3>
                <p>
                  Every bullet point, summary statement, and study card features a clickable citation badge that illuminates the exact source quote and timestamp.
                </p>
              </div>
              <div className="mono" style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "1.2rem" }}>
                Zero unverifiable assertions.
              </div>
            </div>

            {/* Card 3 */}
            <div className="outstand-bento-card">
              <div>
                <div className="outstand-bento-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h3>Active Recall Studio</h3>
                <p>
                  Auto-generates spaced-repetition flashcards and conceptual mastery matrices anchored to verified claims, ensuring high retention for high-stakes exams.
                </p>
              </div>
              <div className="mono" style={{ fontSize: "0.75rem", color: "var(--emerald-verified)", marginTop: "1.2rem" }}>
                Diagnostic verification included.
              </div>
            </div>

            {/* Card 4: Span 2 */}
            <div className="outstand-bento-card span-2">
              <div>
                <div className="outstand-bento-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
                  </svg>
                </div>
                <h3>Zero-Hallucination Guardrail</h3>
                <p>
                  When a query touches on topics omitted by the lecture, VeriLearn explicitly alerts you with an unsupported indicator rather than fabricating convincing answers.
                </p>
              </div>

              <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <span style={{ background: "var(--red-soft)", color: "var(--red-unverified)", border: "1px solid #4a1c20", padding: "0.3rem 0.7rem", borderRadius: "6px", fontSize: "0.75rem", fontFamily: "var(--mono)", fontWeight: 600 }}>
                  UNVERIFIED CLAIM AUDIT: FLAGGED
                </span>
                <span style={{ background: "var(--emerald-soft)", color: "var(--emerald-verified)", border: "1px solid #143e2e", padding: "0.3rem 0.7rem", borderRadius: "6px", fontSize: "0.75rem", fontFamily: "var(--mono)", fontWeight: 600 }}>
                  VERIFIED LECTURE TRUTH: ANCHORED
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Outstand 3-Step Workflow */}
        <section className="section-shell" id="pipeline" style={{ borderTop: "1px solid var(--border)" }}>
          <div className="section-intro">
            <span className="eyebrow">STEP-BY-STEP WORKFLOW</span>
            <h2>From Raw Audio to Exam Readiness in Three Moves</h2>
            <p>
              Streamlined, automated, and mathematically verified.
            </p>
          </div>

          <div className="outstand-workflow-grid">
            <div className="outstand-step-card">
              <span className="outstand-step-number">STEP 01</span>
              <h4>Ingest & Transcribe</h4>
              <p>
                Drop your lecture audio, PDF slides, or lecture link. VeriLearn transcribes and time-aligns every utterance with millisecond precision.
              </p>
            </div>

            <div className="outstand-step-card">
              <span className="outstand-step-number">STEP 02</span>
              <h4>Extract & Ground</h4>
              <p>
                The evidence engine maps core concepts into an interactive matrix where every claim cites its verbatim audio timecode.
              </p>
            </div>

            <div className="outstand-step-card">
              <span className="outstand-step-number">STEP 03</span>
              <h4>Drill & Master</h4>
              <p>
                Engage in chat with exact provenance, test your recall with verified diagnostic quizzes, and export clean study sheets.
              </p>
            </div>
          </div>
        </section>

        {/* Outstand Comparison Matrix */}
        <section className="section-shell" id="comparison" style={{ borderTop: "1px solid var(--border)" }}>
          <div className="section-intro">
            <span className="eyebrow">RIGOROUS COMPARISON</span>
            <h2>Why VeriLearn Beats Generic AI Tools</h2>
            <p>
              See how our grounded architecture solves the critical flaws of standard LLM chatbots.
            </p>
          </div>

          <div className="outstand-comp-wrap">
            <div className="outstand-comp-row header">
              <div>Capability / Feature</div>
              <div style={{ color: "var(--text-muted)" }}>Generic AI Chatbots</div>
              <div style={{ color: "var(--blue-primary)" }}>VeriLearn Outstand Engine</div>
            </div>

            <div className="outstand-comp-row">
              <div><strong>Verifiable Citation Links</strong></div>
              <div style={{ color: "var(--red-unverified)" }}>✕ Vague or fabricated page numbers</div>
              <div style={{ color: "var(--emerald-verified)", fontWeight: 600 }}>✓ Exact second + verbatim audio quote</div>
            </div>

            <div className="outstand-comp-row">
              <div><strong>Hallucination Defense</strong></div>
              <div style={{ color: "var(--red-unverified)" }}>✕ Pretends missing facts exist</div>
              <div style={{ color: "var(--emerald-verified)", fontWeight: 600 }}>✓ Explicitly flags missing evidence</div>
            </div>

            <div className="outstand-comp-row">
              <div><strong>Audio Synchronization</strong></div>
              <div style={{ color: "var(--red-unverified)" }}>✕ Text-only, no speech alignment</div>
              <div style={{ color: "var(--emerald-verified)", fontWeight: 600 }}>✓ 1-click audio segment playback</div>
            </div>

            <div className="outstand-comp-row">
              <div><strong>Active Recall Testing</strong></div>
              <div style={{ color: "var(--red-unverified)" }}>✕ Generic superficial questions</div>
              <div style={{ color: "var(--emerald-verified)", fontWeight: 600 }}>✓ Concept trees & source-linked quizzes</div>
            </div>
          </div>
        </section>

        {/* Outstand Interactive FAQ */}
        <section className="section-shell" id="faq" style={{ borderTop: "1px solid var(--border)" }}>
          <div className="section-intro">
            <span className="eyebrow">FREQUENTLY ASKED QUESTIONS</span>
            <h2>Everything You Need to Know</h2>
            <p>
              Clear answers on how VeriLearn powers lecture intelligence.
            </p>
          </div>

          <div className="outstand-faq-wrap">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="outstand-faq-item"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                >
                  <div className="outstand-faq-q">
                    <span>{faq.q}</span>
                    <span style={{ color: "var(--blue-primary)", fontSize: "1.2rem", fontWeight: 700 }}>
                      {isOpen ? "−" : "+"}
                    </span>
                  </div>
                  {isOpen && <div className="outstand-faq-a">{faq.a}</div>}
                </div>
              );
            })}
          </div>
        </section>

        {/* Outstand Bottom High-Impact CTA */}
        <section className="section-shell">
          <div className="outstand-cta-box">
            <h2>Ready to Study with Mathematical Certainty?</h2>
            <p>
              Step into your personalized lecture cockpit. Ingest your courses, explore grounded takeaways, and master technical topics with zero hallucinations.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/workspace" className="button button-primary" style={{ padding: "0.9rem 2rem", fontSize: "1rem" }}>
                Enter Workspace Now →
              </Link>
              <Link href="/lecture/attention-mechanisms" className="button button-dark" style={{ padding: "0.9rem 1.8rem", fontSize: "1rem" }}>
                Inspect Live Studio
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Outstand Footer */}
      <footer className="landing-footer">
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <VeriLearnLogo />
          <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
            © {new Date().getFullYear()} VeriLearn. All rights reserved.
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <Link href="/workspace" style={{ color: "var(--text-secondary)", fontSize: "0.82rem" }}>
            Workspace
          </Link>
          <Link href="/concepts" style={{ color: "var(--text-secondary)", fontSize: "0.82rem" }}>
            Concept Matrix
          </Link>
          <Link href="/quiz" style={{ color: "var(--text-secondary)", fontSize: "0.82rem" }}>
            Recall Studio
          </Link>
          <span className="mono" style={{ color: "var(--emerald-verified)", fontSize: "0.75rem", display: "flex", alignItems: "center", gap: "5px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--emerald-verified)" }} />
            SYSTEMS OPERATIONAL
          </span>
        </div>
      </footer>
    </div>
  );
}
