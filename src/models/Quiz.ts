import QuestionModel from "./Question";
import ResultModel from "./Result";

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
}

export default class QuizModel {
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

  constructor(attrs: {
    id: string;
    title: string;
    description: string;
    coverImage?: string;
    coverVideo?: string;
    questions: QuestionModel[];
    results: ResultModel[];
    metadata: QuizMetadata;
    config: QuizConfig;
  }) {
    this.id = attrs.id;
    this.title = attrs.title;
    this.description = attrs.description;
    this.coverImage = attrs.coverImage;
    this.coverVideo = attrs.coverVideo;
    this.questions = attrs.questions;
    this.results = attrs.results;
    this.metadata = attrs.metadata;
    this.config = attrs.config;
  }
}
