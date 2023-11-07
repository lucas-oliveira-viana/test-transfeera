import React from "react";
import Logo from "../../../assets/svg/transfeera-logo.svg";
import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <Logo />
    </header>
  );
}
