export default function QuizProgressBar({
  questionLength,
  currentQuestionIndex,
}: {
  questionLength: number;
  currentQuestionIndex: number;
}) {
  return (
    <div className="w-full my-4 bg-gray-200 rounded-full h-2.5">
      <div
        className="bg-red-600 h-2.5 rounded-full transition-all"
        style={{
          width: `${(currentQuestionIndex / questionLength) * 100}%`,
        }}
      ></div>
    </div>
  );
}
