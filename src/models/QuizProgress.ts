import QuestionModel from "./Question";
import QuizModel from "./Quiz";
import ResultModel from "./Result";

export interface QuizProgressModel {
  quizId: string;
  currentQuestionIndex: number;
  answers: Record<string, string>; // question id -> answer id
  // Accumulated weights for each possible result
  scores: Record<string, number>;
  startedAt: Date;
  completedAt?: Date;
}

export function getProgressModel(quizId: string) {
  return {
    quizId,
    currentQuestionIndex: -1,
    answers: {},
    scores: {},
    startedAt: new Date(),
  };
}

/**
 * Record an answer into the provided QuizProgress instance.
 * This updates the answers map, accumulates scores and advances the progress index.
 */
export function recordAnswer(
  progress: QuizProgressModel,
  questions: QuestionModel[],
  questionId: string,
  answerId: string
) {
  const question = questions.find((q) => q.id === questionId);
  if (!question) return;

  const answer = question.answers.find((a) => a.id === answerId);
  if (!answer) return;

  // store selected answer
  progress.answers[questionId] = answerId;

  // apply weights to progress.scores
  Object.entries(answer.weights).forEach(([resultId, weight]) => {
    progress.scores[resultId] = (progress.scores[resultId] || 0) + weight;
  });

  // advance index
  progress.currentQuestionIndex = Math.min(
    progress.currentQuestionIndex + 1,
    questions.length
  );

  // mark completion time if finished
  if (progress.currentQuestionIndex >= questions.length) {
    progress.completedAt = progress.completedAt || new Date();
  }

  return progress;
}

/**
 * Calculate and return the final Result (if any) for the provided progress.
 * Returns the highest-scoring result that meets its threshold, or null.
 */
export function getFinalResult(
  quiz: QuizModel,
  progress: QuizProgressModel
): ResultModel | null {
  if (progress.currentQuestionIndex < quiz.questions.length) return null;

  const scored = quiz.results
    .map((r) => ({ result: r, score: progress.scores[r.id] || 0 }))
    .filter(({ result, score }) => score >= result.threshold)
    .sort((a, b) => b.score - a.score);

  return (scored[0] && scored[0].result) || null;
}
