interface IProps {
  msg: string;
}

const ErrorMsg = ({ msg }: IProps) => {
  return (
    <>{msg ? <span className="block font-semibold text-red-700 text-[12px]">{msg}</span> : null}</>
  );
};

export default ErrorMsg;
