import React, { useState } from "react";
import styles from "./Input.module.scss";

type ReactHTMLInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type CustomProps = {
  mask?: (value: string) => string;
};

type Props = ReactHTMLInputProps & CustomProps;

export default function Input({ mask, ...props }: Props) {
  const [value, setValue] = useState<string>("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    return mask ? mask(e.target.value) : e.target.value;
  }

  return (
    <input
      value={value}
      {...props}
      className={`${styles.base} ${props.className}`}
      onChange={(e) => {
        props.onChange && props.onChange(e);
        setValue(handleChange(e));
      }}
    />
  );
}
