import { ResultModel } from "@/models/Result";
import { NextRequest, NextResponse } from "next/server";
import { QuizModel } from "@/models/Quiz";
import { QuestionModel } from "@/models/Question";
import { promises as fs } from "fs";
import path from "path";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ quizId: string }> }
) {
  const { quizId } = await params;

  try {
    const quiz = await getQuizById(quizId);
    return NextResponse.json(quiz, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "JSON Error", err }, { status: 500 });
  }
}

async function getQuizById(quizId: string) {
  const filePath = path.join(process.cwd(), "public", "quiz", `${quizId}.json`);
  const fileContent = await fs.readFile(filePath, "utf8");
  const { results, questions, quiz } = JSON.parse(fileContent) as {
    results: ResultModel[];
    questions: QuestionModel[];
    quiz: QuizModel;
  };

  return {
    ...quiz,
    results,
    questions: questions.map((question, qidx) => {
      return {
        ...question,
        id: `q${qidx}`,
        answers: question.answers.map((answer, aidx) => {
          return { ...answer, id: `q${qidx}-a${aidx}` };
        }),
      };
    }),
  } as QuizModel;
}
