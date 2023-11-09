import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./Tabs.module.scss";
import CloseIcon from "@shared/assets/svg/close.svg";
import { useDispatch } from "react-redux";
import { set as setPage } from "@core/redux/page/Page.store";
import { PageEnum } from "@core/enum";

type Props = {
  isCloseable: boolean;
};

export default function Tabs({ isCloseable }: Props) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  return (
    <nav className={styles.nav}>
      {isCloseable ? (
        <button
          className={`${styles.button} ${styles.button_close}`}
          onClick={() => {
            dispatch(setPage(PageEnum.HOME));
          }}
        >
          <CloseIcon fill="var(--white)" />
        </button>
      ) : (
        <button className={`${styles.button} ${styles.button_tab}`}>
          <span className={styles.text}>{t("tabs.yourReceivers")}</span>
        </button>
      )}
    </nav>
  );
}
