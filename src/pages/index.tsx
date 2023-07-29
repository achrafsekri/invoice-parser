import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import MainLayout from "../layouts/MainLayout";

const Home: NextPage = () => {
  const { data: session } = useSession();

  return <MainLayout>hahaha</MainLayout>;
};

export default Home;
