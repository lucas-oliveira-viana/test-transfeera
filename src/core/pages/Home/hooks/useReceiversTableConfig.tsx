import React, { ReactNode } from "react";
import { TReceiverSource, TTableConfig } from "@core/types";
import receiversTableConfigStyle from "./ReceiversTableConfig.module.scss";
import { formatCNPJ, formatCPF, identifyCNPJOrCPF } from "@core/helpers";
import LogoBancoDoBrasil from "@shared/assets/svg/logo-bancos/banco-brasil.svg";
import LogoItau from "@shared/assets/svg/logo-bancos/itau.svg";
import LogoNubank from "@shared/assets/svg/logo-bancos/nubank.svg";
import LogoSantander from "@shared/assets/svg/logo-bancos/santander.svg";
import LogoOtherBank from "@shared/assets/svg/logo-bancos/other.svg";
import { BANK_CODE, BANK_DICTIONARY } from "@core/constants";
import {
  ReceiverStatusTagDraft,
  ReceiverStatusTagValidated,
} from "@core/components/ReceiverStatusTags/ReceiverStatusTags";
import { useTranslation } from "react-i18next";

export default function useReceiversTableConfig(): TTableConfig<TReceiverSource> {
  const { t } = useTranslation();

  return {
    columns: [
      {
        label: t("receiver.name"),
        key: "name",
      },
      {
        label: t("receiver.taxId"),
        key: "tax_id",
        render: (data) => {
          return identifyCNPJOrCPF(data.tax_id) === "CPF" ? (
            <span>{formatCPF(data.tax_id)}</span>
          ) : (
            <span>{formatCNPJ(data.tax_id)}</span>
          );
        },
      },
      {
        label: t("receiver.bank"),
        key: "bank_code",
        render: (data) => {
          return BANK_DICTIONARY[data.bank_code] ? (
            <span>
              <div className={receiversTableConfigStyle.bank_logo}>
                {BANK_DICTIONARY[data.bank_code].icon}
              </div>
            </span>
          ) : (
            <div className={receiversTableConfigStyle.bank_logo}>
              <LogoOtherBank />
            </div>
          );
        },
      },
      {
        label: t("receiver.branch"),
        key: "branch",
      },
      {
        label: t("receiver.account"),
        key: "account",
      },
      {
        label: t("receiver.status"),
        key: "status",
        render: (data) => {
          return data.status === "rascunho" ? (
            <ReceiverStatusTagDraft />
          ) : (
            <ReceiverStatusTagValidated />
          );
        },
      },
    ],
    style: receiversTableConfigStyle,
  };
}
