import React from "react";
import defaultStyle from "./Receiver.module.scss";
import editStyle from "./ReceiverEdit.module.scss";
import { useTranslation } from "react-i18next";
import Button from "@shared/components/Button/Button";
import { TReceiverFormData, TReceiverToEdit } from "@core/types";
import { useSelector } from "react-redux";
import Spinner from "@shared/components/Spinner/Spinner";
import { RootState } from "@core/redux/store";
import useReceiverForm from "./hooks/useReceiverForm";
import useReceiverActions from "./hooks/useReceiverActions";
import Field from "./Field/Field";
import {
  ReceiverStatusTagDraft,
  ReceiverStatusTagValidated,
} from "@core/components/ReceiverStatusTags/ReceiverStatusTags";
import { dinamicallyIdentifyAndFormat as dinamicallyIdentifyAndFormatDocument } from "@core/helpers";
import Input from "@shared/components/Input/Input";
import { BANK_DICTIONARY } from "@core/constants";
import RemoveIcon from "@shared/assets/svg/trash.svg";

export default function Receiver() {
  const { t } = useTranslation();
  const receiver = useSelector<RootState, TReceiverToEdit | null>(
    (state) => state.receivers.receiverToEdit
  );
  const styles = receiver ? editStyle : defaultStyle;
  const isEdit = !!receiver;

  const {
    data: formData,
    config: formConfig,
    handleChangeFieldValue,
  } = useReceiverForm(receiver);

  const { isLoading, handleCancel, handleSave, handleEdit, handleRemove } =
    useReceiverActions(isEdit, formData);

  function renderEdit() {
    return (
      <>
        <div className={styles.header}>
          <h1 className={styles.header_text}>{receiver.name}</h1>
          <div>
            {receiver.status === "rascunho" ? (
              <ReceiverStatusTagDraft />
            ) : (
              <ReceiverStatusTagValidated />
            )}
          </div>
        </div>
        {receiver.status === "rascunho" ? renderForm() : renderValidated()}
      </>
    );
  }

  function renderValidated() {
    return (
      <>
        <div className={styles.validated}>
          <div className={styles.validated_row}>
            <div className={styles.validated_item}>
              <label className={styles.validated_label}>
                {t("validatedReceiver.taxId")}
              </label>
              <span className={styles.validated_value}>
                {dinamicallyIdentifyAndFormatDocument(receiver.taxId)}
              </span>
            </div>
          </div>
          <div className={styles.validated_row}>
            <div className={styles.validated_item}>
              <label className={styles.validated_label}>
                {t("validatedReceiver.bank")}
              </label>
              <span className={styles.validated_value}>
                {BANK_DICTIONARY[receiver.bankId].label}
              </span>
            </div>
            <div className={styles.validated_item}>
              <label className={styles.validated_label}>
                {t("validatedReceiver.branch")}
              </label>
              <span className={styles.validated_value}>{receiver.branch}</span>
            </div>
          </div>
          <div className={styles.validated_row}>
            <div className={styles.validated_item}>
              <label className={styles.validated_label}>
                {t("validatedReceiver.accountType")}
              </label>
              <span className={styles.validated_value}>
                {receiver.accountType}
              </span>
            </div>
            <div className={styles.validated_item}>
              <label className={styles.validated_label}>
                {receiver.accountType}
              </label>
              <span className={styles.validated_value}>{receiver.account}</span>
            </div>
          </div>
          <div className={styles.validated_row}>
            <div className={styles.validated_item}>
              <label className={styles.validated_label}>
                {t("validatedReceiver.email")}
              </label>
              <Input
                value={receiver.email}
                className={styles.validated_input}
              />
            </div>
          </div>
        </div>
        {renderActions()}
      </>
    );
  }

  function renderActions() {
    return (
      <div className={styles.actions_wrapper}>
        <Button
          className={styles.cancel}
          onClick={handleCancel}
          disabled={isLoading}
        >
          {isLoading ? (
            <Spinner size="20px" thickness="2px" color="var(--cyan-4)" />
          ) : (
            t("createReceiver.actions.cancel")
          )}
        </Button>
        <div className={styles.actions_wrapper_right}>
          {isEdit && (
            <Button
              disabled={isLoading}
              className={styles.remove}
              onClick={handleRemove}
            >
              {isLoading ? (
                <Spinner size="20px" thickness="2px" color="var(--white)" />
              ) : (
                <RemoveIcon width="16px" height="16px" />
              )}
            </Button>
          )}
          <Button
            className={styles.save}
            onClick={() => (isEdit ? handleEdit() : handleSave())}
            disabled={isLoading}
          >
            {isLoading ? (
              <Spinner size="20px" thickness="2px" color="var(--white)" />
            ) : (
              t("createReceiver.actions.save")
            )}
          </Button>
        </div>
      </div>
    );
  }

  function renderForm() {
    const dataConfig = Object.entries(formConfig.data);
    const pixConfig = Object.entries(formConfig.pix);

    return (
      <>
        <h1 className={styles.title}>{t("createReceiver.dataTitle")}</h1>
        <div className={`${styles.wrapper} ${styles.wrapper_data}`}>
          {dataConfig.map(([key, field]) => (
            <Field
              key={key}
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
              key={key}
              field={field}
              formData={formData}
              fieldKey={key as keyof TReceiverFormData}
              handleChangeFieldValue={handleChangeFieldValue}
            />
          ))}
        </div>
        {renderActions()}
      </>
    );
  }

  return (
    <section className={styles.content}>
      {isEdit ? renderEdit() : renderForm()}
    </section>
  );
}
