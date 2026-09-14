import type { Matrix } from "../types/matrix";

const createMatrix = (
  size: number,
  defaultValue: 0 | 1 = 0
): Matrix => {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => defaultValue)
  );
};

export const matrixOr = (
  matrixA: Matrix,
  matrixB: Matrix
): Matrix => {
  return matrixA.map((row, i) =>
    row.map((value, j) =>
      value === 1 || matrixB[i][j] === 1 ? 1 : 0
    )
  );
};

export const matrixAnd = (
  matrixA: Matrix,
  matrixB: Matrix
): Matrix => {
  return matrixA.map((row, i) =>
    row.map((value, j) =>
      value === 1 && matrixB[i][j] === 1 ? 1 : 0
    )
  );
};

export const matrixXor = (
  matrixA: Matrix,
  matrixB: Matrix
): Matrix => {
  return matrixA.map((row, i) =>
    row.map((value, j) =>
      value !== matrixB[i][j] ? 1 : 0
    )
  );
};

export default createMatrix;