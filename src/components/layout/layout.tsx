import Head from "next/head";
import "@/app/globals.css";
import Image from "next/image";
import Link from "next/link";

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
      <main className="h-screen w-screen md:min-h-screen relative z-1">
        <div className="absolute right-5 bottom-5 z-1">
          <Link
            className="rounded-full w-7 h-7 bg-black text-white text-center block border-2
            hover:bg-white hover:border-black border-solid hover:text-black font-bold"
            href="/about"
          >
            ?
          </Link>
        </div>
        <div className="overflow-auto flex items-center justify-center">
          <div className="w-full md:w-250 p-8">{children}</div>
        </div>
      </main>
      <div className="md:block fixed w-screen h-100 md:h-200 bottom-0 z-0">
        <Image src="/fire.gif" fill alt="fire" />
      </div>
    </>
  );
}
