# VeriLearn

VeriLearn is an evidence-first learning assistant for technical lectures. It is planned to turn lectures into timestamped transcripts, evidence-backed concepts, verification states, and grounded quiz material.

## Technology stack

- React, TypeScript, Vite, Tailwind CSS, shadcn/ui, and Wouter
- Node.js and Express
- Planned: tRPC, Drizzle ORM, MySQL/TiDB with possible PostgreSQL compatibility
- Planned integrations: S3-compatible storage, Whisper, retrieval/RAG, and structured LLM generation

## Commands

```bash
pnpm install
pnpm dev
pnpm check
pnpm build
```

This repository is currently a project foundation. Dependency installation and executable application configuration are intentionally deferred until the existing frontend is available in this repository.

## Folder overview

- `client/`: React application source and public files.
- `server/`: future API, middleware, and integration boundaries.
- `shared/`: reviewed cross-layer contracts and constants.
- `drizzle/`: future schema and migration location; no database schema is implemented.
- `tests/`: unit, integration, end-to-end, and fixture organization.
- `docs/`: architecture, workflow, API, database, and demonstration documentation.

See [docs/FOLDER_GUIDE.md](docs/FOLDER_GUIDE.md) for detailed responsibilities.

## Three-person ownership

- **Person 1 — Source Integrity:** upload, source metadata, storage, and transcription boundaries.
- **Person 2 — Evidence Intelligence:** retrieval, verification, concepts, and quizzes.
- **Person 3 — Product Experience:** pages, layouts, workspace composition, navigation, accessibility, and responsive behavior.

Shared contracts, API documentation, schema planning, and processing states need approval from all three teammates.

## First vertical slice

The first future vertical slice should use local mock data: upload a sample lecture through the planned interface, show a processing state, open timestamped transcript segments, inspect a concept with an evidence reference, and submit one grounded quiz answer. No services or APIs are implemented in this foundation.
