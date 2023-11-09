import React from "react";
import Receiver from "../Receiver";
import styles from "./Dialog.module.scss";
import CloseIcon from "@shared/assets/svg/close.svg";
import { setToEdit as setReceiverToEdit } from "@core/redux/receiver/Receiver.store";
import {
  setIsOpen as setIsDialogOpen,
  setContent as setDialogContent,
} from "@core/redux/dialog/Dialog.store";
import { useDispatch } from "react-redux";

export default function Dialog() {
  const dispatch = useDispatch();

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.button}
        onClick={() => {
          dispatch(setReceiverToEdit(null));
          dispatch(setIsDialogOpen(null));
          dispatch(setDialogContent(null));
        }}
      >
        <CloseIcon fill="#000000" />
      </button>
      <Receiver />
    </div>
  );
}
