import type { Matrix } from "../types/matrix";
import { MatrixEditor } from "./MatrixEditor";

interface MatrixPairProps {
  matrixA: Matrix;
  matrixB: Matrix;

  onChangeA: (matrix: Matrix) => void;
  onChangeB: (matrix: Matrix) => void;
}

export const MatrixPair = ({
  matrixA,
  matrixB,
  onChangeA,
  onChangeB,
}: MatrixPairProps) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "50px",
        alignItems: "flex-start",
        marginTop: "30px",
      }}
    >
      <div>
        <h2>Матриця A</h2>

        <MatrixEditor
          matrix={matrixA}
          onChange={onChangeA}
        />
      </div>

      <div>
        <h2>Матриця B</h2>

        <MatrixEditor
          matrix={matrixB}
          onChange={onChangeB}
        />
      </div>
    </div>
  );
};