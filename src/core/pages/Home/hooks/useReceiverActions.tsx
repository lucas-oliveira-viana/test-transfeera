import React from "react";
import { TReceiverQueryParams, TReceiverSource, TReceiverToEdit } from "@core/types";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import {
  setSource as setReceiversSource,
  setToEdit as setReceiverToEdit,
} from "@core/redux/receiver/Receiver.store";
import useNotifier from "@core/hooks/useNotification";
import receiversService from "@core/services/receivers";
import useReceiverDialog from "@core/pages/Receiver/hooks/useReceiverDialog";
import { INITIAL_PAGINATION_CONFIG } from "@core/constants";

type Props = {
  fetchReceivers: (params: TReceiverQueryParams) => Promise<void>;
};

export default function useReceiversActions({ fetchReceivers }: Props) {
  const [receiversToRemove, setReceiversToRemove] = React.useState<
    TReceiverSource[]
  >([]);
  const [isRemoving, setIsRemoving] = React.useState(false);

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { notifyError } = useNotifier();
  const { openReceiverDialog } = useReceiverDialog();

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

    try {
      Promise.all(requests).then(async () => {
        dispatch(setReceiversSource(null));
        await fetchReceivers({
          _limit: INITIAL_PAGINATION_CONFIG.pageSize,
          _page: 1,
        });
        setIsRemoving(false);
      });
    } catch (e) {
      notifyError({
        children: t("notifications.errorTryingToRemoveReceivers"),
      });
    }
  }

  return {
    isRemoving,
    receiversToRemove,
    handleEdit,
    handleCheckReceivers,
    handleRemoveReceivers,
  };
}
