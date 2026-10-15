import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { WorkspaceShell } from "../components/layout/WorkspaceShell";
import { ProcessingBadge } from "../components/ui/StatusBadge";

type UploadState = "idle" | "selected" | "invalid" | "processing" | "success" | "failure";
const stages = ["Source received", "Audio prepared", "Transcript generated", "Evidence indexed", "Workspace ready"];

export default function UploadLecture() {
  const [, navigate] = useLocation();
  const [state, setState] = useState<UploadState>("idle");
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state !== "processing") return;
    const timer = window.setInterval(() => setProgress((current) => {
      if (current >= 100) { window.clearInterval(timer); setState("success"); return 100; }
      return Math.min(current + 8, 100);
    }), 320);
    return () => window.clearInterval(timer);
  }, [state]);

  const selectFile = (file: File) => {
    const accepted = file.type.startsWith("audio/") || file.type.startsWith("video/") || /\.(mp3|wav|m4a|mp4|mov)$/i.test(file.name);
    if (!accepted) { setFileName(file.name); setValidationMessage("This source type is not supported. Choose MP3, WAV, M4A, MP4, or MOV."); setState("invalid"); return; }
    if (file.size > 500 * 1024 * 1024) { setFileName(file.name); setValidationMessage("This file is larger than the 500 MB demo limit."); setState("invalid"); return; }
    setFileName(file.name); setValidationMessage(""); setState("selected"); setProgress(0);
  };
  const startProcessing = () => { setState("processing"); setProgress(8); };
  const useSample = () => { setFileName("attention-mechanisms-week-04.mp4"); setValidationMessage(""); setState("selected"); setProgress(0); };
  return (
    <WorkspaceShell eyebrow="SOURCE INGESTION / 01" title="Add a lecture">
      <div className="upload-layout">
        <section className="upload-intro">
          <span className="eyebrow">SOURCE INTAKE / DEMO MODE</span>
          <h2>Start with the source, not the summary.</h2>
          <p>
            Upload a technical lecture and VeriLearn will stage a reviewable record.
            This demo simulates the pipeline locally; no file leaves your browser.
          </p>
          <div className="upload-note">
            <span className="note-mark">i</span>
            <span>Real transcription, storage, and evidence indexing will connect at the API boundary later.</span>
          </div>
        </section>

        <section className="upload-card panel-lined">
          {state === "idle" && (
            <>
              <div
                className={`dropzone ${dragging ? "dragging" : ""}`}
                onDragEnter={(event) => {
                  event.preventDefault();
                  setDragging(true);
                }}
                onDragOver={(event) => event.preventDefault()}
                onDragLeave={() => setDragging(false)}
                onDrop={(event) => {
                  event.preventDefault();
                  setDragging(false);
                  const file = event.dataTransfer.files[0];
                  if (file) selectFile(file);
                }}
              >
                <div className="dropzone-symbol">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                </div>
                <h3>Drop a lecture source here</h3>
                <p>Audio or video, up to 500 MB</p>
                <button className="button button-primary" onClick={() => inputRef.current?.click()}>
                  Choose a file
                </button>
                <input
                  ref={inputRef}
                  type="file"
                  accept="audio/*,video/*"
                  hidden
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) selectFile(file);
                  }}
                />
                <span className="mono dropzone-meta">MP3 · WAV · M4A · MP4 · MOV</span>
              </div>
              <button className="sample-link" onClick={useSample}>
                Use the sample lecture instead <span>→</span>
              </button>
            </>
          )}

          {state === "invalid" && (
            <InvalidFile
              fileName={fileName}
              message={validationMessage}
              onChoose={() => {
                setState("idle");
                inputRef.current?.click();
              }}
              onCancel={() => {
                setState("idle");
                setFileName("");
              }}
            />
          )}

          {state === "selected" && (
            <SelectedFile
              fileName={fileName}
              onCancel={() => setState("idle")}
              onStart={startProcessing}
              onFailure={() => setState("failure")}
            />
          )}

          {state === "processing" && <ProcessingView progress={progress} fileName={fileName} />}

          {state === "success" && (
            <SuccessView
              fileName={fileName}
              onOpen={() => navigate("/lecture/attention-mechanisms")}
              onAgain={() => {
                setState("idle");
                setFileName("");
              }}
            />
          )}

          {state === "failure" && (
            <FailureView onRetry={startProcessing} onCancel={() => setState("idle")} />
          )}
        </section>
      </div>

      <section className="pipeline-section">
        <div className="section-bar">
          <div>
            <span className="eyebrow">02 / WHAT HAPPENS NEXT</span>
            <h2>A visible processing pipeline.</h2>
          </div>
          <span className="mono muted">LOCAL SIMULATION</span>
        </div>
        <div className="pipeline-list">
          {stages.map((stage, index) => (
            <div
              className={`pipeline-stage ${
                state === "processing" && progress >= index * 25
                  ? "stage-active"
                  : state === "success"
                  ? "stage-complete"
                  : ""
              }`}
              key={stage}
            >
              <span className="pipeline-index mono">0{index + 1}</span>
              <span className="pipeline-dot" />
              <strong>{stage}</strong>
              {index < stages.length - 1 && <span className="pipeline-connector" />}
            </div>
          ))}
        </div>
      </section>
    </WorkspaceShell>
  );
}

