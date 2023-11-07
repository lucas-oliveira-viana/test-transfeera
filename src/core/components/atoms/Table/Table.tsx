import React from "react";

type Props = {
  data: Array<{ [key: string]: any }>;
};

export default function Table({ data }: Props) {
  if (data.length === 0) {
    return <div>Empty</div>;
  }

  const columnHeaders = Object.keys(data[0]);

  return (
    <table>
      <thead>
        <tr>
          {columnHeaders.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {columnHeaders.map((header) => (
              <td key={header}>{item[header]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
