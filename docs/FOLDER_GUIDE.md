# Folder Guide

## Client

- `client/public/`: static browser assets.
- `client/src/components/ui/`: reusable UI primitives.
- `client/src/components/layout/`: navigation, headers, sidebars, and responsive shells. **Person 3** owns this folder.
- `client/src/components/lecture/`: lecture-facing visual components. **Persons 1 and 3** coordinate ownership.
- `client/src/components/evidence/`: Evidence Ribbon, confidence, and verification-status presentation. **Person 2** owns this folder.
- `client/src/components/concepts/`: reusable concept inspection components. **Person 2** owns this folder.
- `client/src/components/quiz/`: reusable quiz presentation components. **Person 2** owns this folder.
- `client/src/pages/`: route-level composition only. **Person 3** owns this folder.
- `client/src/features/workspace/` and `client/src/features/lecture/`: feature-specific workspace and lecture UI/state. **Person 3** owns these folders.
- `client/src/features/upload/`: upload UI/state boundaries. **Person 1** owns this folder.
- `client/src/features/concepts/` and `client/src/features/quiz/`: feature-specific concept and quiz UI/state. **Person 2** owns these folders.
- `client/src/layouts/`: shared route-level layout wrappers. **Person 3** owns this folder.
- `client/src/data/`: local mock data only; never production data access.
- `client/src/hooks/`: reusable React hooks. **Person 3** owns this folder.
- `client/src/lib/`: client utilities, not product-specific UI.
- `client/src/types/`: frontend-only types not shared by server and client.
- `client/src/contexts/`: React contexts. **Person 3** owns this folder.

## Server

- `server/routers/`: future tRPC route contracts; requires shared approval.
- `server/services/storage/` and `server/services/transcription/`: future storage and transcription boundaries. **Person 1** owns them.
- `server/services/retrieval/`, `server/services/verification/`, and `server/services/quiz/`: future evidence and learning boundaries. **Person 2** owns them.
- `server/lib/`: server utilities.
- `server/middleware/`: future Express middleware.
- `server/index.ts`: future server entry point; do not add endpoints without team agreement.

## Shared, database, tests, and docs

- `shared/`: cross-layer contracts. `types.ts` and `validation.ts` require all-team approval.
- `drizzle/schema.ts`: future database relationships; requires all-team approval. `drizzle/migrations/` stays empty until the data plan is approved.
- `tests/unit/`: isolated tests; `tests/integration/`: service boundaries; `tests/e2e/`: user flows; `tests/fixtures/`: reusable test data.
- `docs/`: project decisions and collaboration references.
