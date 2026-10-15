import { Link } from "wouter";
import { WorkspaceShell } from "../components/layout/WorkspaceShell";
import { ProcessingBadge } from "../components/ui/StatusBadge";
import { ConfidenceMeter } from "../components/evidence/ConfidenceMeter";
import { lectures, concepts, processingJobs } from "../data/mockData";
import { formatRelativeTime, formatTime } from "../lib/format";

export default function Workspace() {
  const readyLecture = lectures[0];

  return (
    <WorkspaceShell
      eyebrow="NOTEBOOKS MANAGER"
      title="Lecture Notebooks"
      action={
        <Link href="/workspace/upload" className="button button-primary">
          + New Notebook
        </Link>
      }
    >
      <div className="workspace-overview">
        {/* NotebookLM-Style Welcome Banner */}
        <section className="welcome-band">
          <div>
            <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--blue-primary)", textTransform: "uppercase" }}>
              ACTIVE SESSION
            </span>
            <h2>Continue where the source is still warm.</h2>
            <p>
              Your latest review is waiting in <span className="mono" style={{ color: "var(--text-primary)" }}>Attention Mechanisms</span> at <span className="mono" style={{ color: "var(--blue-primary)" }}>seg-12</span>.
            </p>
          </div>
          <Link href={`/lecture/${readyLecture.id}`} className="button button-primary">
            Open Studio →
          </Link>
        </section>

        {/* Clean Metrics Grid */}
        <section className="metric-grid">
          <div className="metric-card">
            <span style={{ fontSize: "0.74rem", color: "var(--text-muted)", fontWeight: 600 }}>
              NOTEBOOKS
            </span>
            <strong>{String(lectures.length).padStart(2, "0")}</strong>
            <span>1 ready · 1 processing</span>
          </div>

          <div className="metric-card">
            <span style={{ fontSize: "0.74rem", color: "var(--text-muted)", fontWeight: 600 }}>
              CONCEPTS INDEXED
            </span>
            <strong>{String(concepts.length).padStart(2, "0")}</strong>
            <span>{concepts.filter((c) => c.lectureId === readyLecture.id).length} in latest notebook</span>
          </div>

          <div className="metric-card metric-green">
            <span style={{ fontSize: "0.74rem", color: "var(--emerald-verified)", fontWeight: 600 }}>
              EVIDENCE COVERAGE
            </span>
            <strong>87%</strong>
            <span>+12% reliability gain</span>
          </div>

          <div className="metric-card metric-amber">
            <span style={{ fontSize: "0.74rem", color: "var(--amber-review)", fontWeight: 600 }}>
              NEEDS REVIEW
            </span>
            <strong>
              {String(
                concepts.filter((c) => c.verificationStatus === "needs_review" || c.verificationStatus === "unverified")
                  .length
              ).padStart(2, "0")}
            </strong>
            <span>open verification loops</span>
          </div>
        </section>

        {/* 2 Columns: Lecture Notebooks & Review Queue */}
        <div className="workspace-columns">
          {/* NotebookLM-Style Notebooks Grid */}
          <section className="content-section recent-lectures" style={{ gridColumn: "1 / -1" }}>
            <div className="section-bar">
              <div>
                <h2>Your Notebooks</h2>
              </div>
              <Link href="/workspace/upload" className="button button-small button-outline">
                + New Notebook
              </Link>
            </div>
            <div className="nlm-notebooks-grid">
              <Link href="/workspace/upload" className="nlm-new-notebook-card">
                <span className="nlm-new-notebook-icon">+</span>
                <strong>Create new notebook</strong>
                <span>Upload lecture audio or video</span>
              </Link>
              {lectures.map((lecture) => (
                <Link key={lecture.id} href={`/lecture/${lecture.id}`} className="nlm-notebook-card">
                  <div className="nlm-notebook-card-top">
                    <span className="nlm-notebook-glyph">📓</span>
                    <ProcessingBadge status={lecture.status} />
                  </div>
                  <div>
                    <strong>{lecture.title}</strong>
                    <span className="mono" style={{ color: "var(--text-muted)", fontSize: "0.72rem", marginTop: "0.35rem", display: "block" }}>
                      {lecture.sourceFileName}
                    </span>
                  </div>
                  <div className="nlm-notebook-card-foot">
                    <span>1 source · {formatTime(lecture.durationMs)}</span>
                    <span className="mono">{formatRelativeTime(lecture.createdAt)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>

        <div className="workspace-columns bottom-columns">

          {/* Open Verification Loops */}
          <section className="content-section review-queue">
            <div className="section-bar">
              <div>
                <h2>Review Queue</h2>
              </div>
              <span className="mono" style={{ color: "var(--text-muted)", fontSize: "0.76rem" }}>
                {concepts.filter((c) => c.verificationStatus === "needs_review" || c.verificationStatus === "unverified").length} claims
              </span>
            </div>
            <div className="queue-list" style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
              {concepts
                .filter((c) => c.verificationStatus === "needs_review" || c.verificationStatus === "unverified")
                .slice(0, 3)
                .map((concept) => (
                  <Link
                    href={`/lecture/${concept.lectureId}/concepts`}
                    className="lecture-row"
                    key={concept.id}
                    style={{ gridTemplateColumns: "32px minmax(0, 1fr) 20px" }}
                  >
                    <span
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "6px",
                        background:
                          concept.verificationStatus === "unverified"
                            ? "var(--red-soft)"
                            : "var(--amber-soft)",
                        color:
                          concept.verificationStatus === "unverified"
                            ? "var(--red-unverified)"
                            : "var(--amber-review)",
                        border: `1px solid ${
                          concept.verificationStatus === "unverified" ? "#592022" : "#594017"
                        }`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                        fontSize: "0.85rem",
                      }}
                    >
                      !
                    </span>
                    <div style={{ minWidth: 0 }}>
                      <strong style={{ fontSize: "0.92rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "block" }}>
                        {concept.title}
                      </strong>
                      <span className="mono" style={{ color: "var(--text-muted)", fontSize: "0.68rem", marginTop: "0.2rem", display: "block" }}>
                        {concept.verificationStatus === "unverified" ? "No source moment found" : "Source support is incomplete"}
                      </span>
                    </div>
                    <span style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>→</span>
                  </Link>
                ))}
              <Link
                href="/lecture/attention-mechanisms/concepts"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  color: "var(--blue-primary)",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  padding: "0.6rem 0.4rem",
                }}
              >
                <span>View Full Review Queue</span>
                <span>→</span>
              </Link>
            </div>
          </section>
        </div>

        {/* Processing Pipeline & Health Card */}
        <div className="workspace-columns bottom-columns">
          <section className="content-section">
            <div className="section-bar">
              <div>
                <h2>Processing Pipeline</h2>
              </div>
              <span className="mono" style={{ color: "var(--text-muted)", fontSize: "0.76rem" }}>
                {processingJobs.length} active job
              </span>
            </div>
            {processingJobs.map((job) => (
              <ProcessingRow key={job.id} job={job} />
            ))}
          </section>

          <section
            className="content-section"
            style={{
              background: "var(--bg-panel)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              padding: "1.5rem",
            }}
          >
            <div className="section-bar" style={{ border: 0, paddingBottom: 0 }}>
              <div>
                <h2>Evidence Health</h2>
              </div>
              <span
                style={{
                  fontFamily: "var(--display)",
                  fontSize: "2.8rem",
                  fontWeight: 700,
                  color: "var(--emerald-verified)",
                  lineHeight: 1,
                }}
              >
                87
              </span>
            </div>
            <ConfidenceMeter value={0.87} label="Grounding integrity" />
            <div style={{ display: "grid", gap: "0.65rem", borderTop: "1px solid var(--border)", paddingTop: "1rem", marginTop: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.82rem" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--emerald-verified)" }} /> Supported claims
                </span>
                <b className="mono">14</b>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.82rem" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--amber-review)" }} /> Needs review
                </span>
                <b className="mono">03</b>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.82rem" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--red-unverified)" }} /> Unverified gaps
                </span>
                <b className="mono">01</b>
              </div>
            </div>
            <Link
              href="/lecture/attention-mechanisms/concepts"
              className="button button-small button-outline"
              style={{ width: "100%", marginTop: "1.2rem" }}
            >
              Audit Evidence Health →
            </Link>
          </section>
        </div>
      </div>
    </WorkspaceShell>
  );
}

