import { QuizModel } from "@/models/Quiz";
import Image from "next/image";
import YouTube from "react-youtube";
import { Fragment } from "react/jsx-runtime";

type SimpleQuiz = Omit<QuizModel, "questions">;

export default function QuizTable({ quizzes }: { quizzes: SimpleQuiz[] }) {
  const coverImage = (quiz: SimpleQuiz) => (
    <div className="relative w-full h-64 mb-4">
      <Image
        src={quiz.coverImage!}
        alt={quiz.title}
        fill
        className="object-cover rounded-lg"
      />
    </div>
  );

  const coverVideo = (quiz: SimpleQuiz) => (
    <div className="w-full h-90 mb-4 flex flex-col justify-center items-center">
      <YouTube videoId={quiz.coverVideo} />
    </div>
  );

  return quizzes.map((quiz) => (
    <Fragment key={quiz.id}>
      <div className="text-center">
        <p className="mb-4">{quiz.description}</p>
        {!!quiz.coverImage && coverImage(quiz)}
        {!!quiz.coverVideo && coverVideo(quiz)}
      </div>
    </Fragment>
  ));
}
