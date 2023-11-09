import React from "react";
import defaultStyle from "./Receiver.module.scss";
import editStyle from "./ReceiverEdit.module.scss";
import { useTranslation } from "react-i18next";
import Button from "@shared/components/Button/Button";
import { TReceiverFormData } from "@core/types";
import { useSelector } from "react-redux";
import Spinner from "@shared/components/Spinner/Spinner";
import { RootState } from "@core/redux/store";
import useReceiverForm from "./hooks/useReceiverForm";
import useReceiverActions from "./hooks/useReceiverActions";
import Field from "./Field/Field";
export default function Receiver() {
  const { t } = useTranslation();
  const receivers = useSelector<RootState, TReceiverFormData | null>(
    (state) => state.receivers.formData
  );
  const styles = receivers ? editStyle : defaultStyle;
  const isEdit = !!receivers;

  const {
    data: formData,
    setData: setFormData,
    config: formConfig,
  } = useReceiverForm(receivers);

  const { isLoading, handleCancel, handleSave } = useReceiverActions(
    isEdit,
    formData
  );

  function handleChangeFieldValue(
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    key: keyof TReceiverFormData
  ) {
    setFormData((currFormData) => ({
      ...currFormData,
      [key]: e.target.value,
    }));
  }

  const dataConfig = Object.entries(formConfig.data);
  const pixConfig = Object.entries(formConfig.pix);

  return (
    <section className={styles.content}>
      {isEdit && (
        <div className={styles.header}>
          <h1>{receivers.name}</h1>
          {
            // receivers.
          }
        </div>
      )}
      <h1 className={styles.title}>{t("createReceiver.dataTitle")}</h1>
      <div className={`${styles.wrapper} ${styles.wrapper_data}`}>
        {dataConfig.map(([key, field]) => (
          <Field
            field={field}
            formData={formData}
            fieldKey={key as keyof TReceiverFormData}
            handleChangeFieldValue={handleChangeFieldValue}
          />
        ))}
      </div>
      <h1 className={styles.title}>{t("createReceiver.pixTitle")}</h1>
      <div className={`${styles.wrapper} ${styles.wrapper_pix}`}>
        {pixConfig.map(([key, field]) => (
          <Field
            field={field}
            formData={formData}
            fieldKey={key as keyof TReceiverFormData}
            handleChangeFieldValue={handleChangeFieldValue}
          />
        ))}
      </div>
      <div className={styles.actions_wrapper}>
        <Button
          className={styles.cancel}
          onClick={handleCancel}
          disabled={isLoading}
        >
          {t("createReceiver.actions.cancel")}
        </Button>
        <Button
          className={styles.save}
          onClick={handleSave}
          disabled={isLoading}
        >
          {isLoading ? (
            <Spinner size="20px" thickness="2px" color="var(--white)" />
          ) : (
            t("createReceiver.actions.save")
          )}
        </Button>
      </div>
    </section>
  );
}
