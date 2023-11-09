import React from "react";
import styles from "./ReceiverStatusTags.module.scss";
import { useTranslation } from "react-i18next";

export function ReceiverStatusTagDraft() {
  const { t } = useTranslation();

  return <div className={styles.draft}>{t("receiver.statusTypes.draft")}</div>;
}

export function ReceiverStatusTagValidated() {
  const { t } = useTranslation();

  return (
    <div className={styles.validated}>
      {t("receiver.statusTypes.validated")}
    </div>
  );
}
