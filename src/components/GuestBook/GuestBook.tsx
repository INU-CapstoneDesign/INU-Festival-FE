import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import styled from "styled-components";
import { io } from "socket.io-client";

import Header from "../Notice/Header";
import MessageContainer from "./MessageContainer";

import Message from "../../types/Message";

import useFetchSentence from "../../hooks/useFetchSentence";
import useUserStore from "../../hooks/useUserStore";

const Container = styled.div`
  padding-inline: ${(props) => props.theme.sizes.contentPadding};
  background-color: #f4f6f9;
  min-height: 85vh;
  margin-top: 52px;
  display: block;
`;

const Button = styled.button`
  width: 106px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 24px;
  background: #0047c9;
  box-shadow: 0px 3px 20px 0px rgba(0, 71, 201, 0.15);
  border: none;
  color: #fff;
  font-size: 13px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  letter-spacing: -0.26px;
  position: fixed;
  bottom: calc(8rem + 32px);
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  cursor: pointer;
`;

const BottomBanner = styled.div`
  padding-inline: ${(props) => props.theme.sizes.contentPadding};
  z-index: 400;
  position: fixed;
  bottom: 0;
  height: 90px;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  width: 100%;
  max-width: 600px;
  border-radius: 20px 20px 0px 0px;

  button {
    border: none;
    background: none;
    padding: 0;
    padding-left: 10px;

    &:focus {
      outline: none;
    }
  }

  span {
    padding: 0 10px;
  }
`;

const TextBox = styled.div<{ $isMaximum: boolean }>`
  width: 100%;
  border-bottom: 2px solid ${(props) => (props.$isMaximum ? "#F00" : "#0047C9")};
  padding-bottom: 5px;

  span {
    float: right;
    font-size: 11px;
    font-weight: 600;
    line-height: 21px;
    letter-spacing: -0.33px;
  }

  input {
    border: none;
    color: #0042b9;
    font-family: SUIT, sans-serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 800;
    line-height: 21px;
    letter-spacing: -0.6px;
    width: calc(100% - 50px);

    &:focus {
      outline: none;
    }
  }
`;

const SubmitButton = styled.button`
  cursor: pointer;
`;

const ServerURL = import.meta.env.VITE_API_URL;
const MAX_LENGTH = 16;

export default function GuestBook() {
  const [accessToken] = useState(localStorage.getItem("accessToken") || "");
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [inputBanner, setInputBanner] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const inputRef = useRef<HTMLInputElement>(null);
  const chatWindow = useRef<HTMLDivElement>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);

  const [, store] = useUserStore();
  const { data } = useFetchSentence();

  store.fetchCurrentUser();

  const socket = io(ServerURL);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList, data]);

  useEffect(() => {
    const handleNewMessage = (receivedData: Message) => {
      setMessageList((prevMessages) => [...prevMessages, receivedData]);
    };

    socket.on("update", handleNewMessage);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value.length === 17) {
      return;
    }

    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    const contents = inputValue;
    if (contents === "") return;

    const emojiArray = ["happy", "thrilling", "funny", "excited"];
    const randomIndex = Math.floor(Math.random() * emojiArray.length);
    const emoji = emojiArray[randomIndex];

    const dataToSend: Message = {
      studentId: store.name,
      content: contents,
      emoji,
    };

    fetch(`${import.meta.env.VITE_API_URL}/sentence`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => response.json())
      .then(() => {
        socket.emit("message", dataToSend);
      })
      .catch((error) => {
        // 에러 처리 (필요시 사용자에게 알림)
      });

    setInputValue("");
  };

  const handleWriteButton = () => {
    const userAccessToken = JSON.parse(accessToken);
    if (userAccessToken === "") {
      alert("로그인 후에 메시지를 보낼 수 있습니다.");
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    setInputBanner(true);
    inputRef.current?.focus();
  };

  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSendMessage();
  };

  const handleBottomBanner = () => {
    if (inputBanner) {
      setInputBanner(false);
    }
  };

  return (
    <>
      <Header shadow="false">실시간 채팅</Header>
      <Container ref={chatWindow} onClick={() => handleBottomBanner()}>
        {data?.shouts.map((message) => (
          <MessageContainer msg={message} name={store.name} key={message.id} />
        ))}
        {messageList.map((message, index) => (
          <MessageContainer msg={message} name={store.name} key={index} />
        ))}
        <div ref={messageEndRef} />
        {!inputBanner && (
          <Button onClick={handleWriteButton}>한 줄 외치기</Button>
        )}
      </Container>
      {inputBanner && (
        <BottomBanner>
          <TextBox $isMaximum={inputValue.length >= MAX_LENGTH}>
            <input
              type="text"
              value={inputValue}
              maxLength={MAX_LENGTH}
              onChange={handleInputChange}
              ref={inputRef}
              onKeyUp={(e) => handleEnter(e)}
              spellCheck="false"
            />
            <span>
              {inputValue.length}/{MAX_LENGTH}
            </span>
          </TextBox>
          <SubmitButton
            type="submit"
            onClick={handleSendMessage}
            aria-label="한줄외치기버튼"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
            >
              <circle cx="18" cy="18" r="18" fill="#0047C9" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.7247 9.72766C18.3458 9.32581 17.7316 9.32581 17.3527 9.72766L10.686 16.7992C10.3071 17.2011 10.3071 17.8526 10.686 18.2545C11.0648 18.6563 11.6791 18.6563 12.0579 18.2545L18.0387 11.9105L24.0195 18.2545C24.3983 18.6563 25.0126 18.6563 25.3914 18.2545C25.7703 17.8526 25.7703 17.2011 25.3914 16.7992L18.7247 9.72766Z"
                fill="white"
              />
              <path
                d="M17.0521 27.041C17.0521 27.5933 17.4998 28.041 18.0521 28.041C18.6044 28.041 19.0521 27.5933 19.0521 27.041L17.0521 27.041ZM17.0521 11.041L17.0521 27.041L19.0521 27.041L19.0521 11.041L17.0521 11.041Z"
                fill="white"
              />
            </svg>
          </SubmitButton>
        </BottomBanner>
      )}
    </>
  );
}
