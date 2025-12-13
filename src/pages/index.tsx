import Header from "@/components/layout/header";
import RootLayout from "@/components/layout/layout";
import Title from "@/components/shared/title";

export default function Home() {
  fetchAndJson(url).then((quiz_: QuizModel) => {
    setQuiz(quiz_);
    const emptyProgress = getEmptyProgressModel(quiz_.id);
    setProgress(emptyProgress);
    setCurrentQuestion(
      emptyProgress.currentQuestionIndex >= 0
        ? quiz_.questions[emptyProgress.currentQuestionIndex]
        : null
    );
  });

  return (
    <RootLayout subtitle="Testes do Desleixo">
      <Header />
      <Title text="Escolha seu destino!" />
      <QuizTable />
    </RootLayout>
  );
}
