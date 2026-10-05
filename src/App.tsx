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

type Operation = "or" | "and" | "xor";
type GraphSource = "a" | "b" | "result";

const generateMatrix = (size: number): Matrix => {
  const matrix = createMatrix(size);

  for (let i = 0; i < size; i++) {
    for (let j = i + 1; j < size; j++) {
      const value: 0 | 1 = Math.random() < 0.5 ? 0 : 1;

      matrix[i][j] = value;
      matrix[j][i] = value;
    }
  }

  return matrix;
};

function App() {
  const [size, setSize] = useState(4);

  const [matrixA, setMatrixA] = useState<Matrix>(
    createMatrix(4)
  );

  const [matrixB, setMatrixB] = useState<Matrix>(
    createMatrix(4)
  );

  const [resultMatrix, setResultMatrix] = useState<Matrix>(
    createMatrix(4)
  );

  const [graphMatrix, setGraphMatrix] = useState<Matrix>(
    createMatrix(4)
  );

  const [graphSource, setGraphSource] =
    useState<GraphSource>("a");

  const [operation, setOperation] =
    useState<Operation>("or");

  /*
   * Зміна розміру відношення.
   *
   * Оскільки працюємо тільки з квадратними матрицями,
   * кількість рядків і стовпців завжди однакова.
   */
  const changeSize = (newSize: number) => {
    setSize(newSize);

    const newMatrix = createMatrix(newSize);

    setMatrixA(newMatrix);
    setMatrixB(newMatrix);
    setResultMatrix(newMatrix);
    setGraphMatrix(newMatrix);
    setGraphSource("a");
  };

  /*
   * Виконання однієї з трьох операцій.
   */
  const calculateMatrix = () => {
    let result: Matrix;

    switch (operation) {
      case "or":
        result = matrixOr(matrixA, matrixB);
        break;

      case "and":
        result = matrixAnd(matrixA, matrixB);
        break;

      case "xor":
        result = matrixXor(matrixA, matrixB);
        break;
    }

    setResultMatrix(result);
  };

  /*
   * Генерація відношення A.
   *
   * Матриця буде:
   * - квадратною;
   * - симетричною;
   * - без діагональних одиниць.
   */
  const generateMatrixA = () => {
    const generated = generateMatrix(size);

    setMatrixA(generated);
  };

  /*
   * Генерація відношення B.
   */
  const generateMatrixB = () => {
    const generated = generateMatrix(size);

    setMatrixB(generated);
  };

  /*
   * Генерація обох відношень.
   */
  const generateBothMatrices = () => {
    const generatedA = generateMatrix(size);
    const generatedB = generateMatrix(size);

    setMatrixA(generatedA);
    setMatrixB(generatedB);

    setResultMatrix(createMatrix(size));
    setGraphMatrix(generatedA);
    setGraphSource("a");
  };

  /*
   * Побудова графа A.
   */
  const buildGraphA = () => {
    setGraphMatrix(matrixA);
    setGraphSource("a");
  };

  /*
   * Побудова графа B.
   */
  const buildGraphB = () => {
    setGraphMatrix(matrixB);
    setGraphSource("b");
  };

  /*
   * Побудова графа результату.
   */
  const buildGraphResult = () => {
    setGraphMatrix(resultMatrix);
    setGraphSource("result");
  };

  /*
   * Очищення всіх даних.
   */
  const clearAll = () => {
    const emptyMatrix = createMatrix(size);

    setMatrixA(emptyMatrix);
    setMatrixB(emptyMatrix);
    setResultMatrix(emptyMatrix);
    setGraphMatrix(emptyMatrix);
    setGraphSource("a");
  };

  /*
   * Перетворення поточної матриці у граф.
   */
  const graph = matrixToGraph(graphMatrix);

  /*
   * Назва операції.
   */
  const operationTitle =
    operation === "or"
      ? "A ∪ B — об'єднання"
      : operation === "and"
        ? "A ∩ B — перетин"
        : "A △ B — симетрична різниця";

  /*
   * Назва поточного графа.
   */
  const graphTitle =
    graphSource === "a"
      ? "Граф відношення A"
      : graphSource === "b"
        ? "Граф відношення B"
        : "Граф результату";

  return (
    <main className="app">

      {/* Заголовок */}
      <header className="app-header">
        <h1>Відношення та графи</h1>

        <p>
          Квадратна матриця як опис зв'язків
          між вершинами графа
        </p>
      </header>

      {/* Вибір розміру */}
      <section className="size-selector">

        <label htmlFor="matrix-size">
          Розмір відношення:
        </label>

        <select
          id="matrix-size"
          value={size}
          onChange={(event) =>
            changeSize(Number(event.target.value))
          }
        >
          <option value={3}>3 × 3</option>
          <option value={4}>4 × 4</option>
          <option value={5}>5 × 5</option>
          <option value={6}>6 × 6</option>
        </select>

      </section>

      <div className="app-layout">

        {/* ================================================= */}
        {/* ЛІВА ЧАСТИНА */}
        {/* ================================================= */}

        <section className="operations">

          {/* Матриці */}
          <section className="matrix-section">

            <h2>Матриці відношень</h2>

            <p>
              Матриці A та B описують зв'язки між
              вершинами графа. Діагональні зв'язки
              не використовуються.
            </p>

            <MatrixPair
              matrixA={matrixA}
              matrixB={matrixB}
              onChangeA={setMatrixA}
              onChangeB={setMatrixB}
            />

          </section>

          {/* Генератор */}
          <section className="generator-section">

            <h2>Генератор відношень</h2>

            <p>
              Створити випадкові квадратні
              симетричні матриці без петель.
            </p>

            <div className="button-group">

              <button
                type="button"
                onClick={generateMatrixA}
              >
                Згенерувати A
              </button>

              <button
                type="button"
                onClick={generateMatrixB}
              >
                Згенерувати B
              </button>

              <button
                type="button"
                onClick={generateBothMatrices}
              >
                Згенерувати A і B
              </button>

            </div>

          </section>

          {/* Графи матриць */}
          <section className="graph-controls">

            <h2>Представлення матриць графом</h2>

            <p>
              Матрицю можна безпосередньо
              перетворити на граф.
            </p>

            <div className="button-group">

              <button
                type="button"
                onClick={buildGraphA}
              >
                Показати граф A
              </button>

              <button
                type="button"
                onClick={buildGraphB}
              >
                Показати граф B
              </button>

            </div>

          </section>

          {/* Операції */}
          <section className="operation-panel">

            <h2>Операції над відношеннями</h2>

            <p>
              Виберіть одну з трьох операцій
              над матрицями A та B.
            </p>

            <select
              value={operation}
              onChange={(event) =>
                setOperation(
                  event.target.value as Operation
                )
              }
            >
              <option value="or">
                A ∪ B — об'єднання
              </option>

              <option value="and">
                A ∩ B — перетин
              </option>

              <option value="xor">
                A △ B — симетрична різниця
              </option>
            </select>

            <button
              type="button"
              onClick={calculateMatrix}
            >
              Виконати операцію
            </button>

          </section>

          {/* Результат */}
          <section className="result-section">

            <h2>Результат операції</h2>

            <MatrixResult
              matrix={resultMatrix}
              title={operationTitle}
            />

            <button
              type="button"
              onClick={buildGraphResult}
            >
              Показати граф результату
            </button>

          </section>

          {/* Очищення */}
          <section className="clear-section">

            <button
              type="button"
              onClick={clearAll}
            >
              Очистити все
            </button>

          </section>

        </section>

        {/* ================================================= */}
        {/* ПРАВА ЧАСТИНА — ГРАФ */}
        {/* ================================================= */}

        <section className="graph-section">

          <h2>{graphTitle}</h2>

          <p>
            Граф побудований на основі поточної
            матриці відношення.
          </p>

          <GraphView graph={graph} />

        </section>

      </div>

      {/* ================================================= */}
      {/* ПРИКЛАДИ */}
      {/* ================================================= */}

      <section className="examples-section">

        <h2>Приклади</h2>

        <div className="examples-grid">

          <article className="example-card">

            <h3>Приклад 1 — об'єднання</h3>

            <p>
              Об'єднання A ∪ B містить зв'язки,
              які належать хоча б одному з двох
              відношень.
            </p>

          </article>

          <article className="example-card">

            <h3>Приклад 2 — перетин</h3>

            <p>
              Перетин A ∩ B містить тільки ті
              зв'язки, які одночасно належать
              обом відношенням.
            </p>

          </article>

          <article className="example-card">

            <h3>Приклад 3 — симетрична різниця</h3>

            <p>
              A △ B містить зв'язки, які належать
              тільки одному з двох відношень.
            </p>

          </article>

        </div>

      </section>

    </main>
  );
}

export default App;