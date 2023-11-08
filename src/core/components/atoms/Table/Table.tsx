import { TTableConfig } from "@core/types";
import React from "react";

type Props<T> = {
  config: TTableConfig<T>;
  data: Array<T>;
};

export default function Table<T>({ config, data }: Props<T>) {
  if (data.length === 0) {
    return <div>Empty</div>;
  }

  const { style } = config;

  return (
    <table className={style.table}>
      <thead>
        <tr>
          {config.columns.map((column) => (
            <th className={style.th} key={column.key.toString()}>
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr className={style.tr} key={index}>
            {config.columns.map((column) => (
              <td className={style.td} key={`${column.key.toString()}-row`}>
                {column.render
                  ? column.render(item)
                  : (item[column.key] as string)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
