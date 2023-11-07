import React, { useState } from "react";
import Home from "../pages/Home/Home";
import Tabs from "../core/components/atoms/Tabs/Tabs";
import Header from "../core/components/atoms/Header/Header";
import { PageEnum } from "../shared/enum";

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
