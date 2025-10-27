import ResultModel from "@/models/Result";
import Image from "next/image";

export default function Result({
  finalResult,
  onClick,
}: {
  finalResult: ResultModel;
  onClick: () => void;
}) {
  return (
    <div className="space-y-4 text-center">
      <h1 className="text-3xl font-bold">{finalResult.title}</h1>

      {finalResult.imageUrl && (
        <div className="relative w-full h-64">
          <Image
            src={finalResult.imageUrl}
            alt={finalResult.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}

      <p className="text-lg">{finalResult.description}</p>

      <button
        onClick={onClick}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Take Quiz Again
      </button>
    </div>
  );
}
