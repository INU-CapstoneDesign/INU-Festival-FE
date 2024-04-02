import { styled } from 'styled-components';

import { useState } from 'react';
import { useNavigate } from 'react-router';

import SendComment from '../../types/SendComment';
import useFetchBoothCommentSend from '../../hooks/useFetchBoothCommentSend';

const TextBox = styled.div<{ $isMaximum: boolean }>`
  width: 100%;
  border-bottom: 2px solid ${(props) => (props.$isMaximum ? '#F00' : '#0047C9')};
  padding-bottom: 5px;

  span{
    float: right;
    font-size: 11px;
    font-weight: 600;
    line-height: 21px;
    letter-spacing: -0.33px;
  }
  
  input{
    border: none;
    color: #0042B9;
    font-family: SUIT, sans-serif;
    font-size: 15px;
    font-style: normal;
    font-weight: 800;
    line-height: 21px;
    letter-spacing: -0.6px;
    width: calc(100% - 50px);

    &:focus{
      outline: none;
    }
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
  background-color: #FFFFFF;
  width: 100%;
  max-width: 600px;
  border-radius: 20px 20px 0px 0px;

  button{
    border: none;
    background: none;
    padding: 0;
    padding-left: 10px;
    outline: none;
    }
`;

const MAX_LENGTH = 50;
const emojis = ['happy', 'funny', 'trilling', 'excited'];

export default function CommentSend({ boothId }: string) {
  const [inputValue, setInputValue] = useState('');
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendComment = () => {
    const contents = inputValue;
    if (contents === '') return;
    if (accessToken === '""') {
      alert('로그인 후에 메시지를 보낼 수 있습니다.');
      navigate('/login');
      return;
    }
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    const dataToSend: SendComment = {
      content: contents,
      emoji: randomEmoji,
      boothId,
    };
    console.log(dataToSend);
    fetch(`${process.env.REACT_APP_URL}/booth/comment/${boothId}`, {
      method: 'POST',
      body: JSON.stringify(dataToSend),
    })
      .then((response) => response.json())
      .catch((error) => console.error('Error:', error));
    setInputValue('');
    // useFetchBoothCommentSend(BoothId);
  };
  return (
    <TextWrapper>
      <TextBox $isMaximum={inputValue.length >= MAX_LENGTH}>
        <input
          type="text"
          value={inputValue}
          maxLength={MAX_LENGTH}
          onChange={handleInputChange}
        />
        <span>
          {inputValue.length}
          /
          {MAX_LENGTH}
        </span>
      </TextBox>
      <button type="submit" onClick={handleSendComment} aria-label="한줄외치기버튼">
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="18" r="18" fill="#0047C9" />
          <path fillRule="evenodd" clipRule="evenodd" d="M18.7247 9.72766C18.3458 9.32581 17.7316 9.32581 17.3527 9.72766L10.686 16.7992C10.3071 17.2011 10.3071 17.8526 10.686 18.2545C11.0648 18.6563 11.6791 18.6563 12.0579 18.2545L18.0387 11.9105L24.0195 18.2545C24.3983 18.6563 25.0126 18.6563 25.3914 18.2545C25.7703 17.8526 25.7703 17.2011 25.3914 16.7992L18.7247 9.72766Z" fill="white" />
          <path d="M17.0521 27.041C17.0521 27.5933 17.4998 28.041 18.0521 28.041C18.6044 28.041 19.0521 27.5933 19.0521 27.041L17.0521 27.041ZM17.0521 11.041L17.0521 27.041L19.0521 27.041L19.0521 11.041L17.0521 11.041Z" fill="white" />
        </svg>
      </button>
    </TextWrapper>

  );
}
