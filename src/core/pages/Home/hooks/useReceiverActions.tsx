import { TReceiverSource, TReceiverToEdit } from "@core/types";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import {
  setSource as setReceiversSource,
  setToEdit as setReceiverToEdit,
} from "@core/redux/receiver/Receiver.store";
import {
  setIsOpen as setIsDialogOpen,
  setContent as setDialogContent,
} from "@core/redux/dialog/Dialog.store";
import useNotifier from "@core/hooks/useNotification";
import receiversService from "@core/services/receivers";
import useReceiverDialog from "@core/pages/Receiver/hooks/useReceiverDialog";

export default function useReceiversActions() {
  const [receiversToRemove, setReceiversToRemove] = React.useState<
    TReceiverSource[]
  >([]);
  const [isRemoving, setIsRemoving] = React.useState(false);

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { notifyError } = useNotifier();
  const { openReceiverDialog } = useReceiverDialog();

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
    openReceiverDialog();
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

  return {
    isRemoving,
    receiversToRemove,
    handleEdit,
    handleCheckReceivers,
    handleRemoveReceivers,
  };
}
