import { ButtonHTMLAttributes } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  btnName: string;
  value: string;
}

const Button = ({ value, btnName, ...rest }: IProps) => {
  return (
    <>
      <button value={value} {...rest}>
        {btnName}
      </button>
    </>
  );
};

export default Button;

// extends ButtonHTMLAttributes<HTMLButtonElement> && {...rest} ==> to use any html attributes inside button component without adding it as aprops like className
