import Head from "next/head";
import "@/app/globals.css";
import Image from "next/image";

export default function RootLayout({
  children,
  subtitle,
}: Readonly<{
  children: React.ReactNode;
  subtitle?: string;
}>) {
  let title = "Testes do Desleixo";
  if (subtitle) title = title + " - " + subtitle;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main className="h-screen w-full md:min-h-screen relative">
        <div className="absolute right-5 top-5 z-1">
          <a
            className="rounded-full w-7 h-7 bg-white text-black text-center block border-2
            hover:bg-black hover:border-white border-solid hover:text-white font-bold"
            href="/about"
          >
            ?
          </a>
        </div>
        <div className="absolute md:overflow-auto md:top-0 md:left-1/2 md:transform md:-translate-x-1/2 md:h-full md:mx-auto z-1">
          <div className="w-full md:w-250 p-8">{children}</div>
        </div>
        <div className="md:block absolute w-full h-100 md:h-200 bottom-0 z-0">
          <Image src="/fire.gif" fill alt="fire" />
        </div>
      </main>
    </>
  );
}
