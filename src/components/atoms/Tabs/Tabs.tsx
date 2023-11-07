import React from "react";
import { useTranslation } from "react-i18next";
import "./Tabs.scss";

export default function Tabs() {
  const { t } = useTranslation();
  return (
    <nav>
      <div className="tab-wrapper">
        <button>{t("tabs.yourReceivers")}</button>
      </div>
    </nav>
  );
}
