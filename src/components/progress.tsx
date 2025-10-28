import { QuizModel } from "@/models/Quiz";
import { QuizProgressModel } from "@/models/QuizProgress";

export default function ProgressBar({
  quiz,
  progress,
}: {
  quiz: QuizModel;
  progress: QuizProgressModel;
}) {
  return (
    quiz?.config?.showProgress && (
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{
            width: `${
              (progress.currentQuestionIndex / quiz.questions.length) * 100
            }%`,
          }}
        ></div>
      </div>
    )
  );
}
