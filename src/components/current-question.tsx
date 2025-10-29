import { shuffle } from "@/app/utils";
import { QuestionModel } from "@/models/Question";
import Image from "next/image";

export default function CurrentQuestion({
  index,
  currentQuestion,
  onClick,
}: {
  index: number;
  currentQuestion: QuestionModel;
  onClick: (id: string) => void;
}) {
  const shuffledAnswers = shuffle(currentQuestion.answers);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">
        {index + 1}) {currentQuestion.text}
      </h2>
      {currentQuestion.description && (
        <p className="text-gray-600">{currentQuestion.description}</p>
      )}

      {currentQuestion.imageUrl && (
        <div className="relative w-full h-48">
          <Image
            src={currentQuestion.imageUrl}
            alt={currentQuestion.text}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}

      <div className="space-y-3">
        {shuffledAnswers.map((answer) => (
          <button
            key={answer.id}
            onClick={() => onClick(answer.id)}
            className="w-full p-4 text-left border rounded bg-black hover:bg-gray-50 hover:text-black"
          >
            {answer.text}
            <small>
              {answer.description ? ` - ${answer.description}` : ""}
            </small>
          </button>
        ))}
      </div>
    </div>
  );
}
