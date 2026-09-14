import type { Matrix } from "../types/matrix";

interface MatrixResultProps {
  matrix: Matrix;
  title: string;
}

export const MatrixResult = ({
  matrix,
  title,
}: MatrixResultProps) => {
  return (
    <div>
      <h2>{title}</h2>

      <table
        style={{
          borderCollapse: "collapse",
        }}
      >
        <tbody>
          {matrix.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((value, columnIndex) => (
                <td
                  key={columnIndex}
                  style={{
                    width: "50px",
                    height: "50px",
                    textAlign: "center",
                    border: "1px solid black",
                    fontSize: "20px",
                  }}
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};