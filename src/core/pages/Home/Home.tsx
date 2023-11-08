import React, { useEffect } from "react";
import receiversService from "@core/services/receivers";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@core/redux/store";
import { set as setReceiver } from "@core/redux/receiver/Receiver.store";
import { set as setPage } from "@core/redux/page/Page.store";
import { useTranslation } from "react-i18next";
import AddIcon from "@shared/assets/svg/add.svg";
import styles from "./Home.module.scss";
import { TReceiver } from "@core/types";
import Table from "@core/components/atoms/Table/Table";
import { receiversTableConfig } from "./ReceiversTableConfig/ReceiversTableConfig";
import { PageEnum } from "@core/enum";

export default function Home() {
  const dispatch = useDispatch();
  const receivers = useSelector<RootState, TReceiver[]>(
    (state) => state.receivers
  );

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
        <button
          className={styles.subheader_button}
          onClick={() => {
            dispatch(setPage(PageEnum.CREATE));
          }}
        >
          <AddIcon />
        </button>
      </div>
      <section className={styles.content}>
        <Table config={receiversTableConfig} data={receivers} />
      </section>
    </>
  );
}
