import React from "react";
import Home from "@core/pages/Home/Home";
import Tabs from "@shared/components/Tabs/Tabs";
import Header from "@core/components/Header/Header";
import { PageEnum } from "@core/enum";
import { useSelector } from "react-redux";
import { RootState } from "@core/redux/store";
import Receiver from "@core/pages/Receiver/Receiver";
import Dialog from "@shared/components/Dialog/Dialog";
import Toast from "@core/components/Toast/Toast";
import { Provider } from "react-redux";
import store from "@core/redux/store";

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
    <Provider store={store}>
      <Toast />
      <Dialog />
      <Header />
      <Tabs isCloseable={page !== PageEnum.HOME} />
      <main>{renderPage()}</main>
    </Provider>
  );
}
