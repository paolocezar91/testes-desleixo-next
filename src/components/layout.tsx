import Head from "next/head";
import "@/app/globals.css";
import Image from "next/image";

export default function RootLayout({
  children,
  title,
}: Readonly<{
  children: React.ReactNode;
  title: string;
}>) {
  title = "Testes do Desleixo -- " + title;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main className="min-h-screen relative">
        <div className="absolute right-5 top-5 z-1">
          <a
            className="rounded-full w-7 h-7 bg-white text-black text-center block border-2
            hover:bg-black hover:border-white border-solid hover:text-white font-bold"
            href="/about"
          >
            ?
          </a>
        </div>
        <div className="absolute overflow-auto top-0 left-1/2 transform -translate-x-1/2 h-full mx-auto z-1">
          <div className="w-250 p-8">{children}</div>
        </div>
        <div className="absolute w-full h-200 bottom-0 z-0">
          <Image src="/fire.gif" fill alt="fire" />
        </div>
      </main>
    </>
  );
}
