import Header from "../Components/global/Header";
import SideBar from "../Components/global/SideBar";

export const metadata = {
  title: "invoice-parser",
  description:
    "invoice-parser is a web app that allows you to upload an invoice and get the data in a structured format.",
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-screen overflow-auto bg-gray-50">
      <body className="bg-gray-50 ">
        <Header />
        <SideBar />
        <div className="w-full px-4 pt-4 sm:px-6 md:px-8 lg:pl-72">
          {children}
        </div>
      </body>
    </html>
  );
}
