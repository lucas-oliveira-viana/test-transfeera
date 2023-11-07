import React, { useState } from "react";
import Home from "../pages/Home/Home";
import Tabs from "../components/atoms/Tabs/Tabs";
import Header from "../components/atoms/Header/Header";
import { PageEnum } from "../enum";

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageEnum>(PageEnum.HOME);

  function renderPage() {
    const page = {
      [PageEnum.HOME]: <Home />,
      [PageEnum.CREATE]: <></>,
    };

    return page[currentPage] || <></>;
  }

  return (
    <>
      <Header />
      <Tabs />
      {renderPage()}
    </>
  );
}
