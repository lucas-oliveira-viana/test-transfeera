import React from "react";
import Home from "@core/pages/Home/Home";
import Tabs from "@core/components/atoms/Tabs/Tabs";
import Header from "@core/components/atoms/Header/Header";
import { PageEnum } from "@core/enum";
import { useSelector } from "react-redux";
import { RootState } from "@core/redux/store";
import Create from "@core/pages/Create/Create";

export default function App() {
  const page = useSelector<RootState, PageEnum>((state) => state.page);

  function renderPage() {
    const pages = {
      [PageEnum.HOME]: <Home />,
      [PageEnum.CREATE]: <Create />,
    };

    return pages[page] || <Home />;
  }

  return (
    <>
      <Header />
      <Tabs isCloseable={page !== PageEnum.HOME} />
      <main>{renderPage()}</main>
    </>
  );
}
