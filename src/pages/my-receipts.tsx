import MainLayout from "  /layouts/MainLayout";
import React from "react";

import InvoiceTable from "../components/my-invoices/InvoiceTable";
const MyReceipts = () => {
  return (
    <MainLayout>
      <InvoiceTable />
    </MainLayout>
  );
};

export default MyReceipts;
