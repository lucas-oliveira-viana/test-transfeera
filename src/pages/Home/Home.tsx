import React, { useEffect } from "react";
import receiversService from "../../services/receivers";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { set as setReceiver } from "../../redux/receiver/Receiver.store";
import { useTranslation } from "react-i18next";
import AddIcon from "../../assets/svg/add.svg";
import styles from "./Home.module.scss";
import { TReceiver } from "../../types";

export default function Home() {
  const dispatch = useDispatch();
  const receivers = useSelector<RootState, TReceiver[]>((state) => state.receivers);

  const { t } = useTranslation();

  useEffect(() => {
    async function fetchReceivers() {
      try {
        const response = await receiversService.getReceivers();
        dispatch(setReceiver(response.data));
      } catch (e) {
        console.error("Error when trying to get receivers");
      }
    }

    fetchReceivers();
  }, []);

  return (
    <>
      <div className={styles.subheader}>
        <span className={styles.subheader_text}>{t("tabs.yourReceivers")}</span>
        <button className={styles.subheader_button}>
          <AddIcon />
        </button>
      </div>
      <main className={styles.content}>
        <p style={{ wordWrap: "break-word" }}>{JSON.stringify(receivers)}</p>
      </main>
    </>
  );
}
