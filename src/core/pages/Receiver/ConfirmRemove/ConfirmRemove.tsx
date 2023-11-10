import React from "react";
import styles from "./ConfirmRemove.module.scss";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@core/redux/store";
import { TReceiverToEdit } from "@core/types";
import Button from "@shared/components/Button/Button";
import Spinner from "@shared/components/Spinner/Spinner";
import receiversService from "@core/services/receivers";
import { PageEnum } from "@core/enum";
import { set as setPage } from "@core/redux/page/Page.store";
import {
  setSource as setReceiversSourceResponse,
  setToEdit as setReceiversFormData,
} from "@core/redux/receiver/Receiver.store";
import useNotifier from "@core/hooks/useNotification";
import useReceiverDialog from "../hooks/useReceiverDialog";

export default function ConfirmRemove() {
  const dispatch = useDispatch();
  const receiver = useSelector<RootState, TReceiverToEdit | null>(
    (state) => state.receivers.toEdit
  );
  const { t } = useTranslation();
  const { notifyError } = useNotifier();
  const { openReceiverDialog } = useReceiverDialog();

  const [isLoading, setIsLoading] = React.useState(false);

  function handleCancel() {
    openReceiverDialog();
  }

  async function handleRemove() {
    const { id } = receiver;
    setIsLoading(true);

    try {
      await receiversService.removeById(id);

      dispatch(setReceiversFormData(null));
      dispatch(setReceiversSourceResponse(null));
      dispatch(setPage(PageEnum.EMPTY));
      setTimeout(() => {
        dispatch(setPage(PageEnum.HOME));
      }, 0);
    } catch (e) {
      notifyError({ children: t("notifications.genericError") });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{t("confirmRemoveReceiver.title")}</h2>
      <p className={styles.ask_confirm}>
        {t("confirmRemoveReceiver.askConfirm", { name: receiver.name })}
      </p>
      <p className={styles.description}>
        {t("confirmRemoveReceiver.description")}
      </p>
      <div className={styles.actions_wrapper}>
        <Button
          className={styles.cancel}
          onClick={handleCancel}
          disabled={isLoading}
        >
          {isLoading ? (
            <Spinner size="20px" thickness="2px" color="var(--cyan-4)" />
          ) : (
            t("confirmRemoveReceiver.actions.cancel")
          )}
        </Button>
        <Button
          className={styles.save}
          onClick={() => handleRemove()}
          disabled={isLoading}
        >
          {isLoading ? (
            <Spinner size="20px" thickness="2px" color="var(--white)" />
          ) : (
            t("confirmRemoveReceiver.actions.confirm")
          )}
        </Button>
      </div>
    </div>
  );
}
