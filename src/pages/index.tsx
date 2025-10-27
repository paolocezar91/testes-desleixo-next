import CurrentQuestion from "@/components/current-question";
import Header from "@/components/header";
import ProgressBar from "@/components/progress";
import Result from "@/components/result";
import { satyrzinhoQuiz } from "@/data/satyrzinho-quiz";
import {
  getFinalResult,
  getProgressModel,
  recordAnswer,
} from "@/models/QuizProgress";
import ResultModel from "@/models/Result";
import { useState } from "react";
import RootLayout from "@/components/layout";

export default function Home() {
  const [progress, setProgress] = useState(getProgressModel(satyrzinhoQuiz.id));
  const [finalResult, setFinalResult] = useState<ResultModel | null>(null);

  const currentQuestion =
    progress.currentQuestionIndex >= 0
      ? satyrzinhoQuiz.questions[progress.currentQuestionIndex]
      : undefined;

  const handleAnswer = (answerId: string) => {
    if (!currentQuestion) return;

    // record answer into the progress using the Quiz instance
    recordAnswer(
      progress,
      satyrzinhoQuiz.questions,
      currentQuestion.id,
      answerId
    );

    const result = getFinalResult(satyrzinhoQuiz, progress);
    if (result) setFinalResult(result);

    // trigger react state update (progress is mutated by recordAnswer)
    setProgress({ ...progress });
  };

  if (finalResult) {
    return (
      <RootLayout title={satyrzinhoQuiz.title}>
        <Result
          finalResult={finalResult}
          onClick={() => {
            setProgress(new QuizProgressModel(satyrzinhoQuiz.id));
            setFinalResult(null);
          }}
        />
      </RootLayout>
    );
  }

  return (
    <RootLayout title={satyrzinhoQuiz.title}>
      <Header quiz={satyrzinhoQuiz}>
        {!currentQuestion && (
          <button
            onClick={() =>
              setProgress({ ...progress, currentQuestionIndex: 0 })
            }
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Start Quiz
          </button>
        )}
      </Header>

      {currentQuestion && (
        <div className="space-y-6">
          <ProgressBar quiz={satyrzinhoQuiz} progress={progress} />
          <CurrentQuestion
            currentQuestion={currentQuestion}
            onClick={handleAnswer}
          />
        </div>
      )}
    </RootLayout>
  );
}
