import type { CalculatorItem } from "./types";

export const OPERATIONS = {
  ADD: "+",
  SUB: "-",
  DIVIDE: "÷",
  MUL: "x",
} as const;

export const calculatorItems: CalculatorItem[] = [
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
