import styled from "styled-components";
import Message from "../../types/Message";

const MessageBox = styled.div`
  width: 100%;

  
  &.received p{
    border-radius: 900px 999px 999px 0px;
    background: #FFF;
    box-shadow: 0px 2px 20px 0px rgba(0, 66, 185, 0.15);
    color: #0042B9;
  }

  &.sent{

    div{
      margin-left: auto;
      flex-direction: row-reverse;
    }

    p{
      border-radius: 999px 999px 0px 999px;
      background: #80B2FF;
      box-shadow: 0px 3px 20px 0px rgba(0, 66, 185, 0.15);
      color: #FFFFFF;
      margin-left: auto;
    }
  }
`;

const Content = styled.p`
  padding: 14px 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: fit-content;
  margin-top: 8px;
  margin-bottom: 12px;

  span{
    font-size: 15px;
    font-style: normal;
    font-weight: 800;
    line-height: 21px;
    letter-spacing: -0.45px;
  }
`;

const User = styled.div`
  display: flex;
  margin-bottom: 20px;

  img{
    width: 20px;
  }

  b{
    color: #0042B9;
    font-size: 13px;
    font-style: normal;
    font-weight: 700;
    line-height: 21px;
    letter-spacing: -0.26px;
    margin: 0 8px;
  }
`;

export default function MessageContainer({ msg, name }: {msg: Message, name: string}) {
  const {
    content, emoji, studentId,
  } = msg;
  return (
    <MessageBox className={studentId === name ? "sent" : "received"}>
      <Content>
        <span>{content}</span>
      </Content>
      <User>
        <img src={`${emoji}.svg`} alt="이모지" />
        <b>{`${studentId.slice(0, 6)}***`}</b>
      </User>
    </MessageBox>
  );
}
