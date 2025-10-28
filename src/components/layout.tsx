import Head from "next/head";
import "@/app/globals.css";

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
      <main className="min-h-screen p-8 w-180 mx-auto">{children}</main>
    </>
  );
}
