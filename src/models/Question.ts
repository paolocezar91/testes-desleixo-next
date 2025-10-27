import AnswerModel from "./Answer";

export default class QuestionModel {
  id: string;
  text: string;
  description?: string;
  // Optional image URL for illustrated questions
  imageUrl?: string;
  answers: AnswerModel[];
  // Optional flag to randomize answer order
  randomizeAnswers?: boolean;

  constructor(attrs: {
    id: string;
    text: string;
    description: string;
    imageUrl: string;
    answers: AnswerModel[];
    randomizeAnswers: boolean;
  }) {
    this.id = attrs.id;
    this.text = attrs.text;
    this.description = attrs.description;
    this.imageUrl = attrs.imageUrl;
    this.answers = attrs.answers;
    this.randomizeAnswers = attrs.randomizeAnswers;
  }
}
