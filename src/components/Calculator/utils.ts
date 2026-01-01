import type { Operation } from "../components/Calculator/types";

// Calculate the actual result
export const calculateActualResult = (
  a: number,
  op: Operation,
  b: number,
): number => {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "x":
      return a * b;
    case "÷":
      return b !== 0 ? a / b : 0;
    default:
      return 0;
  }
};

// Generate a "slightly wrong" result with random noise
export const generateWrongNumber = (actualResult: number): number => {
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
