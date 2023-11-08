import React from "react";
import styles from "./Create.module.scss";
import { useTranslation } from "react-i18next";
import Input from "@core/components/atoms/Input/Input";
import { dinamicallyFormatCPFOrCNPJ } from "@core/helpers";
import Button from "@core/components/atoms/Button/Button";

type Field = {
  label: string;
  type?: "text" | "select";
  options?: Array<{ label: string; value: string }>;
};

export default function Create() {
  const { t } = useTranslation();

  const formConfig: { [key: string]: Array<Field> } = {
    data: [
      {
        label: t("createReceiver.dataForm.name"),
      },
      {
        label: t("createReceiver.dataForm.document"),
      },
      {
        label: t("createReceiver.dataForm.email"),
      },
    ],
    pix: [
      {
        label: t("createReceiver.pixForm.type"),
        type: "select",
        options: [
          {
            label: t("createReceiver.pixKeyTypes.email"),
            value: "email",
          },
          {
            label: t("createReceiver.pixKeyTypes.cpf"),
            value: "cpf",
          },
          {
            label: t("createReceiver.pixKeyTypes.cnpj"),
            value: "cnpj",
          },
          {
            label: t("createReceiver.pixKeyTypes.random"),
            value: "aleatoria",
          },
        ],
      },
      {
        label: t("createReceiver.pixForm.key"),
      },
    ],
  };

  function renderField(field: Field) {
    return (
      <div key={field.label} className={styles.field}>
        <label className={styles.label}>{field.label}</label>
        {field.type === "select" ? (
          <select className={`${styles.input} ${styles.input_select}`}>
            {field.options &&
              field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
          </select>
        ) : (
          <Input type="text" mask={dinamicallyFormatCPFOrCNPJ} />
        )}
      </div>
    );
  }

  return (
    <section className={styles.content}>
      <h1 className={styles.title}>{t("createReceiver.dataTitle")}</h1>
      <div className={`${styles.wrapper} ${styles.wrapper_data}`}>
        {formConfig.data.map((field) => renderField(field))}
      </div>
      <h1 className={styles.title}>{t("createReceiver.pixTitle")}</h1>
      <div className={`${styles.wrapper} ${styles.wrapper_pix}`}>
        {formConfig.pix.map((field) => renderField(field))}
      </div>
      <div className={styles.actions_wrapper}>
        <Button className={styles.cancel}>{t("createReceiver.actions.cancel")}</Button>
        <Button className={styles.save}>{t("createReceiver.actions.save")}</Button>
      </div>
    </section>
  );
}
