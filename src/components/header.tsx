import { QuizModel } from "@/models/Quiz";
import Image from "next/image";
import { useState } from "react";
import YouTube from "react-youtube";
import LoadingSpinner from "./spinner";

export default function Header({
  children,
  quiz,
}: {
  children: React.ReactNode;
  quiz: QuizModel;
}) {
  const [loading, setLoading] = useState(true);

  return (
    <div className="text-center">
      <h1 className="magedon text-8xl flex justify-center">
        <span>Testes do desleix</span>
        <span className="relative rotate-y-180">O</span>
      </h1>
      <h2 className="text-3xl font-bold mb-4">{quiz.title}</h2>
      <p className="mb-4">{quiz.description}</p>

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

      {loading && <LoadingSpinner />}

      {quiz.coverVideo && (
        <div className="relative w-full mb-4 flex align-center justify-center">
          <YouTube videoId="AXS9-Rjsq_w" onReady={() => setLoading(false)} />
        </div>
      )}

      {children}
    </div>
  );
}
