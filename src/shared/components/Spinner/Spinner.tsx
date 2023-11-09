import React from "react";
import styles from "./Spinner.module.scss";

type Props = {
  size: string;
  color?: string;
  thickness?: string;
};

export default function Spinner({ size, color, thickness }: Props) {
  return (
    <div
      className={styles.spinner}
      style={{
        width: size,
        height: size,
        borderTopColor: color,
        borderTopWidth: thickness,
        borderWidth: thickness,
      }}
    ></div>
  );
}
