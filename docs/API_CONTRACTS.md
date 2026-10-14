# API Contracts

These are future tRPC procedure names only. This document defines no request or response implementation.

## Lectures

- `lectures.create`
- `lectures.list`
- `lectures.getById`
- `lectures.upload`
- `lectures.getProcessingStatus`
- `lectures.transcribe`

## Transcripts

- `transcripts.listByLecture`
- `transcripts.flagSegment`

## Concepts and evidence

- `concepts.generate`
- `concepts.listByLecture`
- `concepts.verify`
- `evidence.getForConcept`

## Quiz

- `quiz.generate`
- `quiz.submitAnswer`

## Contract rules

All three teammates must review changes to these future procedure names, their input/output contracts, processing job states, and the shared validation models before implementation begins.
