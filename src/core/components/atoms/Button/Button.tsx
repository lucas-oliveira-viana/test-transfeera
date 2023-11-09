import React, { ReactNode } from "react";
import styles from "./Button.module.scss";
type ReactHTMLButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type Props = ReactHTMLButtonProps & {
  children: ReactNode;
};

export default function Button({ children, ...props }: Props) {
  return (
    <button {...props} className={`${props.className} ${styles.base}`}>
      {children}
    </button>
  );
}
