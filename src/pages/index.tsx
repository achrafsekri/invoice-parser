import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import MainLayout from "../layouts/MainLayout";
import ParserForm from "  /Components/home/ParserForm";

const Home: NextPage = () => {
  const { data: session } = useSession();

  return (
    <MainLayout>
      <ParserForm />
    </MainLayout>
  );
};

export default Home;
