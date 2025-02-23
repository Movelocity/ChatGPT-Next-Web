import { ChangeEvent } from "react";

interface PasswordInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function PasswordInput(props: PasswordInputProps) {
  return (
    <input type="password" value={props.value} onChange={props.onChange} />
  );
}
