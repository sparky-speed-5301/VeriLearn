import type { LectureStatus, VerificationStatus } from "./types";

export const SUPPORTED_MEDIA_TYPES = [
  "audio/mpeg",
  "audio/wav",
  "audio/mp4",
  "video/mp4",
  "video/webm",
] as const;

export const MAX_PLANNED_UPLOAD_SIZE_BYTES = 2 * 1024 * 1024 * 1024;

export const PROCESSING_STATUS_LABELS: Record<LectureStatus, string> = {
  uploaded: "Uploaded",
  validating: "Validating",
  processing: "Processing",
  transcribing: "Transcribing",
  indexing: "Indexing",
  ready: "Ready",
  failed: "Failed",
};

export const VERIFICATION_STATUS_LABELS: Record<VerificationStatus, string> = {
  supported: "Supported",
  partially_supported: "Partially supported",
  needs_review: "Needs review",
  unverified: "Unverified",
};
