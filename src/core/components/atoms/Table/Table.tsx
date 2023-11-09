import { TTableConfig } from "@core/types";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type Props<T> = {
  config: TTableConfig<T>;
  data: Array<T> | null;
  onRowClick?: (data: T) => any;
  onCheck?: (data: T[]) => any;
};

export default function Table<T>({
  config,
  data,
  onRowClick,
  onCheck,
}: Props<T>) {
  const { t } = useTranslation();

  const [checked, setChecked] = useState<T[]>([]);

  useEffect(() => {
    onCheck(checked);
  }, [checked]);

  if (data.length === 0) {
    return <span>{t("table.empty")}</span>;
  }

  const { style } = config;

  return (
    <table className={style.table}>
      <thead>
        <tr>
          {config.columns.map((column, index) => (
            <th className={style.th} key={column.key.toString()}>
              {onCheck && index === 0 ? (
                <div className={style.check_wrapper}>
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      e.target.checked ? setChecked(data) : setChecked([]);
                    }}
                  />
                  <label>{column.label}</label>
                </div>
              ) : (
                column.label
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr
            className={style.tr}
            key={index}
            onClick={(e) => {
              if (e.target !== e.currentTarget) {
                return;
              }

              onRowClick(item);
            }}
          >
            {config.columns.map((column, colIndex) => {
              const content = column.render
                ? column.render(item)
                : (item[column.key] as string);

              return (
                <td className={style.td} key={`${column.key.toString()}-row`}>
                  {onCheck && colIndex === 0 ? (
                    <div className={style.check_wrapper}>
                      <input
                        type="checkbox"
                        checked={checked.some(
                          (checkedItem) => checkedItem === item
                        )}
                        onChange={(e) => {
                          e.target.checked
                            ? setChecked((currChecked) => [
                                ...currChecked,
                                item,
                              ])
                            : setChecked((currChecked) =>
                                currChecked.filter(
                                  (currItem) => currItem !== item
                                )
                              );
                        }}
                      />
                      <div>{content}</div>
                    </div>
                  ) : (
                    content
                  )}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
