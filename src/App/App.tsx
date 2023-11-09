import React, { useEffect } from "react";
import Home from "@core/pages/Home/Home";
import Tabs from "@core/components/atoms/Tabs/Tabs";
import Header from "@core/components/atoms/Header/Header";
import { PageEnum } from "@core/enum";
import { useSelector } from "react-redux";
import { RootState } from "@core/redux/store";
import Receiver from "@core/pages/Receiver/Receiver";
import Dialog from "@core/components/atoms/Dialog/Dialog";

export default function App() {
  const page = useSelector<RootState, PageEnum>((state) => state.page);

  function renderPage() {
    const pages = {
      [PageEnum.HOME]: <Home />,
      [PageEnum.RECEIVER]: <Receiver />,
      [PageEnum.EMPTY]: <></>,
    };

    return pages[page] || <Home />;
  }

  return (
    <>
      <Dialog />
      <Header />
      <Tabs isCloseable={page !== PageEnum.HOME} />
      <main>{renderPage()}</main>
    </>
  );
}
