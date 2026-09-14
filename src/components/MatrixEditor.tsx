import type { Matrix, MatrixValue } from "../types/matrix";

interface MatrixEditorProps {
  matrix: Matrix;
  onChange: (matrix: Matrix) => void;
}

export const MatrixEditor = ({
  matrix,
  onChange,
}: MatrixEditorProps) => {
  const toggleCell = (row: number, column: number) => {
    const newMatrix = matrix.map((currentRow, rowIndex) =>
      currentRow.map((value, columnIndex) => {
        if (rowIndex === row && columnIndex === column) {
          return (value === 0 ? 1 : 0) as MatrixValue;
        }

        return value;
      })
    );

    onChange(newMatrix);
  };

  return (
    <div>
      <table
        style={{
          borderCollapse: "collapse",
          marginTop: "20px",
        }}
      >
        <tbody>
          {matrix.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((value, columnIndex) => (
                <td
                  key={columnIndex}
                  style={{
                    border: "1px solid black",
                    padding: "0",
                  }}
                >
                  <button
                    type="button"
                    onClick={() =>
                      toggleCell(rowIndex, columnIndex)
                    }
                    style={{
                      width: "50px",
                      height: "50px",
                      border: "none",
                      background: value === 1 ? "#4caf50" : "#ffffff",
                      color: value === 1 ? "white" : "black",
                      fontSize: "20px",
                      cursor: "pointer",
                    }}
                  >
                    {value}
                  </button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};