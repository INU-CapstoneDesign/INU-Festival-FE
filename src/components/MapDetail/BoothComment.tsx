import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import useFetchBoothComment from "../../hooks/useFetchBoothComment";
import SendComment from "../../types/SendComment";
import BoothComment from "../../types/BoothComment";
import useUserStore from "../../hooks/useUserStore";

const CommentTop = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 1rem;

  img {
    margin-right: 10px;
    width: 20px;
  }
  div {
    margin-left: 10px;
  }
`;
const CommentBox = styled.div`
  padding: 3rem;

  p {
    padding-left: 30px;
    font-weight: 400;
  }

  h3 {
    font-weight: 700;
    color: #969fa9;
    font-size: 1.4rem;
  }

  div {
    color: #bbc7d3;
    font-size: 1.4rem;
  }
`;
const NoCommentBox = styled.div`
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #686b68;
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
    font-size: 16px;
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
const TextWrapper = styled.div`
  padding-inline: ${(props) => props.theme.sizes.contentPadding};
  z-index: 300;
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
    outline: none;
  }
`;

const MAX_LENGTH = 50;
const emojis = ["happy", "funny", "thrilling", "excited"];

function CommentInput({ inputValue, handleInputChange, handleSendComment }) {
  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSendComment();
  };
  return (
    <TextWrapper>
      <TextBox $isMaximum={inputValue.length >= MAX_LENGTH}>
        <input
          type="text"
          value={inputValue}
          maxLength={MAX_LENGTH}
          onChange={handleInputChange}
          onKeyUp={(e) => handleEnter(e)}
        />
        <span>
          {inputValue.length}/{MAX_LENGTH}
        </span>
      </TextBox>
      <button
        type="submit"
        onClick={handleSendComment}
        aria-label="부스댓글버튼"
        style={{ cursor: "pointer" }}
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
      </button>
    </TextWrapper>
  );
}

const BoothCommentList = ({ boothComments }) =>
  boothComments.map((boothCommentDetail, index) => {
    const { userId, content, createdAt, emoji } = boothCommentDetail;
    const createdAtDate = new Date(createdAt);

    const formattedDateTime = createdAtDate.toLocaleString(undefined, {
      dateStyle: "short",
      timeStyle: "short",
    });

    return (
      <CommentBox key={index}>
        <CommentTop>
          <img src={`/${emoji}.svg`} alt={`${emoji}`} />
          <h3>{userId}</h3>
          <div>{formattedDateTime}</div>
        </CommentTop>
        <p>{content}</p>
      </CommentBox>
    );
  });

export default function BoothCommentComponent({
  boothId,
  setCommentCount,
}: {
  boothId: string;
  setCommentCount: (value: number) => void;
}) {
  const [inputValue, setInputValue] = useState("");
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const location = useLocation();
  const boothComments: BoothComment[] = useFetchBoothComment(boothId);
  const [newBoothComment, setNewBoothComment] = useState<SendComment[]>([]);
  const [, store] = useUserStore();

  useEffect(() => {
    store.fetchCurrentUser();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (accessToken === '""') {
      alert("로그인 후에 메시지를 보낼 수 있습니다.");
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    if (e.target.value.length > MAX_LENGTH) {
      e.target.value = e.target.value.slice(0, MAX_LENGTH);
    }
    setInputValue(e.target.value);
  };

  const handleSendComment = () => {
    const contents = inputValue.trim();
    if (!contents) return;

    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    const dataToSend: SendComment = {
      content: contents,
      emoji: randomEmoji,
    };

    setCommentCount((prev: number) => prev + 1);

    fetch(`${import.meta.env.VITE_API_URL}/booth/comment/${boothId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to send comment");
        }
        return response.json();
      })
      .then(() => {
        setInputValue("");
        setNewBoothComment([...newBoothComment, dataToSend]);
      })
      .catch((error) => {
        // 에러 처리 (필요시 사용자에게 알림)
      });
  };

  if (boothComments.length === 0) {
    if (newBoothComment.length === 0) {
      return (
        <>
          <NoCommentBox>
            실시간 부스에 대한 정보와 여러분의 감상을 남겨주세요 !
          </NoCommentBox>
          <CommentInput
            inputValue={inputValue}
            handleInputChange={handleInputChange}
            handleSendComment={handleSendComment}
          />
        </>
      );
    }
  }

  return (
    <>
      <BoothCommentList boothComments={boothComments} />
      {newBoothComment.map((boothCommentDetail, index) => {
        const { content, emoji } = boothCommentDetail;
        const nameLength = store.name.length;
        const name =
          store.name.substring(0, nameLength - 3) +
          store.name.substring(nameLength - 3).replace(/./g, "*");
        return (
          <CommentBox key={index}>
            <CommentTop>
              <img src={`/${emoji}.svg`} alt={`${emoji}`} />
              <h3>{name}</h3>
              <div>방금전</div>
            </CommentTop>
            <p>{content}</p>
          </CommentBox>
        );
      })}
      <CommentInput
        inputValue={inputValue}
        handleInputChange={handleInputChange}
        handleSendComment={handleSendComment}
      />
    </>
  );
}