function LectureRow({ lecture, index }: { lecture: typeof lectures[number]; index: number }) {
  return (
    <Link href={`/lecture/${lecture.id}`} className="lecture-row">
      <span className="lecture-order mono">0{index + 1}</span>
      <span className="lecture-initial" aria-hidden="true">
        {index === 0 ? "A" : index === 1 ? "R" : "V"}
      </span>
      <span className="lecture-main">
        <strong>{lecture.title}</strong>
        <span className="mono">
          {lecture.sourceFileName} · {lecture.status === "ready" ? `${formatTime(lecture.durationMs)} · ${lecture.transcriptSegmentCount} segments` : lecture.status === "failed" ? "Processing failed" : "Evidence indexing · 68%"}
        </span>
      </span>
      <span className="lecture-status">
        <ProcessingBadge status={lecture.status} />
      </span>
      <span className="lecture-date mono" style={{ color: "var(--text-muted)", fontSize: "0.72rem" }}>
        {formatRelativeTime(lecture.createdAt)}
      </span>
      <span className="lecture-arrow">→</span>
    </Link>
  );
}

function ProcessingRow({ job }: { job: typeof processingJobs[number] }) {
  const lecture = lectures.find((item) => item.id === job.lectureId);
  return (
    <div className="processing-row" style={{ background: "var(--bg-panel)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1rem 1.2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <strong style={{ fontSize: "0.9rem" }}>{lecture?.title}</strong>
        <ProcessingBadge status={job.status} />
      </div>
      <div className="progress-line" style={{ height: "6px", margin: "0.8rem 0", background: "var(--bg-card)" }}>
        <span style={{ width: `${job.progressPercent}%`, background: "var(--blue-primary)", height: "100%", display: "block", borderRadius: "3px" }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)", fontSize: "0.75rem" }}>
        <span className="mono">{job.status === "failed" ? "Audio reading error" : `${job.progressPercent}% · Indexing frames`}</span>
        {job.status === "failed" ? (
          <button className="button button-small button-outline" style={{ fontSize: "0.7rem", padding: "0.2rem 0.5rem" }}>
            Retry
          </button>
        ) : (
          <span className="mono">{formatRelativeTime(job.updatedAt)}</span>
        )}
      </div>
    </div>
  );
}
