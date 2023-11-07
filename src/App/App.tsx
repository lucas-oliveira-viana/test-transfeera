import React from "react";
import Home from "../pages/Home/Home";
import Tabs from "../components/atoms/Tabs/Tabs";
import Header from "../components/atoms/Header/Header";

export default function App() {
  return (
    <>
      <Header />
      <Tabs />
      <Home />
    </>
  );
}
