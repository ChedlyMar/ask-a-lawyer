import { FC, HTMLAttributes } from "react";
import "./Button.css";

interface Props extends HTMLAttributes<HTMLButtonElement> {}

const Button: FC = ({ children, ...props }: Props) => {
  return (
    <button className="button" {...props}>
      {children}
    </button>
  );
};

export default Button;
