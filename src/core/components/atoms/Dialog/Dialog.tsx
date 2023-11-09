import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@core/redux/store";
import styles from "./Dialog.modules.scss";
import { TDialog } from "@core/types";

export default function Dialog() {
  const { isOpen, content } = useSelector<RootState, TDialog>(
    (state) => state.dialog
  );

  const ref = useRef<HTMLDialogElement>();

  useEffect(() => {
    if (ref.current) {
      isOpen ? ref.current.showModal() : ref.current.close();
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <dialog className={styles.dialog} ref={ref}>
          {content}
        </dialog>
      )}
    </>
  );
}
