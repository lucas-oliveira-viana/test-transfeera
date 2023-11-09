import React, { useEffect } from "react";
import styles from "./Toast.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@core/redux/store";
import { TToast } from "@core/types";
import {
  setIsOpen as setIsToastOpen,
  setContent as setToastContent,
} from "@core/redux/toast/Toast.store";

const TIME_TO_HIDE_TOAST = 5000;

export default function Toast() {
  const { isOpen, content } = useSelector<RootState, TToast>(
    (state) => state.toast
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        dispatch(setIsToastOpen(false));
        dispatch(setToastContent(null));
      }, TIME_TO_HIDE_TOAST);
    }
  }, [isOpen]);

  return <>{isOpen && <div className={styles.toast}>{content}</div>}</>;
}
