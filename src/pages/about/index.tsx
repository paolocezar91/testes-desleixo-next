import RootLayout from "@/components/layout/layout";
import Link from "next/link";

export default function About() {
  const jc = (
    <Link
      className="underline hover:text-red-600"
      href="https://www.youtube.com/@assimdisseojoao"
      target="_blank"
    >
      Tio João Carvalho
    </Link>
  );

  const rm = (
    <Link
      className="underline hover:text-red-600"
      href="https://www.youtube.com/@rafaelmordente"
      target="_blank"
    >
      The Brazilian Rafael Mordente
    </Link>
  );

  const me = (
    <Link
      className="underline hover:text-red-600"
      href="https://github.com/paolocezar91"
      target="_blank"
    >
      Paolo Pestalozzi
    </Link>
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
        <p>
          Ao {jc} e {rm} por imortalizarem Satyrzinho e o Entrevistador
        </p>
        Por {me}
        <div className="flex">
          <div className="grow"></div>
          <a
            className="border-1 px-2 py-1 hover:bg-red-800 font-bold rounded"
            href="quiz/satyrzinho"
          >
            &lt;
          </a>
        </div>
      </div>
    </RootLayout>
  );
}
