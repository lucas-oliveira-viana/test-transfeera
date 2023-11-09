import React from "react";
import defaultStyle from "./Receiver.module.scss";
import editStyle from "./ReceiverEdit.module.scss";
import { useTranslation } from "react-i18next";
import Input from "@core/components/atoms/Input/Input";
import Button from "@core/components/atoms/Button/Button";
import { TReceiverFormData } from "@core/types";
import { useSelector } from "react-redux";
import Spinner from "@core/components/atoms/Spinner/Spinner";
import { RootState } from "@core/redux/store";
import useReceiverForm from "@core/hooks/useReceiverForm";
import useReceiverActions from "@core/hooks/useReceiverActions";

type Field = {
  label: string;
  hide?: boolean;
  disabled?: boolean;
  mask?: (value: string) => string;
  type?: string;
  options?: Array<{ label: string; value: string }>;
};

export default function Receiver() {
  const { t } = useTranslation();
  const receivers = useSelector<RootState, TReceiverFormData | null>(
    (state) => state.receivers.formData
  );
  const styles = receivers ? editStyle : defaultStyle;

  const {
    data: formData,
    setData: setFormData,
    config: formConfig,
  } = useReceiverForm(receivers);

  const { isLoading, handleCancel, handleSave } = useReceiverActions(
    !!receivers,
    formData
  );

  function renderField(field: Field, key: keyof TReceiverFormData) {
    return (
      <div key={field.label} className={styles.field}>
        {field.type === "select" ? (
          <>
            <label className={styles.label}>{field.label}</label>
            <select
              className={`${styles.input} ${styles.input_select}`}
              id={key}
              name={key}
              defaultValue={formData[key]}
              onChange={(e) => {
                setFormData((currFormData) => ({
                  ...currFormData,
                  [key]: e.target.value,
                }));
              }}
            >
              {field.options &&
                field.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
            </select>
          </>
        ) : (
          <>
            {!field.hide && (
              <>
                <label className={styles.label}>{field.label}</label>
                <Input
                  type="text"
                  id={key}
                  name={key}
                  mask={field.mask}
                  value={formData[key]}
                  onChange={(e) => {
                    setFormData((currFormData) => ({
                      ...currFormData,
                      [key]: e.target.value,
                    }));
                  }}
                />
              </>
            )}
          </>
        )}
      </div>
    );
  }

  const dataConfig = Object.entries(formConfig.data);
  const pixConfig = Object.entries(formConfig.pix);

  return (
    <section className={styles.content}>
      <h1 className={styles.title}>{t("createReceiver.dataTitle")}</h1>
      <div className={`${styles.wrapper} ${styles.wrapper_data}`}>
        {dataConfig.map(([key, field]) =>
          renderField(field, key as keyof TReceiverFormData)
        )}
      </div>
      <h1 className={styles.title}>{t("createReceiver.pixTitle")}</h1>
      <div className={`${styles.wrapper} ${styles.wrapper_pix}`}>
        {pixConfig.map(([key, field]) =>
          renderField(field, key as keyof TReceiverFormData)
        )}
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
