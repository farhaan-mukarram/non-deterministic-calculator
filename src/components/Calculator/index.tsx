import { useState, type MouseEventHandler } from "react";
import Button from "./Button";
import type { ButtonType } from "./Button";

type CalculatorItem = { variant?: ButtonType; text: string };
type OperationKey = keyof typeof OPERATIONS;
type Operation = (typeof OPERATIONS)[OperationKey];

const OPERATIONS = {
  ADD: "+",
  SUB: "-",
  DIVIDE: "÷",
  MUL: "*",
} as const;

const calculatorItems: CalculatorItem[] = [
  { text: "AC", variant: "system" },
  { text: "⌫", variant: "system" },
  { text: "7" },
  { text: "8" },
  { text: "9" },
  { text: OPERATIONS.DIVIDE, variant: "operation" },
  { text: "4" },
  { text: "5" },
  { text: "6" },
  { text: OPERATIONS.MUL, variant: "operation" },
  { text: "1" },
  { text: "2" },
  { text: "3" },
  { text: OPERATIONS.SUB, variant: "operation" },
  { text: "0" },
  { text: ".", variant: "system" },
  { text: OPERATIONS.ADD, variant: "operation" },
  { text: "=", variant: "operation" },
];

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<Operation | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  // Calculate the actual result
  const calculateActualResult = (
    a: number,
    op: Operation,
    b: number,
  ): number => {
    switch (op) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "÷":
        return b !== 0 ? a / b : 0;
      default:
        return 0;
    }
  };

  // Generate a "slightly wrong" result with random noise
  const generateWrongNumber = (actualResult: number): number => {
    // eslint-disable-next-line react-hooks/purity
    const seed = Date.now();
    const random = Math.sin(seed) * 10000 - Math.floor(Math.sin(seed) * 10000);

    // Add noise to the actual result
    const noiseStrategies = [
      () => actualResult + (random - 0.5) * 2, // ±1 noise
      () => actualResult * (0.95 + random * 0.1), // ±5% multiplier
      () => actualResult + (random > 0.5 ? 0.7 : -0.3), // Odd decimals
      () => actualResult - random * 1.5, // Subtract some noise
      () => actualResult + Math.sin(seed) * 0.5, // Trigonometric noise
      () => actualResult * (1 + (random - 0.5) * 0.2), // ±10% multiplier
    ];

    const strategy = Math.floor(random * noiseStrategies.length);
    const noisyResult = noiseStrategies[strategy]();

    // Return with a random number of decimal places (1-8)
    const decimalPlaces = Math.floor(random * 8) + 1;
    return parseFloat(noisyResult.toFixed(decimalPlaces));
  };

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
    <div className="bg-gray-900 rounded-3xl p-6 w-96 shadow-2xl">
      {/* Display */}
      <div className="bg-black text-white text-right p-8 rounded-2xl mb-8 overflow-hidden">
        <div className="text-6xl font-light tracking-tight wrap-break-word">
          {display}
        </div>
      </div>

      {/* Button Grid */}
      <div className="grid grid-cols-4 gap-3">
        {calculatorItems.map(({ variant = "number", text }) => {
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
            <Button variant={variant} onClick={onClick}>
              {text}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default Calculator;
