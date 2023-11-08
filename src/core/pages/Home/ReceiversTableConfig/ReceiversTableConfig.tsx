import React from "react";
import i18next from "i18next";
import { TReceiver, TTableConfig } from "@core/types";
import receiversTableStyle from "./ReceiversTableConfig.module.scss";
import { formatCNPJ, formatCPF, identifyCnpjOrCpf } from "@core/helpers";

let receiversTableConfig: TTableConfig<TReceiver>;

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
          return identifyCnpjOrCpf(data.tax_id) === "CPF" ? (
            <span>{formatCPF(data.tax_id)}</span>
          ) : (
            <span>{formatCNPJ(data.tax_id)}</span>
          );
        },
      },
      {
        label: i18next.t("receiver.bank"),
        key: "bank_code",
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
            <div key={data.id} className={receiversTableStyle.draft}>
              Rascunho
            </div>
          ) : (
            <div key={data.id} className={receiversTableStyle.validated}>
              Validado
            </div>
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
