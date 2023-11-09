import React, { useEffect } from "react";
import receiversService from "@core/services/receivers";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@core/redux/store";
import {
  setSourceResponse as setReceiversSourceResponse,
  setFormData as setReceiversFormData,
} from "@core/redux/receiver/Receiver.store";
import {
  setIsOpen as setIsDialogOpen,
  setContent as setDialogContent,
} from "@core/redux/dialog/Dialog.store";
import {
  setIsOpen as setIsToastOpen,
  setContent as setToastContent,
} from "@core/redux/toast/Toast.store";
import { set as setPage } from "@core/redux/page/Page.store";
import { useTranslation } from "react-i18next";
import AddIcon from "@shared/assets/svg/add.svg";
import styles from "./Home.module.scss";
import Table from "@shared/components/Table/Table";
import { receiversTableConfig } from "./ReceiversTableConfig/ReceiversTableConfig";
import { PageEnum } from "@core/enum";
import Spinner from "@shared/components/Spinner/Spinner";
import { TReceiverSource, TReceiverFormData } from "@core/types";
import Receiver from "../Receiver/Receiver";
import Button from "@shared/components/Button/Button";
import useNotifier from "@core/hooks/useNotification";

export default function Home() {
  const dispatch = useDispatch();
  const { notifyError } = useNotifier();
  const { t } = useTranslation();
  const receivers = useSelector<RootState, TReceiverSource[] | null>(
    (state) => state.receivers.apiResponse
  );

  const [receiversToRemove, setReceiversToRemove] = React.useState<
    TReceiverSource[]
  >([]);
  const [isRemoving, setIsRemoving] = React.useState(false);

  async function fetchReceivers() {
    try {
      const response = await receiversService.findAll();
      dispatch(setReceiversSourceResponse(response.data));
    } catch (e) {
      notifyError({ children: t("notifications.errorTryingToGetReceivers") });
    }
  }

  useEffect(() => {
    fetchReceivers();
  }, []);

  function handleEdit(data: TReceiverSource) {
    const receiverFormData: TReceiverFormData = {
      id: data.id,
      name: data.name,
      document: data.tax_id,
      email: data.email,
      pixType: data.pix_key_type,
      pixKey: data.pix_key || "",
    };

    dispatch(setReceiversFormData(receiverFormData));
    dispatch(setIsDialogOpen(true));
    dispatch(setDialogContent(<Receiver />));
  }

  function handleCheckReceivers(data: TReceiverSource[]) {
    setReceiversToRemove(data);
  }

  function handleRemoveReceivers(data: TReceiverSource[]) {
    const requests = data.map((item) => receiversService.removeById(item.id));

    setIsRemoving(true);

    Promise.all(requests)
      .then(async () => {
        dispatch(setReceiversSourceResponse(null));
        await fetchReceivers();
        setIsRemoving(false);
      })
      .catch(() => {
        // TODO abrir popup de erro
      });
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
            <Button
              className={styles.remove_selected}
              disabled={isRemoving || receiversToRemove.length === 0}
              onClick={() => {
                handleRemoveReceivers(receiversToRemove);
              }}
            >
              {isRemoving ? (
                <Spinner size="20px" thickness="2px" color="var(--white)" />
              ) : (
                t("home.removeSelected")
              )}
            </Button>
            <Table
              config={receiversTableConfig}
              data={receivers}
              onRowClick={handleEdit}
              onCheck={handleCheckReceivers}
              disabledRows={isRemoving ? receiversToRemove : []}
            />
          </div>
        )}
      </section>
    </>
  );
}
