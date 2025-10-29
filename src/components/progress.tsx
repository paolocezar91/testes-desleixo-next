export default function ProgressBar({
  questionLength,
  currentQuestionIndex,
}: {
  questionLength: number;
  currentQuestionIndex: number;
}) {
  return (
    <div className="w-full my-4 bg-gray-200 rounded-full h-2.5">
      <div
        className="bg-blue-600 h-2.5 rounded-full"
        style={{
          width: `${(currentQuestionIndex / questionLength) * 100}%`,
        }}
      ></div>
    </div>
  );
}
