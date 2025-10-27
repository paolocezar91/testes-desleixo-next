import Head from "next/head";
import "@/app/globals.css";

export default function RootLayout({
  children,
  title,
}: Readonly<{
  children: React.ReactNode;
  title: string;
}>) {
  title = "Quiz Memes -- " + title;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main className="min-h-screen p-8 max-w-2xl mx-auto">{children}</main>
    </>
  );
}
