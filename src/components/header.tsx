import QuizModel from "@/models/Quiz";
import Image from "next/image";
import YouTube from "react-youtube";

export default function Header({
  children,
  quiz,
}: {
  children: React.ReactNode;
  quiz: QuizModel;
}) {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">{quiz.title}</h1>
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

      {quiz.coverVideo && (
        <div className="relative w-full mb-4">
          <YouTube videoId="AXS9-Rjsq_w" />
        </div>
      )}

      {children}
    </div>
  );
}
