import { useState, type MouseEventHandler } from "react";
import Button from "./Button";
import type { Operation } from "./types";
import { calculateActualResult, generateWrongNumber } from "./utils";
import { calculatorItems, OPERATIONS } from "./constants";

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<Operation | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const handleNumberClick = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const handleDecimal = () => {
    if (waitingForNewValue) {
      setDisplay("0.");
      setWaitingForNewValue(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handleOperation = (op: Operation) => {
    const currentValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(currentValue);
    } else if (operation) {
      // Calculate and show slightly wrong result
      const actualResult = calculateActualResult(
        previousValue,
        operation,
        currentValue,
      );
      const wrongResult = generateWrongNumber(actualResult);

      setDisplay(wrongResult.toString());
      setPreviousValue(wrongResult);
    }

    setOperation(op);
    setWaitingForNewValue(true);
  };

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const currentValue = parseFloat(display);
      const actualResult = calculateActualResult(
        previousValue,
        operation,
        currentValue,
      );
      const wrongResult = generateWrongNumber(actualResult);

      setDisplay(wrongResult.toString());
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay("0");
    }
  };

  return (
    <div className="bg-gray-900 rounded-3xl p-6 w-full max-w-96 min-[120rem]:max-w-md shadow-2xl">
      {/* Display */}
      <div className="bg-black text-white text-right p-8 rounded-2xl mb-8 overflow-x-auto">
        <div className="text-6xl font-light tracking-tight">{display}</div>
      </div>

      {/* Button Grid */}
      <div className="grid grid-cols-4 gap-3">
        {calculatorItems.map(({ variant = "number", text, className }) => {
          const isDecimal = text === ".";
          const isClear = variant === "system" && text === "AC";
          const isDigit = variant === "number" && !isDecimal;
          const isBackspace = variant === "system" && !isDecimal && !isClear;
          const isOperation = Object.values(OPERATIONS).includes(
            text as Operation,
          );

          let onClick: MouseEventHandler | undefined;

          if (isDecimal) onClick = () => handleDecimal();
          else if (isClear) onClick = () => handleClear();
          else if (isBackspace) onClick = () => handleBackspace();
          else if (isDigit) onClick = () => handleNumberClick(text);
          else if (isOperation)
            onClick = () => handleOperation(text as Operation);
          else if (text === "=") onClick = () => handleEquals();

          return (
            <Button
              key={text}
              variant={variant}
              onClick={onClick}
              className={className}
            >
              {text}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default Calculator;
