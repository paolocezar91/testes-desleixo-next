import { Button } from "@/components/shared/button";
import QuizCurrentQuestion from "@/components/quiz/quiz-current-question";
import QuizDescription from "@/components/quiz/quiz-description";
import Header from "@/components/layout/header";
import RootLayout from "@/components/layout/layout";
import QuizResult from "@/components/quiz/quiz-result";
import LoadingSpinner from "@/components/shared/spinner";
import Title from "@/components/shared/title";
import { QuestionModel } from "@/models/Question";
import { QuizModel } from "@/models/Quiz";
import { QuizProgressModel } from "@/models/QuizProgress";
import { ResultModel } from "@/models/Result";
import { GetStaticPropsContext } from "next";
import { useCallback, useEffect, useState } from "react";
import { fetchAndJson } from "@/app/api";

/**
 * Record an answer into the provided QuizProgress instance.
 * This updates the answers map, accumulates scores and advances the progress index.
 */
function recordAnswer(
  progress: QuizProgressModel,
  questions: QuestionModel[],
  questionId: string,
  answerId: string,
): QuizProgressModel | null {
  const question = questions.find((q) => q.id === questionId);
  if (!question) return null;

  const answer = question.answers.find((a) => a.id === answerId);
  if (!answer) return null;

  // store selected answer
  progress.answers[questionId] = answerId;

  if (!progress.scores[answer.value]) {
    progress.scores[answer.value] = 1;
  } else {
    progress.scores[answer.value]++;
  }

  // advance index
  progress.currentQuestionIndex = Math.min(
    progress.currentQuestionIndex + 1,
    questions.length,
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
function getFinalResult(
  quiz: QuizModel,
  progress: QuizProgressModel,
): ResultModel | null {
  if (progress.currentQuestionIndex < quiz.questions.length) return null;

  // Find the result ID with the highest score
  const [highestScoringResultId] = Object.entries(progress.scores).sort(
    ([, scoreA], [, scoreB]) => scoreB - scoreA,
  );

  if (!highestScoringResultId) return null;

  // Return the corresponding result
  return quiz.results.find((r) => r.id === highestScoringResultId[0]) || null;
}

function getEmptyProgressModel(quizId: string): QuizProgressModel {
  return {
    quizId,
    currentQuestionIndex: -1,
    answers: {},
    scores: {},
    startedAt: new Date(),
  };
}

export function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      quizId: context?.params?.quizId,
    },
  };
}

export function getStaticPaths() {
  const paths = [
    {
      params: {
        quizId: "satyrzinho",
      },
    },
  ];

  return {
    paths,
    fallback: true,
  };
}

export default function Quiz({ quizId }: { quizId: string }) {
  const url = `/api/quiz/${quizId}`;
  const [quiz, setQuiz] = useState<QuizModel | null>(null);
  const [progress, setProgress] = useState<QuizProgressModel | null>(null);
  const [finalResult, setFinalResult] = useState<ResultModel | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionModel | null>(
    null,
  );

  const start = useCallback(() => {
    const currentQuestionIndex = 0;
    setProgress({ ...progress!, currentQuestionIndex });
    setCurrentQuestion(quiz!.questions[currentQuestionIndex]);
  }, [progress, quiz]);

  const restart = useCallback(() => {
    setProgress(getEmptyProgressModel(quiz!.id));
    setFinalResult(null);
  }, [quiz]);

  const handleAnswer = useCallback(
    (answerId: string) => {
      if (!currentQuestion) return;

      const currentProgress = recordAnswer(
        progress!,
        quiz!.questions,
        currentQuestion.id,
        answerId,
      );

      if (currentProgress) {
        setFinalResult(getFinalResult(quiz!, currentProgress));
        setProgress({ ...currentProgress });
        const currentQuestion_ =
          quiz!.questions[currentProgress.currentQuestionIndex];
        setCurrentQuestion(currentQuestion_);
      }
    },
    [currentQuestion, progress, quiz],
  );

  useEffect(() => {
    fetchAndJson(url).then((quiz_: QuizModel) => {
      setQuiz(quiz_);
      const emptyProgress = getEmptyProgressModel(quiz_.id);
      setProgress(emptyProgress);
      setCurrentQuestion(
        emptyProgress.currentQuestionIndex >= 0
          ? quiz_.questions[emptyProgress.currentQuestionIndex]
          : null,
      );
    });
  }, [url]);

  if (!quiz || !progress) {
    return (
      <RootLayout>
        <LoadingSpinner />
      </RootLayout>
    );
  }

  if (finalResult) {
    return (
      <RootLayout subtitle={quiz.title}>
        <Header />
        <QuizResult finalResult={finalResult}>
          <Button className="flex justify-items py-3 w-fit" onClick={restart}>
            Refazer test<span className="relative rotate-y-180">E</span>
          </Button>
        </QuizResult>
      </RootLayout>
    );
  }

  return (
    <RootLayout subtitle={quiz.title}>
      <Header />
      <Title text={quiz.title} />

      {!currentQuestion && (
        <div className="flex flex-col items-center">
          <QuizDescription quiz={quiz} />
          <Button className="flex justify-items py-3" onClick={start}>
            Iniciar test<span className="relative rotate-y-180">E</span>
          </Button>
        </div>
      )}

      {currentQuestion && (
        <div className="pt-4 flex flex-col gap-4 items-center">
          <QuizCurrentQuestion
            showProgress={quiz.config?.showProgress}
            questionLength={quiz.questions.length}
            index={progress.currentQuestionIndex}
            currentQuestion={currentQuestion}
            onClick={handleAnswer}
          />
          <Button className="flex justify-items py-3 w-fit" onClick={start}>
            Reiniciar test<span className="relative rotate-y-180">E</span>
          </Button>
        </div>
      )}
    </RootLayout>
  );
}
