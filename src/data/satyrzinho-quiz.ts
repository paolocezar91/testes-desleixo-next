import AnswerModel from "@/models/Answer";
import QuestionModel from "@/models/Question";
import QuizModel from "@/models/Quiz";
import ResultModel from "@/models/Result";

// First, let's define our possible results (characters)
const results = [
  new ResultModel({
    id: "satyrzinho-satan-boy",
    title: "Satyrzinho Satan Boy",
    description: "",
    threshold: 100, // threshold
    imageUrl: "",
  }),
  new ResultModel({
    id: "entrevistador",
    title: "Entrevistador",
    description: "",
    threshold: 75,
    imageUrl: "",
  }),
  new ResultModel({
    id: "tupa",
    title: "Tupã",
    description: "",
    threshold: 50,
    imageUrl: "",
  }),
  new ResultModel({
    id: "odin",
    title: "Odin",
    description: "",
    threshold: 25,
    imageUrl: "",
  }),
];

// Create some questions
const questions = [
  new QuestionModel({
    id: "q1",
    text: "O  verdadeiro black metal escandinavo de raiz...",
    description: "",
    imageUrl: "",
    answers: [
      new AnswerModel({
        id: "q1-a1",
        text: "Não aceita os carecas!",
        weights: {
          "satyrzinho-satan-boy": 0,
          entrevistador: 10,
          tupa: 0,
          odin: 0,
        },
        imageUrl: "",
      }),
      new AnswerModel({
        id: "q1-a2",
        text: "Aceita todo mundo <3",
        weights: {
          "satyrzinho-satan-boy": 0,
          entrevistador: 10,
          tupa: 0,
          odin: 0,
        },
        imageUrl: "",
      }),
      new AnswerModel({
        id: "q1-a3",
        text: "Ouve Sepultura",
        weights: {
          "satyrzinho-satan-boy": 0,
          entrevistador: 0,
          tupa: 10,
          odin: 0,
        },
        imageUrl: "",
      }),
      new AnswerModel({
        id: "a4",
        text: "Tem um olho só",
        weights: {
          "satyrzinho-satan-boy": 0,
          entrevistador: 0,
          tupa: 0,
          odin: 10,
        },
        imageUrl: "",
      }),
    ],
    randomizeAnswers: true,
  }),
  // ... more questions
];

// Create the quiz
const satyrzinhoQuiz = new QuizModel({
  id: "satyrzinho-quiz",
  title: "Por que me desafias, Babalon?",
  description:
    "Descubra quem você é no vídeo da entrevista de Satyrzinho Satan Boy!",
  coverVideo: "https://www.youtube.com/watch?v=AXS9-Rjsq_w",
  questions,
  results,
  metadata: {
    author: "Paolo; Uri",
    createdAt: new Date("2025-10-26"),
    updatedAt: new Date("2025-10-26"),
    category: "Memes, Verdadeiro Black Metal",
    tags: ["Memes", "Black Metal", "Chapéu de Lata"],
    estimatedTime: 5,
  },
  config: {
    showProgress: true,
    allowPreviousQuestion: false,
    showPartialResults: false,
  },
});

export { satyrzinhoQuiz };
