export interface QuizProgressModel {
  quizId: string;
  currentQuestionIndex: number;
  answers: Record<string, string>; // question id -> answer id
  scores: Record<string, number>;
  startedAt: Date;
  completedAt?: Date;
}
