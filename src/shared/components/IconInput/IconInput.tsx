import React, { ReactNode } from "react";
import Input from "../Input/Input";
import styles from "./IconInput.module.scss";
import { Props as InputProps } from "../Input/Input";

type Props = InputProps & {
  icon: ReactNode;
};

export default function IconInput({ icon, ...props }: Props) {
  return (
    <div className={styles.wrapper}>
      <Input {...props} />
      {icon}
    </div>
  );
}
