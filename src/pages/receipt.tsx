import MainLayout from "  /layouts/MainLayout";
import React from "react";
import ParserForm from "  /Components/home/ParserForm";
const receipt = () => {
  return (
    <MainLayout>
      <ParserForm paperType="Parse a Receipt" />
    </MainLayout>
  );
};

export default receipt;
