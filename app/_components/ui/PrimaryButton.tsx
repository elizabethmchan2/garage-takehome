type ButtonProps = {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

const PrimaryButton = ({
  type = "button",
  disabled,
  children,
  onClick,
  className,
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${className} whitespace-nowrap touch-manipulation flex items-center justify-center select-none disabled:opacity-50 disabled:pointer-events-none text-white bg-orange-500 border-orange-500 hover:bg-orange-600 hover:border-orange-600 cursor-pointer h-10 px-4 font-medium text-base/normal rounded-lg w-full`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
