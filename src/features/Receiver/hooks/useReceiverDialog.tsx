import { setContent as setDialogContent } from "@core/redux/dialog/Dialog.store";
import { setToEdit as setReceiverToEdit } from "@core/redux/receiver/Receiver.store";
import { useDispatch } from "react-redux";
import CloseableDialog from "@shared/components/Dialog/CloseableDialog/CloseableDialog";
import React from "react";
import ConfirmRemove from "../ConfirmRemove/ConfirmRemove";
import Receiver from "../Receiver";

export default function useReceiverDialog() {
  const dispatch = useDispatch();

  function openConfirmReceiverRemoveDialog() {
    dispatch(
      setDialogContent(
        <CloseableDialog
          onClose={() => {
            openReceiverDialog();
          }}
        >
          <ConfirmRemove />
        </CloseableDialog>
      )
    );
  }

  function openReceiverDialog() {
    dispatch(
      setDialogContent(
        <CloseableDialog
          onClose={() => {
            dispatch(setReceiverToEdit(null));
            dispatch(setDialogContent(null));
          }}
        >
          <Receiver />
        </CloseableDialog>
      )
    );
  }

  return { openConfirmReceiverRemoveDialog, openReceiverDialog };
}
