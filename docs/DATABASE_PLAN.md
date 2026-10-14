# Database Plan

No database connection, schema, or migrations are implemented in this repository foundation.

## Planned tables

| Table | Purpose |
| --- | --- |
| `lectures` | Original lecture metadata and current processing state. |
| `processing_jobs` | Lifecycle, progress, and failure records for lecture processing. |
| `transcript_segments` | Timestamped transcription output. |
| `transcript_flags` | Quality or review flags associated with transcript segments. |
| `transcript_chunks` | Retrieval-oriented groupings of transcript content. |
| `concepts` | Generated learning concepts and verification state. |
| `evidence_references` | Links from concepts or quiz material to transcript evidence. |
| `quiz_items` | Grounded revision questions. |
| `quiz_attempts` | Learner answer history and feedback. |

## Relationship planning

A lecture will own processing jobs, transcript segments, transcript chunks, concepts, and quiz items. Concepts and quiz items will refer to one or more evidence references, which resolve to transcript segments. Quiz attempts will refer to quiz items. All three teammates must approve the detailed relationships before `drizzle/schema.ts` or migrations are added.
