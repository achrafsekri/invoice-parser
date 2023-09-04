import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import MainLayout from "../layouts/MainLayout";
import InvoiceTable from "../components/my-invoices/InvoiceTable";

const Index: NextPage = () => {
  return (
    <MainLayout>
      <InvoiceTable />
    </MainLayout>
  );
};

export default Index;
