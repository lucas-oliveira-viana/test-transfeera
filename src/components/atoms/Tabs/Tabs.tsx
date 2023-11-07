import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./Tabs.module.scss";

export default function Tabs() {
  const { t } = useTranslation();
  return (
    <nav className={styles.nav}>
      <button className={styles.button}>
        <span className={styles.text}>{t("tabs.yourReceivers")}</span>
      </button>
    </nav>
  );
}
