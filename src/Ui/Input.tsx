import { InputHTMLAttributes } from "react";
import "./Input.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string; // نضيف prop للـ label
}

const Input = ({ label, ...rest }: InputProps) => {
  return (
    <div className="input-wrapper">
      <input
        {...rest}
        className="focus:outline-none border-1 border-indigo-300 rounded-md p-2 focus:ring-2 ring-indigo-500 shadow-sm w-full"
      />
      {label && <label className="input-label">{label}</label>}
    </div>
  );
};

export default Input;
