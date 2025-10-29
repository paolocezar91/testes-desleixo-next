import RootLayout from "@/components/layout";

export default function About({ quizId }: { quizId: string }) {
  const jc = (
    <a
      className="underline hover:font-bold"
      href="https://www.youtube.com/@assimdisseojoao"
      target="_blank"
    >
      Tio João Carvalho
    </a>
  );

  const rm = (
    <a
      className="underline hover:font-bold"
      href="https://www.youtube.com/@rafaelmordente"
      target="_blank"
    >
      The Brazilian Rafael Mordente
    </a>
  );

  const me = (
    <a
      className="underline hover:font-bold"
      href="https://www.youtube.com/@assimdisseojoao"
      target="_blank"
    >
      Paolo Pestalozzi
    </a>
  );

  return (
    <RootLayout subtitle="Sobre">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold mb-4">Testes do Desleixo - Sobre</h1>
        <p>
          Este projeto é uma tentativa de recriar o espírito, de forma
          zombeteira, pós-moderna e memética, os testes de uma certa revista
          voltada para o público jovem feminino, popular nos anos 90 e 2000 no
          Brasil.
        </p>
        <h2 className="text-2xl font-bold mb-4">Agradecimento especial</h2>
        <ul className="list-disc">
          <li className="ml-4">
            Ao {jc} e {rm} por imortalizarem Satyrzinho e o Entrevistador
          </li>
          <li className="ml-4">
            Uri, que sempre embarca nessas maluquices comigo
          </li>
          <li className="ml-4">Odin, o vencedor</li>
          <li className="ml-4">Tupã, o filho da puta</li>
        </ul>
        Por {me}
        <div className="flex">
          <div className="grow"></div>
          <a className="underline" href="quiz/satyrzinho">
            Voltar
          </a>
        </div>
      </div>
    </RootLayout>
  );
}
