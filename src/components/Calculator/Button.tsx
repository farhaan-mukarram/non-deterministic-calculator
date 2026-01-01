import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export type ButtonType = keyof typeof variantToClassesMap;

interface ButtonProps extends DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> {
  variant?: ButtonType;
}

const variantToClassesMap = {
  number:
    "bg-gray-800 hover:bg-gray-700 active:bg-gray-600 text-white font-semibold py-4 px-6 rounded-full text-2xl transition duration-75",
  operation:
    "bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-semibold py-4 px-6 rounded-full text-2xl transition duration-75",
  system:
    "bg-gray-700 hover:bg-gray-600 active:bg-gray-500 text-white font-semibold py-4 px-6 rounded-full text-xl transition duration-75",
} as const;

const Button = ({
  onClick,
  variant = "number",
  className,
  children,
  ...props
}: ButtonProps) => {
  // TODO: Handle class merging
  const buttonClasses = `${variantToClassesMap[variant]} ${className}`;

  return (
    <button onClick={onClick} className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
