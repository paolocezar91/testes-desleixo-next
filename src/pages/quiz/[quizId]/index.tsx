import CurrentQuestion from "@/components/current-question";
import Header from "@/components/header";
import ProgressBar from "@/components/progress";
import Result from "@/components/result";
import { QuizProgressModel } from "@/models/QuizProgress";
import { ResultModel } from "@/models/Result";
import { useEffect, useState } from "react";
import RootLayout from "@/components/layout";
import { QuizModel } from "@/models/Quiz";
import { GetStaticPropsContext } from "next";
import LoadingSpinner from "@/components/spinner";
import { QuestionModel } from "@/models/Question";

/**
 * Record an answer into the provided QuizProgress instance.
 * This updates the answers map, accumulates scores and advances the progress index.
 */
function recordAnswer(
  progress: QuizProgressModel,
  questions: QuestionModel[],
  questionId: string,
  answerId: string
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
function getFinalResult(
  quiz: QuizModel,
  progress: QuizProgressModel
): ResultModel | null {
  if (progress.currentQuestionIndex < quiz.questions.length) return null;

  // Find the result ID with the highest score
  const [highestScoringResultId] = Object.entries(progress.scores).sort(
    ([, scoreA], [, scoreB]) => scoreB - scoreA
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

async function fetchAndJson(url: string) {
  return (await fetch(url)).json();
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
    null
  );

  useEffect(() => {
    fetchAndJson(url).then((quiz_: QuizModel) => {
      setQuiz(quiz_);
      const progress_ = getEmptyProgressModel(quiz_.id);
      setProgress(progress_);
      setCurrentQuestion(
        progress_.currentQuestionIndex >= 0
          ? quiz_.questions[progress_.currentQuestionIndex]
          : null
      );
    });
  }, [url]);

  if (!quiz || !progress) {
    return (
      <RootLayout subtitle="Carregando...">
        <LoadingSpinner />
      </RootLayout>
    );
  }

  const start = () => {
    const currentQuestionIndex = 0;
    setProgress({ ...progress, currentQuestionIndex });
    setCurrentQuestion(quiz.questions[currentQuestionIndex]);
  };

  const restart = () => {
    setProgress(getEmptyProgressModel(quiz.id));
    setFinalResult(null);
  };

  const handleAnswer = (answerId: string) => {
    if (!currentQuestion) return;

    const progress_ = recordAnswer(
      progress,
      quiz.questions,
      currentQuestion.id,
      answerId
    );

    if (progress_) {
      setFinalResult(getFinalResult(quiz, progress_));
      setProgress({ ...progress_ });
      const currentQuestion_ = quiz.questions[progress_.currentQuestionIndex];
      setCurrentQuestion(currentQuestion_);
    }
  };

  if (finalResult) {
    return (
      <RootLayout subtitle={quiz.title}>
        <Result finalResult={finalResult} onClick={restart} />
      </RootLayout>
    );
  }

  return (
    <RootLayout subtitle={quiz.title}>
      <Header quiz={quiz}>
        {quiz.config?.showProgress && progress.currentQuestionIndex > -1 && (
          <ProgressBar
            questionLength={quiz.questions.length}
            currentQuestionIndex={progress.currentQuestionIndex}
          />
        )}
        {!currentQuestion && (
          <button
            onClick={start}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Iniciar teste
          </button>
        )}
      </Header>

      {currentQuestion && (
        <div className="space-y-6">
          <CurrentQuestion
            index={progress.currentQuestionIndex}
            currentQuestion={currentQuestion}
            onClick={handleAnswer}
          />
        </div>
      )}
    </RootLayout>
  );
}
