import { QuizModel } from "@/models/Quiz";
import Image from "next/image";

export default function Header({
  children,
  quiz,
}: {
  children: React.ReactNode;
  quiz: QuizModel;
}) {
  return (
    <div className="text-center">
      <h1 className="magedon text-7xl md:text-8xl flex justify-center">
        <span>Testes do desleix</span>
        <span className="relative rotate-y-180">O</span>
      </h1>
      <h2 className="text-3xl font-bold mb-4">{quiz.title}</h2>
      <p className="mb-4">
        <a href={quiz.coverVideo} target="_blank" className="underline">
          {quiz.description}
        </a>
      </p>

      {quiz.coverImage && (
        <div className="relative w-full h-64 mb-4">
          <Image
            src={quiz.coverImage}
            alt={quiz.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}
      {children}
    </div>
  );
}
