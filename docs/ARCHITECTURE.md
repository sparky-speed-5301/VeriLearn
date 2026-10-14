# Architecture

## Future processing flow

```text
User
  → Frontend
  → tRPC API
  → Processing Job
  → Storage
  → Whisper Transcription
  → Transcript Segments
  → Retrieval/RAG
  → Structured LLM Generation
  → Grounding Validator
  → Evidence-backed Concepts
  → Quiz and Learning Feedback
```

This is a target architecture, not an implemented system. The frontend will begin with local mock data. The API, processing jobs, storage, transcription, retrieval, LLM generation, validation, and persistence layers are planned future work.

## Design boundary

The frontend should always present a source trail for material claims. A future evidence reference points from a concept or quiz response to a transcript segment and timestamp. Verification status must be visible rather than hidden.
