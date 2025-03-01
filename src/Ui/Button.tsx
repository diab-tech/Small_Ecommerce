import { ButtonHTMLAttributes, ReactNode } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className: string;
  children: ReactNode;
}

const Button = ({ className, children, ...rest }: IProps) => {
  return (
    <>
      <button className={`${className}mb-9 text-amber-200 p-4`} {...rest}>
        {children}
      </button>
    </>
  );
};

export default Button;

// extends ButtonHTMLAttributes<HTMLButtonElement> && {...rest} ==> to use any html attributes inside button component without adding it as aprops like className
