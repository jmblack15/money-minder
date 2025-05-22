"use client";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "outline";
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
}) => {
  const baseStyle =
    "mt-4 h-10 w-full text-center mx-auto  text-white font-bold rounded-lg";
  const styles = {
    primary: `${baseStyle} bg-primary text-white hover:bg-blue-700`,
    secondary: `${baseStyle} bg-gray-600 text-white hover:bg-gray-700`,
    outline: `${baseStyle} border border-gray-400 text-gray-700 hover:bg-gray-100`,
  };

  return (
    <button type={type} className={styles[variant]} onClick={onClick}>
      {children}
    </button>
  );
};

export { Button };
