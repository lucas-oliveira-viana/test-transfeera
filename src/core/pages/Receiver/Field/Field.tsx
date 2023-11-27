import React from "react";
import { TReceiverFormData, TReceiverFormField } from "@core/types";
import styles from "./Field.module.scss";
import Input from "@shared/components/Input/Input";

type Props = {
  field: TReceiverFormField;
  fieldKey: keyof TReceiverFormData;
  formData: TReceiverFormData;
  handleChangeFieldValue: (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    key: keyof TReceiverFormData
  ) => void;
};

export default function Field({
  field,
  fieldKey,
  formData,
  handleChangeFieldValue,
}: Props) {
  return (
    <div key={field.label} className={styles.field}>
      {field.type === "select" ? (
        <>
          <label className={styles.label}>{field.label}</label>
          <select
            className={styles.input_select}
            id={fieldKey}
            name={fieldKey}
            defaultValue={formData[fieldKey]}
            onChange={(e) => handleChangeFieldValue(e, fieldKey)}
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
                id={fieldKey}
                name={fieldKey}
                mask={field.mask}
                value={formData[fieldKey]}
                onChange={(e) => handleChangeFieldValue(e, fieldKey)}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}
