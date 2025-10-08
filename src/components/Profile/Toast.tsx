import { useEffect, SetStateAction, Dispatch } from "react";
import styled from "styled-components";

type ToastProps = {
    setToast: Dispatch<SetStateAction<boolean>>
    text: string;
}

const ToastBox = styled.div`
    width: calc(100% - 32px);
    max-width: 568px;
    position: fixed;
    bottom: calc(30px + 10vh);
    display: flex;
    background-color: #fafcff; opacity : 0.9;
    border-radius: 15px;
    padding: 10px;
    
    p{
      margin: 0 auto;
      color: #1d1d1d;
    }
`;

export default function Toast({ setToast, text }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setToast(false);
    }, 2500);
    return () => {
      clearTimeout(timer);
    };
  }, [setToast]);

  return (
    <ToastBox>
      <p>{text}</p>
    </ToastBox>
  );
}
