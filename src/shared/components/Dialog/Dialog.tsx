import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@core/redux/store";
import styles from "./Dialog.modules.scss";
import { TDialog } from "@core/types";

export default function Dialog() {
  const { content } = useSelector<RootState, TDialog>((state) => state.dialog);

  const ref = useRef<HTMLDialogElement>();

  useEffect(() => {
    if (ref.current) {
      content ? ref.current.showModal() : ref.current.close();
    }
  }, [content]);

  return (
    <>
      {content && (
        <dialog className={styles.dialog} ref={ref}>
          {content}
        </dialog>
      )}
    </>
  );
}
