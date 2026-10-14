# Team Workflow

## Ownership

| Person | Area | Owned folders |
| --- | --- | --- |
| Person 1 — Source Integrity | Upload, source metadata, storage, transcription, quality flags | `client/src/features/upload/`, `client/src/components/lecture/`, `server/services/storage/`, `server/services/transcription/`, `tests/integration/transcription/` |
| Person 2 — Evidence Intelligence | Retrieval, grounding, concepts, verification, quizzes | `client/src/features/concepts/`, `client/src/features/quiz/`, `client/src/components/evidence/`, `client/src/components/concepts/`, `server/services/retrieval/`, `server/services/verification/`, `server/services/quiz/`, `tests/integration/retrieval/`, `tests/integration/verification/` |
| Person 3 — Product Experience | Pages, layout, workspace, transcript UI, accessibility, responsive behavior | `client/src/pages/`, `client/src/features/workspace/`, `client/src/features/lecture/`, `client/src/components/layout/`, `client/src/components/lecture/`, `client/src/layouts/`, `client/src/hooks/`, `client/src/contexts/` |

`client/src/components/lecture/` is shared by Persons 1 and 3. Coordinate changes before editing the same component.

## Branches and commits

Use a focused branch per work item, for example:

- `feat/person1-upload-transcription`
- `feat/person2-evidence-grounding`
- `feat/person3-workspace-ui`

Use Conventional Commit-style summaries, for example:

- `feat(upload): add upload validation`
- `feat(transcript): add timestamped transcript contract`
- `feat(evidence): add evidence status model`
- `ui(workspace): add workspace layout`
- `fix(quiz): handle missing evidence`

## Pull requests and review

- Keep each pull request scoped to one owner area and include tests when an implementation exists.
- Explain contract changes, visual behavior, and known follow-up work in the description.
- Require the relevant folder owner to review ordinary changes.
- Require all three teammates to approve changes to `shared/types.ts`, `shared/validation.ts`, `docs/API_CONTRACTS.md`, `drizzle/schema.ts`, tRPC router contracts, database relationships, and processing job states.

## Avoiding merge conflicts

- Claim a work item before editing shared files.
- Avoid unrelated formatting and dependency changes.
- Prefer adding focused components over editing another owner’s files.
- Rebase before requesting review and resolve ownership questions before coding.
