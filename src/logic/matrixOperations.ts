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

export const martrixUnion = (matrixA: Matrix, matrixB: Matrix): Matrix => {
  return matrixA.map((row, i) =>
    row.map((value, j) =>
      value === 1 || matrixB[i][j] === 1 ? 1 : 0
    )
  );
};

export const matrixIntersection = (matrixA: Matrix, matrixB: Matrix): Matrix => {
  return matrixA.map((row, i) =>
    row.map((value, j) =>
      value === 1 && matrixB[i][j] === 1 ? 1 : 0
    )
  );
};

export const matrixStraightSum = (matrix: Matrix): Matrix => {
  const result: Matrix = [];
  for (let i = 0; i < matrix.length; i++) {
    const rowSum: number[] = [];
    for (let j = 0; j < matrix[i].length; j++) {
      rowSum.push(matrix[i][j]);
    }
    result.push(rowSum);
  }
  return result;
};

export default createMatrix;