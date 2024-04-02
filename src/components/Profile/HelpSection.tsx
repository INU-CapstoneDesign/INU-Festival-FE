import { useState } from 'react';

import styled from 'styled-components';

import Toast from './Toast';

const HelpWrapper = styled.ul`
  width: 100%;
  padding-top: 32px;
  list-style: none;
`;

const HelpTitle = styled.div`
  font-size: 20px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  letter-spacing: -0.8px;
  margin-bottom: 23px;
`;

const HelpElement = styled.li`
width: 100%;
height: 23px;
flex-shrink: 0;
margin-bottom:27px;
display:flex;
cursor: pointer;
`;

const HelpIcon = styled.img`
width: 18px;
height: 18px;
flex-shrink: 0;
margin-right: 12px;
`;

const Helplink = styled.button`
  color: #000;
  font-family: SUIT, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: -0.64px;
  line-height: normal;
  border: none;
  background-color: transparent;
  cursor: pointer;
  min-width: fit-content;
`;

const CopyTextArea = styled.textarea`
  opacity: 0;
`;

export default function HelpSection() {
  const [toast, setToast] = useState(false);
  const [toastText, setToastText] = useState('');

  const handleShare = async () => {
    const currentUrl = 'https://unionfestival.kr/';
    const shareObject: ShareData = {
      title: '희희낙락',
      text: '즐거운 축제의 시작, 희희낙락과 함께하세요!',
      url: currentUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareObject);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(currentUrl);
        setToastText('클립보드에 복사되었습니다.');
        setToast(true);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = currentUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setToastText('복사되었습니다.');
        setToast(true);
      }
    } catch {
      alert('복사에 실패했습니다.');
    }
  };

  const handleCopyHelp = () => {
    window.open('https://open.kakao.com/o/sNl4zf7f');
  };

  const handleClickFriend = () => {
    setToastText('준비중입니다.');
    setToast(true);
  };

  return (
    <HelpWrapper>
      <HelpTitle>지원</HelpTitle>
      <HelpElement onClick={() => handleClickFriend()}>
        <HelpIcon src="Human.svg" />
        <Helplink>친구 찾기</Helplink>
        {toast && <Toast setToast={setToast} text={toastText} />}
      </HelpElement>
      <HelpElement onClick={handleCopyHelp}>
        <HelpIcon src="Contact.svg" />
        <Helplink>문의하기</Helplink>
      </HelpElement>
      <HelpElement onClick={() => handleShare()}>
        <HelpIcon src="Link.svg" />
        <Helplink>링크 공유하기</Helplink>
        <CopyTextArea id="copyTextArea" readOnly value="httplocalhost:8080/" />
        {toast && <Toast setToast={setToast} text={toastText} />}
      </HelpElement>
    </HelpWrapper>
  );
}
