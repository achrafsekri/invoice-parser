import { getInvoice } from "  /shared/apiCalls";
import { useRouter } from "next/router";
import React from "react";
import JSONPretty from "react-json-pretty";
import { useQuery } from "react-query";
import { Editor } from "primereact/editor";

export const getDateStringWithTime = (date: string) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleString();
};

const Invoice = () => {
  const router = useRouter();
  const { invoiceId } = router.query;
  const { data, isError, isLoading, refetch } = useQuery("invoice", () =>
    getInvoice(invoiceId)
  );

  const { id, createdAt, title, image, invoiceinfo } = data || {};

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <img
        src={image}
        alt={title}
        className="my-8 w-1/2 border-4 border-blue-600 "
      />
      <h1 className="mb-4 text-2xl font-bold">{title}</h1>
      <p className="mb-8">{getDateStringWithTime(createdAt)}</p>
      <div className="border border-gray-300 p-4">
        {!isLoading && !isError && (
          <Editor
            value={invoiceinfo}
            readOnly={true}
            style={{ height: "320px" }}
          />
        )}
      </div>
    </div>
  );
};

export default Invoice;
