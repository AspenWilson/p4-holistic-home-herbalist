import React, { useState } from "react";

function Calculator() {
  const [selectedOperation, setSelectedOperation] = useState("+");
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [result, setResult] = useState(0);

  function handleNumClick(num) {
    if (selectedOperation === "=") {
      setNum1(num);
      setNum2(0);
      setResult(0);
      setSelectedOperation("+");
    } else if (selectedOperation === "C") {
      setNum1(0);
      setNum2(0);
      setResult(0);
    } else {
      if (num1 === 0) {
        setNum1(num);
      } else {
        setNum2(num);
      }
    }
  }

  function handleOperationClick(operation) {
    if (num1 === 0 && num2 === 0) {
      return;
    }

    if (selectedOperation === "C") {
      setNum1(0);
      setNum2(0);
      setResult(0);
    } else {
      setResult(eval(`${num1} ${selectedOperation} ${num2}`));
      setNum1(result);
      setNum2(0);
    }

    setSelectedOperation(operation);
  }

  return (
    <div className="calculator">
      <div className="calculator-display">
        <h2>{result}</h2>
      </div>
      <div className="calculator-inputs">
        <div className="calculator-input">
          <input
            type="number"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
          />
        </div>
        <div className="calculator-input">
          <select
            value={selectedOperation}
            onChange={(e) => setSelectedOperation(e.target.value)}
          >
            <option value="+">+</option>
            <option value="-">-</option>
            <option value="*">*</option>
            <option value="/">/</option>
            <option value="C">C</option>
            <option value="=">=</option>
          </select>
        </div>
        <div className="calculator-input">
          <input
            type="number"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
          />
        </div>
        <div className="calculator-input">
          <button onClick={() => handleOperationClick("C")}>C</button>
          <button onClick={() => handleOperationClick("+")}>+</button>
          <button onClick={() => handleOperationClick("-")}>-</button>
          <button onClick={() => handleOperationClick("*")}>*</button>
          <button onClick={() => handleOperationClick("/")}>/</button>
          <button onClick={() => handleOperationClick("=")}>=</button>
        </div>
      </div>
    </div>
  );
}

export default Calculator;