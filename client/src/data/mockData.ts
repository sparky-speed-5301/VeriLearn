import type {
  EvidenceBackedConcept,
  EvidenceReference,
  Lecture,
  ProcessingJob,
  QuizItem,
  TranscriptSegment,
} from "../../../shared/types";

// Demo-only boundary. Replace these reads with lectures.list / lectures.getById.
// TODO: Replace mock processing state with lectures.getProcessingStatus subscription.
// TODO: Replace mock transcript and concepts with transcripts.listByLecture and concepts.listByLecture.
// TODO: Replace local evidence links with evidence.getForConcept and concepts.verify.
// TODO: Replace quiz fixtures with quiz.generate and quiz.submitAnswer.

export const lectures: Lecture[] = [
  {
    id: "attention-mechanisms",
    title: "Attention Mechanisms: From Tokens to Context",
    sourceFileName: "attention-mechanisms-week-04.mp4",
    durationMs: 2734000,
    status: "ready",
    transcriptSegmentCount: 16,
    conceptCount: 9,
    createdAt: "2026-10-14T09:12:00.000Z",
  },
  {
    id: "retrieval-systems",
    title: "Retrieval systems and grounding loops",
    sourceFileName: "retrieval-systems-seminar.wav",
    durationMs: 1840000,
    status: "processing",
    transcriptSegmentCount: 0,
    conceptCount: 0,
    createdAt: "2026-10-13T16:40:00.000Z",
  },
  {
    id: "vector-search",
    title: "Vector search: similarity without certainty",
    sourceFileName: "vector-search-notes.mov",
    durationMs: 2190000,
    status: "failed",
    transcriptSegmentCount: 0,
    conceptCount: 0,
    createdAt: "2026-10-11T13:05:00.000Z",
  },
];

export const transcriptSegments: TranscriptSegment[] = [
  { id: "seg-01", lectureId: "attention-mechanisms", startMs: 0, endMs: 98000, text: "Today we will trace attention from a token's initial representation to the context it receives from every other token.", confidence: 0.99, isFlagged: false },
  { id: "seg-02", lectureId: "attention-mechanisms", startMs: 98000, endMs: 214000, text: "A token embedding is a learned vector. It is useful, but by itself it has not yet seen the neighboring tokens in this sequence.", confidence: 0.96, isFlagged: false },
  { id: "seg-03", lectureId: "attention-mechanisms", startMs: 214000, endMs: 331000, text: "The attention block projects each token into a query, a key, and a value. These are three different views of the same input representation.", confidence: 0.98, isFlagged: false },
  { id: "seg-04", lectureId: "attention-mechanisms", startMs: 331000, endMs: 452000, text: "Queries ask what a token is looking for. Keys describe what each token can offer. Values carry the information that will be mixed into the output.", confidence: 0.98, isFlagged: false },
  { id: "seg-05", lectureId: "attention-mechanisms", startMs: 452000, endMs: 586000, text: "We compare a query with every key using a dot product. After scaling and normalizing those scores, we have weights over the value vectors.", confidence: 0.97, isFlagged: false },
  { id: "seg-06", lectureId: "attention-mechanisms", startMs: 586000, endMs: 704000, text: "That weighted mixture is self-attention: each position updates its representation using information from the other positions in the same sequence.", confidence: 0.99, isFlagged: false },
  { id: "seg-07", lectureId: "attention-mechanisms", startMs: 704000, endMs: 836000, text: "Without an order signal, a transformer would treat the tokens as a set. Positional encoding gives the model a way to distinguish first from last.", confidence: 0.95, isFlagged: false },
  { id: "seg-08", lectureId: "attention-mechanisms", startMs: 836000, endMs: 972000, text: "The context window is the bounded number of tokens available to one forward pass. More context is not free: the attention matrix grows with the number of positions.", confidence: 0.94, isFlagged: false },
  { id: "seg-09", lectureId: "attention-mechanisms", startMs: 972000, endMs: 1104000, text: "A useful mental model is a roundtable. Every participant writes down what they need, what they know, and what they will contribute.", confidence: 0.91, isFlagged: false },
  { id: "seg-10", lectureId: "attention-mechanisms", startMs: 1104000, endMs: 1236000, text: "Multi-head attention runs several smaller attention operations in parallel. Different heads can learn different relationships, such as syntax or long-range reference.", confidence: 0.96, isFlagged: false },
  { id: "seg-11", lectureId: "attention-mechanisms", startMs: 1236000, endMs: 1391000, text: "The output is passed through a feed-forward layer and residual connections. The block is not a database lookup; it is a learned transformation of the current context.", confidence: 0.93, isFlagged: false },
  { id: "seg-12", lectureId: "attention-mechanisms", startMs: 1391000, endMs: 1530000, text: "Similarity in vector space can help us retrieve candidates, but similarity is not proof. A retrieved passage still needs to be checked against the source.", confidence: 0.97, isFlagged: false },
  { id: "seg-13", lectureId: "attention-mechanisms", startMs: 1530000, endMs: 1710000, text: "In retrieval-augmented generation, retrieved context is placed alongside the question so the generator can condition its answer on that material.", confidence: 0.98, isFlagged: false },
  { id: "seg-14", lectureId: "attention-mechanisms", startMs: 1710000, endMs: 1905000, text: "Grounding is a workflow, not a decorative citation. We need to preserve which source moment supports which claim.", confidence: 0.99, isFlagged: false },
  { id: "seg-15", lectureId: "attention-mechanisms", startMs: 1905000, endMs: 2190000, text: "If a concept combines two claims and only one appears in the lecture, mark it as partially supported rather than silently completing the gap.", confidence: 0.98, isFlagged: false },
  { id: "seg-16", lectureId: "attention-mechanisms", startMs: 2190000, endMs: 2734000, text: "The goal is not to remove uncertainty. The goal is to leave a clear trail so a learner can inspect, correct, and revisit it.", confidence: 0.99, isFlagged: false },
];

