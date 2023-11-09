import React, { ReactNode } from "react";
import styles from "./Notification.module.scss";
import CloseIcon from "@shared/assets/svg/close.svg";

type Props = {
  styles: string;
  children: ReactNode;
  onClose: () => any;
};

type ExposedNotificationProps = {
  children: ReactNode;
  onClose: () => any;
};

export default function Notification(props: Props) {
  return (
    <div className={`${styles.notification} ${props.styles}`}>
      <span>{props.children}</span>
      <button onClick={props.onClose}>
        <CloseIcon fill="var(--white)" />
      </button>
    </div>
  );
}

export function NotificationError({
  children,
  onClose,
}: ExposedNotificationProps) {
  return (
    <Notification styles={styles.error} onClose={onClose}>
      {children}
    </Notification>
  );
}

export function NotificationSuccess({
  children,
  onClose,
}: ExposedNotificationProps) {
  return (
    <Notification styles={styles.success} onClose={onClose}>
      {children}
    </Notification>
  );
}
