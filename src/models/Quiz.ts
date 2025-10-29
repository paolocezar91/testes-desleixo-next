import { QuestionModel } from "./Question";
import { ResultModel } from "./Result";

export interface QuizMetadata {
  author?: string;
  createdAt: Date;
  updatedAt: Date;
  category?: string;
  tags?: string[];
  estimatedTime?: number;
}

export interface QuizConfig {
  showProgress?: boolean;
  allowPreviousQuestion?: boolean;
  showPartialResults?: boolean;
}

export interface QuizModel {
  id: string;
  title: string;
  description: string;
  // Optional cover image for the quiz
  coverImage?: string;
  // Optional cover video for the quiz
  coverVideo?: string;
  questions: QuestionModel[];
  results: ResultModel[];
  // Optional metadata
  metadata?: QuizMetadata;
  // Optional configuration
  config?: QuizConfig;
}
