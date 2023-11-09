import React, { useEffect } from "react";
import receiversService from "@core/services/receivers";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@core/redux/store";
import {
  setSource as setReceiversSource,
  setToEdit as setReceiverToEdit,
} from "@core/redux/receiver/Receiver.store";
import {
  setIsOpen as setIsDialogOpen,
  setContent as setDialogContent,
} from "@core/redux/dialog/Dialog.store";
import { set as setPage } from "@core/redux/page/Page.store";
import { useTranslation } from "react-i18next";
import AddIcon from "@shared/assets/svg/add.svg";
import styles from "./Home.module.scss";
import Table from "@shared/components/Table/Table";
import useReceiversTableConfig from "./hooks/useReceiversTableConfig";
import { PageEnum } from "@core/enum";
import Spinner from "@shared/components/Spinner/Spinner";
import { TReceiverSource, TReceiverToEdit } from "@core/types";
import Button from "@shared/components/Button/Button";
import useNotifier from "@core/hooks/useNotification";
import DialogReceiver from "@core/pages/Receiver/Dialog/Dialog";

export default function Home() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { notifyError } = useNotifier();

  const receiversTableConfig = useReceiversTableConfig();

  const receivers = useSelector<RootState, TReceiverSource[] | null>(
    (state) => state.receivers.source
  );

  const [receiversToRemove, setReceiversToRemove] = React.useState<
    TReceiverSource[]
  >([]);
  const [isRemoving, setIsRemoving] = React.useState(false);

  async function fetchReceivers() {
    try {
      const response = await receiversService.findAll();
      dispatch(setReceiversSource(response.data));
    } catch (e) {
      notifyError({ children: t("notifications.errorTryingToGetReceivers") });
    }
  }

  useEffect(() => {
    fetchReceivers();
  }, []);

  function handleEdit(data: TReceiverSource) {
    const receiverToEdit: TReceiverToEdit = {
      id: data.id,
      name: data.name,
      taxId: data.tax_id,
      bankId: data.bank_code,
      branch: data.branch,
      account: data.account,
      accountType: data.account_type,
      status: data.status,
      email: data.email,
      pixKey: data.pix_key || "",
      pixType: data.pix_key_type,
    };

    dispatch(setReceiverToEdit(receiverToEdit));
    dispatch(setIsDialogOpen(true));
    dispatch(setDialogContent(<DialogReceiver />));
  }

  function handleCheckReceivers(data: TReceiverSource[]) {
    setReceiversToRemove(data);
  }

  function handleRemoveReceivers(data: TReceiverSource[]) {
    const requests = data.map((item) => receiversService.removeById(item.id));

    setIsRemoving(true);

    Promise.all(requests)
      .then(async () => {
        dispatch(setReceiversSource(null));
        await fetchReceivers();
        setIsRemoving(false);
      })
      .catch(() => {
        notifyError({
          children: t("notifications.errorTryingToRemoveReceivers"),
        });
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
              disabledRows={isRemoving ? receiversToRemove : []}
              onRowClick={handleEdit}
              onCheck={handleCheckReceivers}
            />
          </div>
        )}
      </section>
    </>
  );
}
