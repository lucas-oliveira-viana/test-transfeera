import { useState } from "react";
import { PageEnum } from "@core/enum";
import { TPixType, TReceiverSource, TReceiverFormData } from "@core/types";
import { set as setPage } from "@core/redux/page/Page.store";
import {
  setSourceResponse as setReceiversSourceResponse,
  setFormData as setReceiversFormData,
} from "@core/redux/receiver/Receiver.store";
import { setIsOpen as setIsDialogOpen } from "@core/redux/dialog/Dialog.store";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import useNotifier from "@core/hooks/useNotification";
import receiversService from "@core/services/receivers";

export default function useReceiverActions(
  isEdit: boolean,
  formData: TReceiverFormData
) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { notifySuccess } = useNotifier();
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

    if (isEdit) {
      dispatch(setIsDialogOpen(false));
      return;
    }

    dispatch(setPage(PageEnum.HOME));
  }

  function handleSave() {
    const { id, name, document, email, pixType, pixKey } = formData;

    const payload: TReceiverSource = {
      id: id,
      name: name,
      email: email,
      tax_id: document,
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

    if (isEdit) {
      receiversService
        .update(payload)
        .then(() => {
          dispatch(setReceiversFormData(null));
          dispatch(setIsDialogOpen(false));

          refreshHome();
        })
        .catch(() => {
          // TODO abrir popup de erro
        })
        .finally(() => {
          setIsLoading(false);
        });

      return;
    }

    receiversService
      .save(payload)
      .then(() => {
        notifySuccess({ children: t("notifications.updateReceiversSuccess") });
        dispatch(setReceiversFormData(null));
        refreshHome();
      })
      .catch(() => {
        // TODO abrir popup de erro
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return { isLoading, handleCancel, handleSave };
}
