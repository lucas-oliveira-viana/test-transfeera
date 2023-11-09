import React, { ReactNode } from "react";
import i18next from "i18next";
import { TReceiverSource, TTableConfig } from "@core/types";
import receiversTableStyle from "./ReceiversTableConfig.module.scss";
import { formatCNPJ, formatCPF, identifyCNPJOrCPF } from "@core/helpers";
import LogoBancoDoBrasil from "@shared/assets/svg/logo-bancos/banco-brasil.svg";
import LogoItau from "@shared/assets/svg/logo-bancos/itau.svg";
import LogoNubank from "@shared/assets/svg/logo-bancos/nubank.svg";
import LogoSantander from "@shared/assets/svg/logo-bancos/santander.svg";
import LogoOtherBank from "@shared/assets/svg/logo-bancos/other.svg";
import { BANK_CODE } from "@core/constants";
import {
  ReceiverStatusTagDraft,
  ReceiverStatusTagValidated,
} from "@core/components/ReceiverStatusTags/ReceiverStatusTags";

let receiversTableConfig: TTableConfig<TReceiverSource>;

function fillConfig() {
  receiversTableConfig = {
    columns: [
      {
        label: i18next.t("receiver.name"),
        key: "name",
      },
      {
        label: i18next.t("receiver.taxId"),
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
        label: i18next.t("receiver.bank"),
        key: "bank_code",
        render: (data) => {
          const contentByBankCode: { [key: string]: string | ReactNode } = {
            [BANK_CODE.SANTANDER]: (
              <div className={receiversTableStyle.bank_logo}>
                <LogoSantander fill="#F70000" />
              </div>
            ),
            [BANK_CODE.ITAU]: (
              <div className={receiversTableStyle.bank_logo}>
                <LogoItau fill="#2D2F8D" />
              </div>
            ),
            [BANK_CODE.BANCO_DO_BRASIL]: (
              <div className={receiversTableStyle.bank_logo}>
                <LogoBancoDoBrasil fill="#003B9F" />
              </div>
            ),
            [BANK_CODE.NUBANK]: (
              <div className={receiversTableStyle.bank_logo}>
                <LogoNubank fill="#8303D2" />
              </div>
            ),
          };

          return contentByBankCode[data.bank_code] ? (
            <span>{contentByBankCode[data.bank_code]}</span>
          ) : (
            <div className={receiversTableStyle.bank_logo}>
              <LogoOtherBank />
            </div>
          );
        },
      },
      {
        label: i18next.t("receiver.branch"),
        key: "branch",
      },
      {
        label: i18next.t("receiver.account"),
        key: "account",
      },
      {
        label: i18next.t("receiver.status"),
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
    style: receiversTableStyle,
  };
}

fillConfig();

i18next.on("languageChanged init", () => {
  fillConfig();
});

// TODO alterar para export default
export { receiversTableConfig };
