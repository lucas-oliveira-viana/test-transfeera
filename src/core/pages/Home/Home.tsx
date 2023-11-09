import React, { useEffect } from "react";
import receiversService from "@core/services/receivers";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@core/redux/store";
import {
  setApiResponse as setReceiversApiResponse,
  setFormData as setReceiversFormData,
} from "@core/redux/receiver/Receiver.store";
import {
  setIsOpen as setIsDialogOpen,
  setContent as setDialogContent,
} from "@core/redux/dialog/Dialog.store";
import { set as setPage } from "@core/redux/page/Page.store";
import { useTranslation } from "react-i18next";
import AddIcon from "@shared/assets/svg/add.svg";
import styles from "./Home.module.scss";
import Table from "@core/components/atoms/Table/Table";
import { receiversTableConfig } from "./ReceiversTableConfig/ReceiversTableConfig";
import { PageEnum } from "@core/enum";
import Spinner from "@core/components/atoms/Spinner/Spinner";
import { TReceiverApi } from "@core/types";
import Receiver from "../Receiver/Receiver";
import Button from "@core/components/atoms/Button/Button";

export default function Home() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const receivers = useSelector<RootState, TReceiverApi[] | null>(
    (state) => state.receivers.apiResponse
  );

  const [receiversToRemove, setReceiversToRemove] = React.useState<
    TReceiverApi[]
  >([]);

  useEffect(() => {
    async function fetchReceivers() {
      try {
        const response = await receiversService.findAll();
        dispatch(setReceiversApiResponse(response.data));
      } catch (e) {
        // TODO abrir popup de erro
        console.error("Error when trying to get receivers");
      }
    }

    fetchReceivers();
  }, []);

  function handleEdit(data: TReceiverApi) {
    const receiverFormData = {
      id: data.id,
      name: data.name,
      document: data.tax_id,
      email: data.email,
      pixType: data.pix_key_type,
      pixKey: data.pix_key,
    };

    dispatch(setReceiversFormData(receiverFormData));
    dispatch(setIsDialogOpen(true));
    dispatch(setDialogContent(<Receiver />));
  }

  function handleCheckReceivers(data: TReceiverApi[]) {
    console.log({ data });
  }

  return (
    <>
      <div className={styles.subheader}>
        <span className={styles.subheader_text}>{t("tabs.yourReceivers")}</span>
        <button
          className={styles.subheader_button}
          onClick={() => {
            dispatch(setPage(PageEnum.RECEIVER));
          }}
        >
          <AddIcon />
        </button>
      </div>

      <section className={styles.content}>
        {!receivers ? (
          <Spinner size={"80px"} thickness={"10px"} />
        ) : (
          <div className={styles.wrapper}>
            <Button className={styles.remove_selected}>
              {t("home.removeSelected")}
            </Button>
            <Table
              config={receiversTableConfig}
              data={receivers}
              onRowClick={handleEdit}
              onCheck={handleCheckReceivers}
            />
          </div>
        )}
      </section>
    </>
  );
}
