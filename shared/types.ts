export type LectureStatus =
  | "uploaded"
  | "validating"
  | "processing"
  | "transcribing"
  | "indexing"
  | "ready"
  | "failed";

export type VerificationStatus =
  | "supported"
  | "partially_supported"
  | "needs_review"
  | "unverified";

export type QuizItemType = "multiple_choice" | "short_answer";

export interface Lecture {
  id: string;
  title: string;
  sourceFileName: string;
  durationMs: number;
  status: LectureStatus;
  transcriptSegmentCount: number;
  conceptCount: number;
  createdAt: string;
}

export interface ProcessingJob {
  id: string;
  lectureId: string;
  status: LectureStatus;
  progressPercent: number;
  errorCode?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TranscriptSegment {
  id: string;
  lectureId: string;
  startMs: number;
  endMs: number;
  text: string;
  confidence: number;
  isFlagged: boolean;
}

export interface TranscriptChunk {
  id: string;
  lectureId: string;
  segmentIds: string[];
  text: string;
  startMs: number;
  endMs: number;
}

export interface EvidenceReference {
  segmentId: string;
  quote: string;
  startMs: number;
  endMs: number;
  supportScore: number;
}

export interface EvidenceBackedConcept {
  id: string;
  lectureId: string;
  title: string;
  explanation: string;
  confidence: number;
  verificationStatus: VerificationStatus;
  evidence: EvidenceReference[];
}

export interface QuizItem {
  id: string;
  lectureId: string;
  question: string;
  type: QuizItemType;
  options?: string[];
  evidence: EvidenceReference[];
}

export interface QuizAttempt {
  id: string;
  quizItemId: string;
  answer: string;
  isCorrect?: boolean;
  submittedAt: string;
}
