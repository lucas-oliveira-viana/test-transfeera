import React from "react";
import { ReactNode } from "react";
import {
  setContent as setToastContent,
} from "@core/redux/toast/Toast.store";
import { useDispatch } from "react-redux";
import {
  NotificationError,
  NotificationSuccess,
} from "../../shared/components/Notification/Notification";

type Props = {
  children: ReactNode;
};

export default function useNotifier() {
  const dispatch = useDispatch();

  function handleClose() {
    dispatch(setToastContent(null));
  }

  function notifyError({ children }: Props) {
    dispatch(
      setToastContent(
        <NotificationError onClose={handleClose}>{children}</NotificationError>
      )
    );
  }

  function notifySuccess({ children }: Props) {
    dispatch(
      setToastContent(
        <NotificationSuccess onClose={handleClose}>
          {children}
        </NotificationSuccess>
      )
    );
  }

  return { notifyError, notifySuccess };
}