const evidence = (segmentId: string, quote: string, startMs: number, endMs: number, supportScore: number): EvidenceReference => ({ segmentId, quote, startMs, endMs, supportScore });

export const concepts: EvidenceBackedConcept[] = [
  { id: "concept-embeddings", lectureId: "attention-mechanisms", title: "Token embeddings", explanation: "A learned vector representation that gives each token a starting position before context is mixed in.", confidence: 0.96, verificationStatus: "supported", evidence: [evidence("seg-02", "A token embedding is a learned vector.", 98000, 214000, 0.98)] },
  { id: "concept-qkv", lectureId: "attention-mechanisms", title: "Query, key, and value projections", explanation: "Three learned views of a token representation: what it seeks, what it offers, and what information it contributes.", confidence: 0.98, verificationStatus: "supported", evidence: [evidence("seg-03", "The attention block projects each token into a query, a key, and a value.", 214000, 331000, 0.99), evidence("seg-04", "Queries ask what a token is looking for. Keys describe what each token can offer.", 331000, 452000, 0.96)] },
  { id: "concept-self-attention", lectureId: "attention-mechanisms", title: "Self-attention", explanation: "A weighted mixture that lets each position update itself using information from positions in the same sequence.", confidence: 0.99, verificationStatus: "supported", evidence: [evidence("seg-05", "We compare a query with every key using a dot product.", 452000, 586000, 0.98), evidence("seg-06", "That weighted mixture is self-attention.", 586000, 704000, 0.99)] },
  { id: "concept-position", lectureId: "attention-mechanisms", title: "Positional encoding", explanation: "An order signal that helps a transformer distinguish the sequence positions it is processing.", confidence: 0.94, verificationStatus: "supported", evidence: [evidence("seg-07", "Positional encoding gives the model a way to distinguish first from last.", 704000, 836000, 0.96)] },
  { id: "concept-window", lectureId: "attention-mechanisms", title: "Context window", explanation: "The bounded number of tokens available during a single forward pass, with a computational cost that grows with sequence length.", confidence: 0.89, verificationStatus: "partially_supported", evidence: [evidence("seg-08", "The context window is the bounded number of tokens available to one forward pass.", 836000, 972000, 0.97)] },
  { id: "concept-multihead", lectureId: "attention-mechanisms", title: "Multi-head attention", explanation: "Parallel, smaller attention operations that can specialize in different token relationships.", confidence: 0.93, verificationStatus: "supported", evidence: [evidence("seg-10", "Different heads can learn different relationships, such as syntax or long-range reference.", 1104000, 1236000, 0.95)] },
  { id: "concept-similarity", lectureId: "attention-mechanisms", title: "Vector similarity as proof", explanation: "A high similarity score is enough to retrieve a candidate, but not enough to establish that the claim is true.", confidence: 0.71, verificationStatus: "needs_review", evidence: [evidence("seg-12", "Similarity is not proof. A retrieved passage still needs to be checked against the source.", 1391000, 1530000, 0.84)] },
  { id: "concept-rag", lectureId: "attention-mechanisms", title: "Retrieval-augmented generation", explanation: "Retrieved context is placed beside a question so a generator can condition its answer on source material.", confidence: 0.87, verificationStatus: "supported", evidence: [evidence("seg-13", "Retrieved context is placed alongside the question.", 1530000, 1710000, 0.94)] },
  { id: "concept-unknown", lectureId: "attention-mechanisms", title: "Attention removes hallucinations", explanation: "A broad claim about model reliability that is not established by this lecture's source moments.", confidence: 0.32, verificationStatus: "unverified", evidence: [] },
];

