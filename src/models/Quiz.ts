import { QuestionModel } from "./Question";
import { ResultModel } from "./Result";

export interface QuizMetadata {
  author?: string;
  createdAt: Date;
  updatedAt: Date;
  category?: string;
  tags?: string[];
  // Average time to complete in minutes
  estimatedTime?: number;
}

export interface QuizConfig {
  // Show results progress while answering
  showProgress?: boolean;
  // Allow going back to previous questions
  allowPreviousQuestion?: boolean;
  // Show partial results before finishing
  showPartialResults?: boolean;
  randomizeQuestions?: boolean;
}

export interface QuizModel {
  id: string;
  title: string;
  description: string;
  // Optional cover image for the quiz
  coverImage?: string;
  coverVideo?: string;
  questions: QuestionModel[];
  results: ResultModel[];
  // Optional metadata
  metadata?: QuizMetadata;
  // Optional configuration
  config?: QuizConfig;
}
