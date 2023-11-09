import { useState } from "react";
import { PageEnum } from "@core/enum";
import { TPixType, TReceiverApi, TReceiverFormData } from "@core/types";
import { set as setPage } from "@core/redux/page/Page.store";
import {
  setApiResponse as setReceiversApiResponse,
  setFormData as setReceiversFormData,
} from "@core/redux/receiver/Receiver.store";
import { setIsOpen as setIsDialogOpen } from "@core/redux/dialog/Dialog.store";
import { useDispatch } from "react-redux";
import receiversService from "@core/services/receivers";

export default function useReceiverActions(
  isEdit: boolean,
  formData: TReceiverFormData
) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  function refreshHome() {
    dispatch(setReceiversApiResponse(null));
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

    const payload: TReceiverApi = {
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