export const quizItems: QuizItem[] = [
  { id: "quiz-01", lectureId: "attention-mechanisms", question: "What role does a value vector play in self-attention?", type: "multiple_choice", options: ["It describes what a token is looking for", "It carries information that is mixed into the output", "It encodes the token's absolute position", "It limits the context window"], evidence: [evidence("seg-04", "Values carry the information that will be mixed into the output.", 331000, 452000, 0.98)] },
  { id: "quiz-02", lectureId: "attention-mechanisms", question: "Why is positional encoding needed?", type: "short_answer", evidence: [evidence("seg-07", "Without an order signal, a transformer would treat the tokens as a set.", 704000, 836000, 0.97)] },
  { id: "quiz-03", lectureId: "attention-mechanisms", question: "Which statement best describes a context window?", type: "multiple_choice", options: ["The number of model layers", "The bounded number of tokens available to one forward pass", "The set of retrieved documents", "The size of a value vector"], evidence: [evidence("seg-08", "The context window is the bounded number of tokens available to one forward pass.", 836000, 972000, 0.99)] },
  { id: "quiz-04", lectureId: "attention-mechanisms", question: "In one sentence, explain why similarity is not proof.", type: "short_answer", evidence: [evidence("seg-12", "Similarity is not proof. A retrieved passage still needs to be checked against the source.", 1391000, 1530000, 0.98)] },
  { id: "quiz-05", lectureId: "attention-mechanisms", question: "What makes a quiz question grounded in VeriLearn?", type: "multiple_choice", options: ["It uses a difficult vocabulary", "It has a source moment that can be inspected", "It is generated without an answer key", "It hides uncertainty from the learner"], evidence: [evidence("seg-14", "We need to preserve which source moment supports which claim.", 1710000, 1905000, 0.98)] },
];

export const processingJobs: ProcessingJob[] = [
  { id: "job-retrieval", lectureId: "retrieval-systems", status: "indexing", progressPercent: 68, createdAt: "2026-10-13T16:40:00.000Z", updatedAt: "2026-10-13T16:52:00.000Z" },
  { id: "job-vector", lectureId: "vector-search", status: "failed", progressPercent: 42, errorCode: "AUDIO_UNREADABLE", createdAt: "2026-10-11T13:05:00.000Z", updatedAt: "2026-10-11T13:17:00.000Z" },
];

export const getLecture = (id: string): Lecture | undefined => lectures.find((lecture) => lecture.id === id);
export const getSegments = (lectureId: string) => transcriptSegments.filter((segment) => segment.lectureId === lectureId);
export const getConcepts = (lectureId: string) => concepts.filter((concept) => concept.lectureId === lectureId);
export const getQuizItems = (lectureId: string) => quizItems.filter((item) => item.lectureId === lectureId);
