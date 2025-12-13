import { ResultModel } from "@/models/Result";
import Image from "next/image";

export default function QuizResult({
  finalResult,
  children,
}: {
  finalResult: ResultModel;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4 text-center">
      <h1 className="text-3xl font-bold">Resultado:</h1>
      <h2>
        Você é <strong>{finalResult.title}</strong>!
      </h2>

      {finalResult.imageUrl && (
        <div className="relative w-full h-100">
          <Image
            src={finalResult.imageUrl}
            alt={finalResult.title}
            fill
            className="object-cover rounded-lg max-h-300"
          />
        </div>
      )}

      <div className="flex flex-col justify-center items-center text-lg p-4 bg-black/75 rounded-md">
        {finalResult.description}
      </div>
      {children}
    </div>
  );
}
