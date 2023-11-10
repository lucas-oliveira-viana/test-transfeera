import React, { useEffect, useState } from "react";
import styles from "./Input.module.scss";

type ReactHTMLInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type CustomProps = {
  mask?: (value: string) => string;
  innerRef?: React.LegacyRef<HTMLInputElement>;
};

export type Props = ReactHTMLInputProps & CustomProps;

export default function Input({ mask, innerRef, ...props }: Props) {
  const [value, setValue] = useState<string>("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    return mask ? mask(e.target.value) : e.target.value;
  }

  useEffect(() => {
    const value: string = mask
      ? mask(props.value as string)
      : (props.value as string);
    setValue(value);
  }, [props.value]);

  return (
    <input
      {...props}
      value={value}
      className={`${styles.base} ${props.className}`}
      onChange={(e) => {
        props.onChange && props.onChange(e);
        setValue(handleChange(e));
      }}
      ref={innerRef}
    />
  );
}
