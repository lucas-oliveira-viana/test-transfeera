import { useState } from "react";
import { PageEnum } from "@core/enum";
import {
  TPixType,
  TReceiverSource,
  TReceiverFormData,
  TStatus,
} from "@core/types";
import { set as setPage } from "@core/redux/page/Page.store";
import {
  setSource as setReceiversSourceResponse,
  setToEdit as setReceiversFormData,
} from "@core/redux/receiver/Receiver.store";
import { setContent as setDialogContent } from "@core/redux/dialog/Dialog.store";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import useNotifier from "@core/hooks/useNotification";
import receiversService from "@core/services/receivers";
import useReceiverDialog from "./useReceiverDialog";

export default function useReceiverActions(
  edit: TStatus | null,
  formData: TReceiverFormData
) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { notifySuccess, notifyError } = useNotifier();
  const { openConfirmReceiverRemoveDialog, openReceiverDialog } =
    useReceiverDialog();

  const [isLoading, setIsLoading] = useState(false);

  function refreshHome() {
    dispatch(setReceiversSourceResponse(null));
    dispatch(setPage(PageEnum.EMPTY));
    setTimeout(() => {
      dispatch(setPage(PageEnum.HOME));
    }, 0);
  }

  function handleCancel() {
    dispatch(setReceiversFormData(null));

    if (!!edit) {
      dispatch(setDialogContent(null));
      return;
    }

    dispatch(setPage(PageEnum.HOME));
  }

  async function handleSave() {
    const { id, name, taxId, email, pixType, pixKey } = formData;

    const payload: TReceiverSource = {
      id: id,
      name: name,
      email: email,
      tax_id: taxId,
      branch: "",
      account: "",
      account_type: "",
      bank_name: "",
      bank_code: "",
      pix_key: pixKey,
      pix_key_type: pixType as TPixType,
      status: "rascunho",
      created_at: "",
      updated_at: "",
    };

    setIsLoading(true);

    try {
      await receiversService.save(payload);

      notifySuccess({ children: t("notifications.saveReceiversSuccess") });
      dispatch(setReceiversFormData(null));
      refreshHome();
    } catch (e) {
      notifyError({ children: t("notifications.genericError") });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleEdit() {
    const { id, name, taxId, email, pixType, pixKey } = formData;

    if (edit === "validado") {
      setIsLoading(true);

      try {
        await receiversService.patch({ id, email });

        notifySuccess({ children: t("notifications.updateReceiversSuccess") });
        dispatch(setReceiversFormData(null));
        dispatch(setDialogContent(null));
        refreshHome();
      } catch (e) {
        notifyError({ children: t("notifications.genericError") });
      } finally {
        setIsLoading(false);
      }

      return;
    }

    const payload: TReceiverSource = {
      id: id,
      name: name,
      email: email,
      tax_id: taxId,
      branch: "",
      account: "",
      account_type: "",
      bank_name: "",
      bank_code: "",
      pix_key: pixKey,
      pix_key_type: pixType as TPixType,
      status: "rascunho",
      created_at: "",
      updated_at: "",
    };

    setIsLoading(true);

    try {
      await receiversService.update(payload);

      dispatch(setReceiversFormData(null));
      dispatch(setDialogContent(null));
      refreshHome();
    } catch (e) {
      notifyError({ children: t("notifications.genericError") });
    } finally {
      setIsLoading(false);
    }

    return;
  }

  function handleRemove() {
    openConfirmReceiverRemoveDialog();
  }

  return {
    isLoading,
    handleCancel,
    handleSave,
    handleEdit,
    handleRemove,
    openReceiverDialog,
  };
}
