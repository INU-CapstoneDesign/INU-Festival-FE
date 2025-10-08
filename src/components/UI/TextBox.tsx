import React, { useRef } from "react";

import styled from "styled-components";

const Container = styled.div`
  input {
    width: 115%;
    align-self: stretch;
    height: 56px;
    flex-shrink: 0;
    border-radius: 12px;
    background: #f3f3f5;
    border: none;
    padding-left: 15px;
    font-size: 16px;
    transform: scale(0.87);
    margin-left: -7.5%;

    &::placeholder {
      color: #b9b9b9;
    }
    &:focus {
      background: #ebf2ff;
      outline: none;
    }
  }
`;

type TextBoxProps = {
  placeholder?: string;
  type?: "text" | "number" | "password"; // ← 계속해서 지원할 타입을 쭉 써주자.
  value: string;
  onChange: (value: string) => void;
};

export default function TextBox({
  placeholder = undefined,
  type = "text",
  value,
  onChange,
}: TextBoxProps) {
  const id = useRef(
    `textbox-${Math.random()
      .toString()
      .slice(2)}`,
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <Container>
      <input
        id={id.current}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </Container>
  );
}
