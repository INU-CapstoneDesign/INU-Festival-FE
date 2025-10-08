import styled from "styled-components";

type BoothInstructionProps = {
    description: string;
  };

const InstrucionContainer = styled.div`
        margin: 3rem;
        padding: 2rem;
        background-color: #EBF2FF;
        font-weight: 400;
        border-radius: 2rem;
        font-size: 14px;
        letter-spacing: 0.02rem;
        white-space: pre-line;
        line-height: 1.5;
        word-break: break-word;
    `;

export default function BoothInstruction({ description }: BoothInstructionProps) {
  return (
    <InstrucionContainer>
      {description}
    </InstrucionContainer>
  );
}
