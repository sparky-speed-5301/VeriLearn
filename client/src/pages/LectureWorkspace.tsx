import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import { getConcepts, getLecture, getSegments } from "../data/mockData";
import { formatTime, percent } from "../lib/format";
import type { EvidenceBackedConcept, TranscriptSegment } from "../../../shared/types";

interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  citations?: Array<{ label: string; segmentId: string; startMs: number; quote: string }>;
}

interface UserNote {
  id: string;
  title: string;
  content: string;
  time: string;
  linkedSegmentId?: string;
  linkedTimestamp?: number;
}

export default function LectureWorkspace({ id, sourceSegmentId }: { id: string; sourceSegmentId?: string }) {
  const lecture = getLecture(id);
  const lectureId = lecture?.id ?? "";
  const segments = getSegments(lectureId);
  const lectureConcepts = getConcepts(lectureId);
  const [, navigate] = useLocation();

  // State
  const [selectedSegmentId, setSelectedSegmentId] = useState(sourceSegmentId ?? "seg-06");
  const [currentMs, setCurrentMs] = useState(586000);
  const [playing, setPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [sourceSearch, setSourceSearch] = useState("");
  const [inputPrompt, setInputPrompt] = useState("");
  const [activeCitationPopover, setActiveCitationPopover] = useState<{ quote: string; time: string; segId: string } | null>(null);
  const [selectedStudioTab, setSelectedStudioTab] = useState<"guide" | "notes" | "concepts">("guide");

  // User Notes State
  const [notes, setNotes] = useState<UserNote[]>([
    {
      id: "note-1",
      title: "Self-Attention vs Cross-Attention",
      content: "Self-attention computes Q, K, V from the same sequence. Cross-attention takes Queries from decoder states and Keys/Values from encoder representations.",
      time: "2 mins ago",
      linkedSegmentId: "seg-06",
      linkedTimestamp: 586000,
    },
    {
      id: "note-2",
      title: "Exam Formula: Scaled Dot-Product",
      content: "Attention(Q, K, V) = softmax(Q K^T / √d_k) V. The scaling factor √d_k prevents vanishing gradients in the softmax when dot product magnitudes grow large.",
      time: "15 mins ago",
      linkedSegmentId: "seg-03",
      linkedTimestamp: 214000,
    },
  ]);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");

  // Initial Chat Messages (NotebookLM style)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-1",
      sender: "assistant",
      text: `### Overview: Attention Mechanisms (From Tokens to Context)

Welcome to your lecture notebook. I have indexed the full audio and transcript for **${lecture?.title ?? "this lecture"}**.

Here is a synthesized overview grounded in the lecture:

- **Token Projections**: The attention block linearly maps each token embedding into three separate vectors: a **Query** (what the token seeks), a **Key** (what it offers), and a **Value** (the content it delivers) [1].
- **Scaled Dot-Product Compatibility**: Pairwise alignment between queries and keys determines how much attention each position pays to other positions [2].
- **Self-Attention Aggregation**: The resulting softmax distribution forms a weighted combination of all value vectors, dynamically updating each token representation with context from the sequence [3].
- **Multi-Head Specialization**: Rather than performing a single large attention operation, multi-head attention computes smaller projections in parallel, allowing heads to simultaneously learn syntactic and semantic relationships [4].`,
      citations: [
        { label: "1", segmentId: "seg-03", startMs: 214000, quote: "The attention block projects each token into a query, a key, and a value. These are three different views of the same input representation." },
        { label: "2", segmentId: "seg-04", startMs: 331000, quote: "Queries ask what a token is looking for. Keys describe what each token can offer. Values carry the information that will be mixed into the output." },
        { label: "3", segmentId: "seg-06", startMs: 586000, quote: "That weighted mixture is self-attention: each position updates its representation using information from the other positions in the same sequence." },
        { label: "4", segmentId: "seg-10", startMs: 1104000, quote: "Multi-head attention runs several smaller attention operations in parallel. Different heads can learn different relationships, such as syntax or long-range reference." },
      ],
    },
  ]);

  // Audio Playback Simulation
  useEffect(() => {
    if (!playing || !lecture) return;
    const interval = window.setInterval(() => {
      setCurrentMs((prev) => {
        const next = prev + 1000 * playbackSpeed;
        if (next >= lecture.durationMs) {
          setPlaying(false);
          return 0;
        }
        const match = segments.find((s) => next >= s.startMs && next < s.endMs);
        if (match && match.id !== selectedSegmentId) {
          setSelectedSegmentId(match.id);
        }
        return next;
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [playing, playbackSpeed, lecture, segments, selectedSegmentId]);

  // Filtered transcript
  const filteredSegments = useMemo(() => {
    return segments.filter((s) => s.text.toLowerCase().includes(sourceSearch.toLowerCase()));
  }, [segments, sourceSearch]);

  const handleSeek = (ms: number, segId?: string) => {
    setCurrentMs(ms);
    if (segId) {
      setSelectedSegmentId(segId);
      const el = document.getElementById(`seg-row-${segId}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleSendPrompt = (textToSend?: string) => {
    const query = textToSend || inputPrompt;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: query,
    };

    let replyText = "";
    let replyCitations: ChatMessage["citations"] = [];

    const lower = query.toLowerCase();
    if (lower.includes("query") || lower.includes("key") || lower.includes("value") || lower.includes("projection")) {
      replyText = `### Linear Projections (Q, K, V)

In self-attention, each input token vector $x_i$ is mapped through three separate learned weight matrices:
- **Queries ($Q = X W_Q$)**: Encodes what information this token position is searching for in the sequence [1].
- **Keys ($K = X W_K$)**: Encodes the address or properties this token advertises to all queries [2].
- **Values ($V = X W_V$)**: The actual content representation passed forward into the output mixture.

The alignment between position $i$ and position $j$ is calculated as the scaled dot product:
$$\\text{Score}(Q_i, K_j) = \\frac{Q_i \\cdot K_j}{\\sqrt{d_k}}$$`;
      replyCitations = [
        { label: "1", segmentId: "seg-03", startMs: 214000, quote: "The attention block projects each token into a query, a key, and a value. These are three different views of the same input representation." },
        { label: "2", segmentId: "seg-04", startMs: 331000, quote: "Queries ask what a token is looking for. Keys describe what each token can offer. Values carry the information that will be mixed into the output." },
      ];
    } else if (lower.includes("multi-head") || lower.includes("head")) {
      replyText = `### Multi-Head Attention Mechanism

Multi-head attention allows the model to jointly attend to information at different positions from different representation subspaces:

1. Rather than performing a single attention function with $d_{\\text{model}}$-dimensional queries, keys, and values, we linearly project queries, keys, and values $h$ times with different learned linear projections [1].
2. On each of these projected versions, the attention function is performed in parallel.
3. The resulting vectors are concatenated and once again linearly projected to the original output dimension.

This allows individual heads to specialize—one head might focus on immediate syntactic dependencies (like subject-verb agreement), while another captures long-distance coreference across paragraphs.`;
      replyCitations = [
        { label: "1", segmentId: "seg-10", startMs: 1104000, quote: "Multi-head attention runs several smaller attention operations in parallel. Different heads can learn different relationships, such as syntax or long-range reference." },
      ];
    } else if (lower.includes("context") || lower.includes("bounded") || lower.includes("memory")) {
      replyText = `### Context Window Bounds & Memory Scaling

The lecture emphasizes that increasing context window size is not free [1]:

- **Quadratic Memory Footprint**: Standard pairwise attention requires materializing an $N \\times N$ attention weight matrix, where $N$ is the number of tokens in the sequence. Doubling sequence length increases attention memory fourfold ($O(N^2)$).
- **Forward Pass Budget**: During inference, caching keys and values (the KV Cache) scales linearly with generation steps, capping the maximum concurrent batch size in constrained hardware memory.`;
      replyCitations = [
        { label: "1", segmentId: "seg-08", startMs: 836000, quote: "The context window is the bounded number of tokens available to one forward pass. More context is not free: the attention matrix grows with the number of positions." },
      ];
    } else {
      replyText = `### Grounded Synthesis

Based on the lecture recording, self-attention allows tokens to dynamically aggregate contextual representations from all surrounding positions using normalized dot-product weights [1]. This replaces recurrent sequential recurrence with parallel matrix multiplications, enabling modern transformer scaling.`;
      replyCitations = [
        { label: "1", segmentId: "seg-06", startMs: 586000, quote: "That weighted mixture is self-attention: each position updates its representation using information from other positions in the same sequence." },
      ];
    }

    const aiMsg: ChatMessage = {
      id: `ai-${Date.now() + 1}`,
      sender: "assistant",
      text: replyText,
      citations: replyCitations,
    };

    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setInputPrompt("");

    // Auto-seek to primary citation
    if (replyCitations[0]) {
      handleSeek(replyCitations[0].startMs, replyCitations[0].segmentId);
    }
  };

  // Studio Creation Handlers (NotebookLM style)
  const handleCreateStudioArtifact = (type: "study_guide" | "briefing" | "faq" | "timeline") => {
    let title = "";
    let content = "";
    let citations: ChatMessage["citations"] = [];

    if (type === "study_guide") {
      title = "Generate Study Guide";
      content = `### 📖 Study Guide: Attention Mechanisms & Transformers

**1. Core Principles**
- **Token Embeddings to Context**: Initial embeddings lack sentence context. Self-attention updates tokens by computing soft alignment scores across all other tokens [1].
- **Q-K-V Decomposition**: Linear transformations provide distinct representations for matching (Q, K) versus content blending (V) [2].

**2. Key Formula**
$$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$$

**3. Glossary**
- **Query ($Q$)**: The representation of what a current token needs.
- **Key ($K$)**: What each token advertises to incoming queries.
- **Value ($V$)**: The semantic payload mixed into the final token update.
- **Multi-Head**: Parallel subspace projections for diverse feature extraction [3].`;
      citations = [
        { label: "1", segmentId: "seg-01", startMs: 0, quote: "Today we will trace attention from a token's initial representation to the context it receives from every other token." },
        { label: "2", segmentId: "seg-03", startMs: 214000, quote: "The attention block projects each token into a query, a key, and a value." },
        { label: "3", segmentId: "seg-10", startMs: 1104000, quote: "Multi-head attention runs several smaller attention operations in parallel." },
      ];
    } else if (type === "briefing") {
      title = "Executive Technical Briefing";
      content = `### 📄 Executive Briefing: Architectural Takeaways

- **Eliminating Recurrence**: Unlike RNNs that suffer from sequential bottlenecking, attention computes connections across any distance in a single step [1].
- **Quadratic Complexity ($O(N^2)$)**: The full pairwise attention matrix limits sequence scaling unless sparse or linear attention approximations are introduced [2].
- **Linear Projections**: All three vectors (Q, K, V) are simple matrix multiplications from the input representations before softmax normalization.`;
      citations = [
        { label: "1", segmentId: "seg-06", startMs: 586000, quote: "That weighted mixture is self-attention: each position updates its representation using information from other positions." },
        { label: "2", segmentId: "seg-08", startMs: 836000, quote: "The context window is the bounded number of tokens available to one forward pass. More context is not free." },
      ];
    } else if (type === "faq") {
      title = "Frequently Asked Questions (FAQ)";
      content = `### ❓ FAQ: Technical Interview & Exam Questions

**Q1: Why divide by $\\sqrt{d_k}$ in scaled dot-product attention?**
> For large values of $d_k$, dot products grow large in magnitude, pushing the softmax function into regions with extremely small gradients. Dividing by $\\sqrt{d_k}$ scales variance back to 1 [1].

**Q2: What is the difference between Self-Attention and Cross-Attention?**
> In self-attention, all queries, keys, and values originate from the same previous sequence layer. In cross-attention, queries come from decoder representations while keys and values come from encoder outputs.

**Q3: Why use multiple attention heads instead of one large head?**
> Multi-head attention allows the model to attend to different types of semantic and syntactic relationships at different positions simultaneously [2].`;
      citations = [
        { label: "1", segmentId: "seg-03", startMs: 214000, quote: "The attention block projects each token into a query, a key, and a value." },
        { label: "2", segmentId: "seg-10", startMs: 1104000, quote: "Different heads can learn different relationships, such as syntax or long-range reference." },
      ];
    } else if (type === "timeline") {
      title = "Lecture Timeline & Concept Milestones";
      content = `### ⏱️ Lecture Progression Timeline

- **00:00 — [03:34] Introduction & Token Representation**: Tracing token vectors from embedding lookup tables into contextual space [1].
- **03:34 — [09:46] Linear Q-K-V Projections**: Deriving Query, Key, and Value matrices from token embeddings [2].
- **09:46 — [13:56] Scaled Dot-Product & Softmax**: Calculating attention weights and value aggregation [3].
- **13:56 — [18:24] Bounded Context & Memory Limits**: Quadratic computational trade-offs [4].
- **18:24 — [25:00] Multi-Head Parallelization**: Subspace specialization in multi-head transformer layers [5].`;
      citations = [
        { label: "1", segmentId: "seg-01", startMs: 0, quote: "Today we will trace attention from a token's initial representation to the context it receives from every other token." },
        { label: "2", segmentId: "seg-03", startMs: 214000, quote: "The attention block projects each token into a query, a key, and a value." },
        { label: "3", segmentId: "seg-06", startMs: 586000, quote: "That weighted mixture is self-attention." },
        { label: "4", segmentId: "seg-08", startMs: 836000, quote: "The context window is the bounded number of tokens available to one forward pass." },
        { label: "5", segmentId: "seg-10", startMs: 1104000, quote: "Multi-head attention runs several smaller attention operations in parallel." },
      ];
    }

    setMessages((prev) => [
      ...prev,
      { id: `usr-${Date.now()}`, sender: "user", text: title },
      { id: `ai-${Date.now() + 1}`, sender: "assistant", text: content, citations },
    ]);
  };

  const handleAddNote = () => {
    if (!newNoteTitle.trim() && !newNoteContent.trim()) return;
    const note: UserNote = {
      id: `note-${Date.now()}`,
      title: newNoteTitle.trim() || "Untitled Note",
      content: newNoteContent.trim(),
      time: "Just now",
      linkedSegmentId: selectedSegmentId,
      linkedTimestamp: currentMs,
    };
    setNotes((prev) => [note, ...prev]);
    setNewNoteTitle("");
    setNewNoteContent("");
    setIsAddingNote(false);
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== noteId));
  };

  if (!lecture) {
    return (
      <div className="nlm-app-container" style={{ alignItems: "center", justifyContent: "center" }}>
        <h2>Lecture not found</h2>
        <Link href="/workspace" className="button button-primary" style={{ marginTop: "1rem" }}>
          Return to Workspace
        </Link>
      </div>
    );
  }

  return (
    <div className="nlm-app-container">
      {/* Top 52px NotebookLM Navigation Bar */}
      <header className="nlm-topbar">
        <div className="nlm-topbar-left">
          <Link href="/workspace" className="nlm-back-btn" title="Back to notebooks">
            ← <span>Workspace</span>
          </Link>
          <div className="nlm-title-badge">
            <span style={{ fontSize: "1.1rem" }}>📓</span>
            <h1>{lecture.title}</h1>
            <span className="nlm-source-count-chip">1 source · 45m</span>
          </div>
        </div>

        <div className="nlm-topbar-right">
          <button
            onClick={() => handleCreateStudioArtifact("study_guide")}
            className="button button-small button-outline"
            title="Generate Study Guide"
          >
            📖 Study Guide
          </button>
          <Link href={`/lecture/${lecture.id}/quiz`} className="button button-small button-primary">
            🎯 Grounded Quiz (5)
          </Link>
          <Link href={`/lecture/${lecture.id}/concepts`} className="button button-small button-dark">
            Matrix ({lectureConcepts.length})
          </Link>
        </div>
      </header>

      {/* 3-Panel NotebookLM Studio Grid */}
      <div className="nlm-workspace-grid">
        {/* ===================================================================
            LEFT PANEL: SOURCES (NotebookLM Style)
            =================================================================== */}
        <section className="nlm-panel-sources">
          <div className="nlm-panel-header">
            <h2>Sources (1)</h2>
            <span className="mono" style={{ color: "var(--nlm-green)", fontSize: "0.72rem", fontWeight: 600 }}>
              ✓ Grounded
            </span>
          </div>

          <div style={{ padding: "0.85rem 1rem 0.5rem" }}>
            <Link href="/workspace/upload" className="nlm-add-source-pill">
              <span>+</span> Add sources
            </Link>
          </div>

          <div className="nlm-sources-list">
            <div className="nlm-source-select-all">
              <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.74rem", color: "var(--text-secondary)", cursor: "pointer" }}>
                <input type="checkbox" defaultChecked style={{ accentColor: "var(--nlm-blue)", width: "15px", height: "15px" }} />
                <span>Select all sources</span>
              </label>
            </div>

            <div className="nlm-source-item active">
              <span className="nlm-source-icon">🎙️</span>
              <div className="nlm-source-meta">
                <strong>{lecture.sourceFileName}</strong>
                <span>Technical lecture · {formatTime(lecture.durationMs)} · {segments.length} segments</span>
              </div>
              <input
                type="checkbox"
                defaultChecked
                aria-label="Include source in grounding"
                style={{ accentColor: "var(--nlm-blue)", width: "16px", height: "16px" }}
              />
            </div>
          </div>

          {/* Source Transcript & Search Inspector */}
          <div className="nlm-transcript-stream">
            <div className="nlm-stream-head">
              <span style={{ fontSize: "0.76rem", fontWeight: 600, color: "var(--nlm-text-secondary)" }}>
                Source Transcript
              </span>
              <span className="mono" style={{ fontSize: "0.68rem", color: "var(--nlm-text-muted)" }}>
                {filteredSegments.length} moments
              </span>
            </div>

            <div className="nlm-stream-search">
              <span style={{ color: "var(--nlm-text-muted)", fontSize: "0.8rem" }}>🔍</span>
              <input
                value={sourceSearch}
                onChange={(e) => setSourceSearch(e.target.value)}
                placeholder="Search quotes in source..."
                aria-label="Filter transcript"
              />
              {sourceSearch && (
                <button
                  onClick={() => setSourceSearch("")}
                  style={{ background: "none", border: 0, color: "var(--nlm-text-muted)", cursor: "pointer" }}
                >
                  ×
                </button>
              )}
            </div>

            <div className="nlm-stream-scroll">
              {filteredSegments.map((segment, idx) => {
                const isActive = segment.id === selectedSegmentId;
                return (
                  <article
                    key={segment.id}
                    id={`seg-row-${segment.id}`}
                    className={`nlm-segment-card ${isActive ? "active" : ""}`}
                    onClick={() => handleSeek(segment.startMs, segment.id)}
                  >
                    <div className="nlm-segment-top">
                      <span className="nlm-segment-time">
                        ▶ {formatTime(segment.startMs)}
                      </span>
                      <span className="mono" style={{ fontSize: "0.62rem", color: "var(--nlm-text-muted)" }}>
                        #{idx + 1}
                      </span>
                    </div>
                    <p className="nlm-segment-text">{segment.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===================================================================
            CENTER PANEL: CHAT & DEEP DIVE (NotebookLM Style)
            =================================================================== */}
        <section className="nlm-panel-chat">
          <div className="nlm-chat-scroll">
            <div className="nlm-chat-container">
              {/* Signature NotebookLM Deep Dive Audio Overview Card */}
              <div className="nlm-audio-card">
                <div className="nlm-audio-header">
                  <div>
                    <span className="nlm-audio-badge">🎙️ AUDIO OVERVIEW · DEEP DIVE</span>
                    <h3 style={{ marginTop: "0.4rem" }}>Interactive Lecture Discussion</h3>
                    <p>Two AI hosts analyze Attention Mechanisms, Dot-Product scoring, and context memory bounds.</p>
                  </div>
                  <button
                    className="nlm-speed-btn"
                    onClick={() => setPlaybackSpeed((s) => (s === 1 ? 1.5 : s === 1.5 ? 2 : 1))}
                    aria-label="Toggle playback speed"
                  >
                    {playbackSpeed}× speed
                  </button>
                </div>

                <div className="nlm-audio-controls">
                  <button
                    className="nlm-play-btn"
                    onClick={() => setPlaying((p) => !p)}
                    aria-label={playing ? "Pause conversation" : "Play conversation"}
                  >
                    {playing ? "❚❚" : "▶"}
                  </button>

                  <div className="nlm-wave-anim">
                    {[40, 70, 30, 90, 60, 45, 80, 50, 75, 35, 85, 60, 95, 40, 70, 55, 80, 65, 45, 90].map((h, i) => (
                      <span
                        key={i}
                        className={`nlm-wave-bar ${playing ? "active" : ""}`}
                        style={{
                          height: playing ? undefined : `${h}%`,
                          animationDelay: `${i * 0.08}s`,
                        }}
                      />
                    ))}
                  </div>

                  <span className="mono" style={{ color: "#e9d5ff", fontSize: "0.76rem" }}>
                    {formatTime(currentMs)} / {formatTime(lecture.durationMs)}
                  </span>
                </div>
              </div>

              {/* Conversational Stream with Inline Citations */}
              {messages.map((msg) => (
                <div key={msg.id} className="nlm-chat-message">
                  <div className="nlm-message-author">
                    <span className="nlm-author-glyph">{msg.sender === "assistant" ? "✦" : "👤"}</span>
                    <span className="nlm-author-name">
                      {msg.sender === "assistant" ? "VeriLearn Grounding Engine" : "You"}
                    </span>
                  </div>

                  <div className="nlm-message-body">
                    <div style={{ whiteSpace: "pre-line", lineHeight: 1.65 }}>
                      {msg.text}
                    </div>

                    {/* Inline Grounded Citations */}
                    {msg.citations && msg.citations.length > 0 && (
                      <div style={{ marginTop: "1rem", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.4rem" }}>
                        <span style={{ fontSize: "0.72rem", color: "var(--nlm-text-muted)", marginRight: "0.2rem" }}>
                          Source Citations:
                        </span>
                        {msg.citations.map((c) => (
                          <button
                            key={c.segmentId}
                            className="nlm-citation-pill"
                            onClick={() => {
                              handleSeek(c.startMs, c.segmentId);
                              setActiveCitationPopover({ quote: c.quote, time: formatTime(c.startMs), segId: c.segmentId });
                            }}
                            title={`Quote: "${c.quote}"`}
                          >
                            [{c.label}] {formatTime(c.startMs)}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Grounded Citation Modal Popover */}
              {activeCitationPopover && (
                <div
                  style={{
                    background: "var(--nlm-card)",
                    border: "1px solid var(--nlm-blue)",
                    borderRadius: "12px",
                    padding: "1rem 1.25rem",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.45rem",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span className="mono" style={{ color: "var(--nlm-blue)", fontSize: "0.72rem", fontWeight: 600 }}>
                      SOURCE QUOTE · {activeCitationPopover.segId} ({activeCitationPopover.time})
                    </span>
                    <button
                      onClick={() => setActiveCitationPopover(null)}
                      style={{ background: "none", border: 0, color: "var(--nlm-text-muted)", cursor: "pointer", fontSize: "1.1rem" }}
                    >
                      ×
                    </button>
                  </div>
                  <blockquote style={{ margin: 0, fontStyle: "italic", color: "var(--nlm-text-primary)", fontSize: "0.88rem", borderLeft: "3px solid var(--nlm-green)", paddingLeft: "0.75rem", lineHeight: 1.5 }}>
                    “{activeCitationPopover.quote}”
                  </blockquote>
                </div>
              )}
            </div>
          </div>

          {/* Floating Bottom Input Dock with Suggested Chips */}
          <div className="nlm-bottom-dock">
            <div className="nlm-dock-inner">
              <div className="nlm-dock-chips">
                <button
                  className="nlm-chip-btn"
                  onClick={() => handleSendPrompt("Explain Query, Key, and Value projections in detail")}
                >
                  💡 Explain Q-K-V Projections
                </button>
                <button
                  className="nlm-chip-btn"
                  onClick={() => handleSendPrompt("Why does context window growth cost memory?")}
                >
                  ⚡ Context Memory Bounds
                </button>
                <button
                  className="nlm-chip-btn"
                  onClick={() => handleSendPrompt("What is Multi-Head Attention?")}
                >
                  🧩 Multi-Head Attention
                </button>
                <button
                  className="nlm-chip-btn"
                  onClick={() => handleCreateStudioArtifact("study_guide")}
                >
                  📖 Study Guide
                </button>
              </div>

              <form
                className="nlm-input-pill"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendPrompt();
                }}
              >
                <input
                  value={inputPrompt}
                  onChange={(e) => setInputPrompt(e.target.value)}
                  placeholder="Ask a question about your sources (e.g. explain self-attention)..."
                  aria-label="Ask lecture question"
                />
                <button type="submit" className="nlm-send-btn" aria-label="Send prompt">
                  ↑
                </button>
              </form>

              <div className="nlm-dock-disclaimer">
                Grounded in 1 source · VeriLearn can make mistakes. Verify important technical claims.
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            RIGHT PANEL: STUDIO (NotebookLM Style)
            =================================================================== */}
        <section className="nlm-panel-studio">
          <div className="nlm-panel-header">
            <h2>Studio</h2>
            <div style={{ display: "flex", gap: "0.3rem", background: "var(--bg-card)", padding: "0.2rem", borderRadius: "6px" }}>
              <button
                onClick={() => setSelectedStudioTab("guide")}
                style={{
                  background: selectedStudioTab === "guide" ? "var(--bg-card-hover)" : "transparent",
                  color: selectedStudioTab === "guide" ? "var(--nlm-blue)" : "var(--nlm-text-muted)",
                  border: 0,
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  padding: "0.25rem 0.55rem",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Guide
              </button>
              <button
                onClick={() => setSelectedStudioTab("notes")}
                style={{
                  background: selectedStudioTab === "notes" ? "var(--bg-card-hover)" : "transparent",
                  color: selectedStudioTab === "notes" ? "var(--nlm-blue)" : "var(--nlm-text-muted)",
                  border: 0,
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  padding: "0.25rem 0.55rem",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Notes ({notes.length})
              </button>
              <button
                onClick={() => setSelectedStudioTab("concepts")}
                style={{
                  background: selectedStudioTab === "concepts" ? "var(--bg-card-hover)" : "transparent",
                  color: selectedStudioTab === "concepts" ? "var(--nlm-blue)" : "var(--nlm-text-muted)",
                  border: 0,
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  padding: "0.25rem 0.55rem",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Concepts ({lectureConcepts.length})
              </button>
            </div>
          </div>

          <div className="nlm-studio-scroll">
            {/* TAB 1: NOTEBOOK GUIDE (NotebookLM signature creation tiles) */}
            {selectedStudioTab === "guide" && (
              <div>
                <span className="tiny-label" style={{ marginBottom: "0.75rem", display: "block" }}>
                  NOTEBOOK GUIDE
                </span>

                <div className="nlm-guide-grid">
                  <button className="nlm-guide-tile" onClick={() => handleCreateStudioArtifact("study_guide")}>
                    <span className="nlm-guide-tile-icon">📖</span>
                    <strong>Study Guide</strong>
                    <span>Key concepts & formulas</span>
                  </button>

                  <button className="nlm-guide-tile" onClick={() => handleCreateStudioArtifact("briefing")}>
                    <span className="nlm-guide-tile-icon">📄</span>
                    <strong>Briefing Doc</strong>
                    <span>Architectural summary</span>
                  </button>

                  <button className="nlm-guide-tile" onClick={() => handleCreateStudioArtifact("faq")}>
                    <span className="nlm-guide-tile-icon">❓</span>
                    <strong>FAQ</strong>
                    <span>Interview & exam Q&A</span>
                  </button>

                  <button className="nlm-guide-tile" onClick={() => handleCreateStudioArtifact("timeline")}>
                    <span className="nlm-guide-tile-icon">⏱️</span>
                    <strong>Timeline</strong>
                    <span>Chronological lecture</span>
                  </button>
                </div>

                {/* Grounded Quiz Banner Card */}
                <div className="nlm-studio-card" style={{ borderLeft: "4px solid var(--nlm-blue)" }}>
                  <div className="nlm-card-head">
                    <span style={{ fontSize: "1.1rem" }}>🎯</span>
                    <h4>Grounded Quiz (5 Questions)</h4>
                    <span className="mono" style={{ fontSize: "0.62rem", color: "var(--nlm-blue)" }}>
                      Interactive
                    </span>
                  </div>
                  <p className="nlm-card-desc">
                    Test your understanding against verified lecture evidence. Each answer is verified with a timestamped source moment.
                  </p>
                  <div className="nlm-card-foot">
                    <span>5 multiple choice & short answer</span>
                    <Link href={`/lecture/${lecture.id}/quiz`} style={{ color: "var(--nlm-blue)", fontWeight: 600 }}>
                      Start Quiz ↗
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: USER NOTES (NotebookLM style notes dock) */}
            {selectedStudioTab === "notes" && (
              <div className="nlm-notes-section">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="tiny-label">SAVED LECTURE NOTES ({notes.length})</span>
                  <button
                    className="button button-small button-outline"
                    onClick={() => setIsAddingNote((v) => !v)}
                  >
                    {isAddingNote ? "Cancel" : "+ Add Note"}
                  </button>
                </div>

                {/* Inline Add Note Form */}
                {isAddingNote && (
                  <div style={{ background: "var(--bg-card)", border: "1px solid var(--blue-primary)", borderRadius: "10px", padding: "1rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                    <input
                      value={newNoteTitle}
                      onChange={(e) => setNewNoteTitle(e.target.value)}
                      placeholder="Note title (e.g. KV Cache Memory)..."
                      style={{ background: "var(--bg-input)", border: "1px solid var(--border)", borderRadius: "6px", padding: "0.45rem 0.75rem", color: "var(--text-primary)", fontSize: "0.82rem" }}
                    />
                    <textarea
                      value={newNoteContent}
                      onChange={(e) => setNewNoteContent(e.target.value)}
                      placeholder="Write your note or observations grounded in this lecture..."
                      style={{ background: "var(--bg-input)", border: "1px solid var(--border)", borderRadius: "6px", padding: "0.45rem 0.75rem", color: "var(--text-primary)", fontSize: "0.82rem", minHeight: "80px", resize: "vertical" }}
                    />
                    <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                      <button className="button button-small button-dark" onClick={() => setIsAddingNote(false)}>
                        Cancel
                      </button>
                      <button className="button button-small button-primary" onClick={handleAddNote}>
                        Save Note
                      </button>
                    </div>
                  </div>
                )}

                {/* Notes List */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                  {notes.map((note) => (
                    <div key={note.id} className="nlm-note-card">
                      <div className="nlm-note-card-head">
                        <strong>{note.title}</strong>
                        <button
                          onClick={() => handleDeleteNote(note.id)}
                          style={{ background: "none", border: 0, color: "var(--text-muted)", cursor: "pointer", fontSize: "0.85rem" }}
                          title="Delete note"
                        >
                          ✕
                        </button>
                      </div>
                      <p>{note.content}</p>
                      <div className="nlm-note-card-foot">
                        <span>{note.time}</span>
                        {note.linkedTimestamp !== undefined && (
                          <button
                            onClick={() => handleSeek(note.linkedTimestamp!, note.linkedSegmentId)}
                            style={{ background: "none", border: 0, color: "var(--nlm-blue)", cursor: "pointer", fontSize: "0.68rem", fontWeight: 600 }}
                          >
                            ▶ {formatTime(note.linkedTimestamp)}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: EXTRACTED CONCEPTS */}
            {selectedStudioTab === "concepts" && (
              <div>
                <span className="tiny-label" style={{ marginBottom: "0.6rem", display: "block" }}>
                  EXTRACTED CONCEPTS ({lectureConcepts.length})
                </span>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                  {lectureConcepts.map((concept, idx) => {
                    const statusColor =
                      concept.verificationStatus === "supported"
                        ? "var(--nlm-green)"
                        : concept.verificationStatus === "needs_review"
                        ? "var(--nlm-amber)"
                        : "var(--nlm-red)";

                    return (
                      <div
                        key={concept.id}
                        className="nlm-studio-card"
                        onClick={() => {
                          if (concept.evidence[0]) {
                            handleSeek(concept.evidence[0].startMs, concept.evidence[0].segmentId);
                            setActiveCitationPopover({
                              quote: concept.evidence[0].quote,
                              time: formatTime(concept.evidence[0].startMs),
                              segId: concept.evidence[0].segmentId,
                            });
                          }
                        }}
                      >
                        <div className="nlm-card-head">
                          <span className="mono" style={{ color: "var(--nlm-text-muted)", fontSize: "0.68rem" }}>
                            #{String(idx + 1).padStart(2, "0")}
                          </span>
                          <h4 style={{ flex: 1, marginLeft: "0.5rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {concept.title}
                          </h4>
                          <span
                            style={{
                              width: "8px",
                              height: "8px",
                              borderRadius: "50%",
                              background: statusColor,
                            }}
                          />
                        </div>
                        <p className="nlm-card-desc" style={{ WebkitLineClamp: 2, display: "-webkit-box", WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                          {concept.explanation}
                        </p>
                        <div className="nlm-card-foot">
                          <span>{percent(concept.confidence)} confidence</span>
                          <span style={{ color: "var(--nlm-blue)" }}>
                            {concept.evidence[0] ? `▶ ${formatTime(concept.evidence[0].startMs)}` : "No moment"}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
