import { useState } from "react";

import "./App.css";

import { MatrixPair } from "./components/MatrixPair";
import { MatrixResult } from "./components/MatrixResult";
import { GraphView } from "./components/GraphView";

import createMatrix, {
  matrixAnd,
  matrixOr,
  matrixXor,
} from "./logic/matrixOperations";

import matrixToGraph from "./logic/matrixToGraph";

import type { Matrix } from "./types/matrix";

function App() {
  const [size, setSize] = useState(4);

  const [matrixA, setMatrixA] = useState<Matrix>(createMatrix(4));

  const [matrixB, setMatrixB] = useState<Matrix>(createMatrix(4));

  const [resultMatrix, setResultMatrix] = useState<Matrix>(createMatrix(4));

  // Матриця, з якої зараз будується граф
  const [graphMatrix, setGraphMatrix] = useState<Matrix>(createMatrix(4));

  // Назва поточного графа
  const [graphSource, setGraphSource] = useState<"a" | "b" | "result">("a");

  const [operation, setOperation] = useState<"or" | "and" | "xor">("or");

  // Зміна розміру матриць
  const changeSize = (newSize: number) => {
    setSize(newSize);

    const newMatrix = createMatrix(newSize);

    setMatrixA(newMatrix);
    setMatrixB(newMatrix);
    setResultMatrix(newMatrix);
    setGraphMatrix(newMatrix);
  };

  // Виконання операції
  const calculateMatrix = () => {
    let result: Matrix;

    if (operation === "or") {
      result = matrixOr(matrixA, matrixB);
    } else if (operation === "and") {
      result = matrixAnd(matrixA, matrixB);
    } else {
      result = matrixXor(matrixA, matrixB);
    }

    setResultMatrix(result);
  };

  // Побудувати граф із матриці A
  const buildGraphA = () => {
    setGraphMatrix(matrixA);
    setGraphSource("a");
  };

  // Побудувати граф із матриці B
  const buildGraphB = () => {
    setGraphMatrix(matrixB);
    setGraphSource("b");
  };

  // Побудувати граф із результату операції
  const buildGraphResult = () => {
    setGraphMatrix(resultMatrix);
    setGraphSource("result");
  };
  const clearMatrixA = () => {
    setMatrixA(createMatrix(size));
  };

  const clearMatrixB = () => {
    setMatrixB(createMatrix(size));
  };

  const clearResult = () => {
    setResultMatrix(createMatrix(size));
  };

  const clearAll = () => {
    const emptyMatrix = createMatrix(size);

    setMatrixA(emptyMatrix);
    setMatrixB(emptyMatrix);
    setResultMatrix(emptyMatrix);
    setGraphMatrix(emptyMatrix);
  };
  const graph = matrixToGraph(graphMatrix);

  return (
    <main className="app">
      <h1>Matrix → Graph</h1>

      {/* Вибір розміру */}
      <div className="size-selector">
        <label>
          Розмір матриці:{" "}
          <select
            value={size}
            onChange={(event) => changeSize(Number(event.target.value))}
          >
            <option value={3}>3 × 3</option>
            <option value={4}>4 × 4</option>
            <option value={5}>5 × 5</option>
            <option value={6}>6 × 6</option>
          </select>
        </label>
      </div>

      <div className="app-layout">
        {/* ЛІВА ЧАСТИНА */}
        <section className="operations">
          <h2>Матриці</h2>

          {/* Матриці A і B */}
          <MatrixPair
            matrixA={matrixA}
            matrixB={matrixB}
            onChangeA={setMatrixA}
            onChangeB={setMatrixB}
          />

          <div className="clear-controls">
            <button type="button" onClick={clearMatrixA}>
              Очистити A
            </button>

            <button type="button" onClick={clearMatrixB}>
              Очистити B
            </button>

            <button type="button" onClick={clearResult}>
              Очистити результат
            </button>

            <button type="button" onClick={clearAll}>
              Очистити все
            </button>
          </div>
          {/* ===================== */}
          {/* ПОБУДОВА ГРАФА */}
          {/* ===================== */}

          <div className="graph-controls">
            <h2>Створити граф</h2>

            <p>Можна побудувати граф без виконання будь-яких операцій.</p>

            <div className="button-group">
              <button type="button" onClick={buildGraphA}>
                Побудувати граф A
              </button>

              <button type="button" onClick={buildGraphB}>
                Побудувати граф B
              </button>
            </div>
          </div>

          {/* ===================== */}
          {/* ОПЕРАЦІЇ */}
          {/* ===================== */}

          <div className="operation-panel">
            <h2>Операції з матрицями</h2>

            <select
              value={operation}
              onChange={(event) =>
                setOperation(event.target.value as "or" | "and" | "xor")
              }
              style={{ height: "50px" }}
            >
              <option value="or">A ∨ B — диз'юнкція</option>

              <option value="and">A ∧ B — кон'юнкція</option>

              <option value="xor">A ⊕ B — XOR</option>
            </select>

            <button type="button" onClick={calculateMatrix}>
              Виконати операцію
            </button>
          </div>

          {/* Результат */}
          <div className="result-section">
            <MatrixResult
              matrix={resultMatrix}
              title={
                operation === "or"
                  ? "Результат: A ∨ B"
                  : operation === "and"
                    ? "Результат: A ∧ B"
                    : "Результат: A ⊕ B"
              }
            />

            <button type="button" onClick={buildGraphResult}>
              Побудувати граф результату
            </button>
          </div>
        </section>

        {/* ===================== */}
        {/* ПРАВА ЧАСТИНА — ГРАФ */}
        {/* ===================== */}

        <section className="graph-section">
          <h2>
            {graphSource === "a"
              ? "Граф матриці A"
              : graphSource === "b"
                ? "Граф матриці B"
                : "Граф результату"}
          </h2>

          <GraphView graph={graph} />
        </section>
      </div>
    </main>
  );
}

export default App;