function SelectedFile({
  fileName,
  onCancel,
  onStart,
  onFailure,
}: {
  fileName: string;
  onCancel: () => void;
  onStart: () => void;
  onFailure: () => void;
}) {
  return (
    <div className="selected-file">
      <div className="file-icon">MP4</div>
      <div className="selected-file-copy">
        <span className="tiny-label">SOURCE READY FOR INTAKE</span>
        <h3>{fileName}</h3>
        <span className="mono">Demo file · validation passed · 42.8 MB</span>
      </div>
      <ProcessingBadge status="uploaded" />
      <div className="selected-actions">
        <button className="button button-primary" onClick={onStart}>
          Begin processing →
        </button>
        <button className="text-button" onClick={onCancel}>
          Choose another
        </button>
        <button className="text-button danger-text" onClick={onFailure}>
          Preview failure state
        </button>
      </div>
    </div>
  );
}

function InvalidFile({
  fileName,
  message,
  onChoose,
  onCancel,
}: {
  fileName: string;
  message: string;
  onChoose: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="result-view failure-view">
      <span className="result-symbol">!</span>
      <span className="eyebrow">VALIDATION / SOURCE REJECTED</span>
      <h3>{fileName}</h3>
      <p>{message}</p>
      <button className="button button-primary" onClick={onChoose}>
        Choose another file
      </button>
      <button className="text-button" onClick={onCancel}>
        Back to upload
      </button>
    </div>
  );
}

function ProcessingView({ progress, fileName }: { progress: number; fileName: string }) {
  const stage = Math.min(4, Math.floor(progress / 25));
  return (
    <div className="processing-view">
      <div className="processing-pulse">
        <span className="pulse-ring" />
        <span className="pulse-core">{String(progress).padStart(2, "0")}%</span>
      </div>
      <span className="eyebrow">PROCESSING SOURCE / {fileName}</span>
      <h3>{stages[stage]}</h3>
      <p>VeriLearn is simulating the next step in the local demo. Keep this tab open to watch the handoff.</p>
      <div className="big-progress">
        <span style={{ width: `${progress}%` }} />
      </div>
      <div className="processing-view-meta">
        <span className="mono">{progress}% complete</span>
        <span className="mono">Local simulation</span>
      </div>
    </div>
  );
}

function SuccessView({
  fileName,
  onOpen,
  onAgain,
}: {
  fileName: string;
  onOpen: () => void;
  onAgain: () => void;
}) {
  return (
    <div className="result-view success-view">
      <span className="result-symbol">✓</span>
      <span className="eyebrow">WORKSPACE READY / LOCAL DEMO</span>
      <h3>{fileName} is staged.</h3>
      <p>
        The demo opens the sample verification record so you can inspect the complete evidence workflow.
        Real uploads will connect to lecture ingestion later.
      </p>
      <button className="button button-primary" onClick={onOpen}>
        Open sample verification workspace ↗
      </button>
      <button className="text-button" onClick={onAgain}>
        Add another source
      </button>
    </div>
  );
}

function FailureView({ onRetry, onCancel }: { onRetry: () => void; onCancel: () => void }) {
  return (
    <div className="result-view failure-view">
      <span className="result-symbol">!</span>
      <span className="eyebrow">SOURCE COULD NOT BE READ</span>
      <h3>We could not prepare this file.</h3>
      <p>
        The demo failure state represents an unreadable source. Try the sample lecture or retry after checking the file format.
      </p>
      <div style={{ display: "flex", gap: "1rem" }}>
        <button className="button button-primary" onClick={onRetry}>
          Retry processing ↻
        </button>
        <button className="text-button" onClick={onCancel}>
          Choose another source
        </button>
      </div>
    </div>
  );
}

