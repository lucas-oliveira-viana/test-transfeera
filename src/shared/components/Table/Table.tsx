import { TTableConfig } from "@core/types";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type Props<T> = {
  config: TTableConfig<T>;
  data: Array<T> | null;
  onRowClick?: (data: T) => any;
  onCheck?: (data: T[]) => any;
  disabledRows?: T[];
};

export default function Table<T>({
  config,
  data,
  onRowClick,
  onCheck,
  disabledRows,
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
                    className={style.checkbox}
                    type="checkbox"
                    onChange={(e) => {
                      e.target.checked ? setChecked(data) : setChecked([]);
                    }}
                  />
                  <span className={style.text}>{column.label}</span>
                </div>
              ) : (
                <span className={style.text}>{column.label}</span>
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr
            aria-disabled={
              !!disabledRows.find((itemToDisable) => itemToDisable === item)
            }
            className={style.tr}
            key={index}
            onClick={(e) => {
              if ((e.target as HTMLElement).tagName === "INPUT") {
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
                        className={style.checkbox}
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
                      <span className={style.text}>{content}</span>
                    </div>
                  ) : (
                    <span className={style.text}>{content}</span>
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
