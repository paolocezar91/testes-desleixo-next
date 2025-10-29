import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/quiz/satyrzinho",
      permanent: true,
    },
  };
};

export default function Home() {
  return null;
}
