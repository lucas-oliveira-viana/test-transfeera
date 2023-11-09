import React, { ReactNode } from "react";
import styles from "./CloseableDialog.module.scss";
import CloseIcon from "@shared/assets/svg/close.svg";

type Props = {
  onClose: () => void;
  children: ReactNode;
};

export default function CloseableDialog({ children, onClose }: Props) {
  return (
    <div className={styles.wrapper}>
      <button className={styles.button} onClick={onClose}>
        <CloseIcon fill="#000000" />
      </button>
      {children}
    </div>
  );
}
