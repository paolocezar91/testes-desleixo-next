import { AnswerModel } from "./Answer";

export interface QuestionModel {
  id: string;
  text: string;
  description?: string;
  // Optional image URL for illustrated questions
  imageUrl?: string;
  answers: AnswerModel[];
  // Optional flag to randomize answer order
  randomizeAnswers?: boolean;
}
