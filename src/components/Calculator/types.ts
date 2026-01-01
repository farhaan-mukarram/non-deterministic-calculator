import type { ButtonType } from "./Button";
import type { OPERATIONS } from "./constants";

type OperationKey = keyof typeof OPERATIONS;

export type CalculatorItem = { variant?: ButtonType; text: string };
export type Operation = (typeof OPERATIONS)[OperationKey];
