import * as z from "zod";

export const FlashcardSchema = z.object({
  front: z.string().min(5),
  back: z.string().min(10),
});

export const ExamQASchema = z.object({
  question: z.string().min(5),
  answer: z.string().min(15),
});

export const MindMapSchema = z.object({
  main_topic: z.string(),
  branches: z.array(
    z.object({
      topic: z.string(),
      subtopics: z.array(z.string()).min(1),
    })
  ).min(2),
});

export const SnapNotesResponseSchema = z.object({
  lesson_title: z.string(),

  clean_notes: z.array(z.string()).min(5),

  step_by_step_explanation: z.array(z.string()).min(5),

  flashcards: z.array(FlashcardSchema).min(6).max(8),

  exam_questions: z
    .array(ExamQASchema)
    .min(10)
    .max(12),

  mind_map: MindMapSchema,

  key_terms: z.array(z.string()).min(4),

  diagram_explanations: z.array(z.string()).min(1),
});
