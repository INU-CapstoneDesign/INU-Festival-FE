import { useState } from "react";

import styled from "styled-components";

import Toast from "./Toast";

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
  height: 20px;
  flex-shrink: 0;
  margin-bottom: 27px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const HelpIcon = styled.img`
  width: 18px;
  height: 20px;
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
  height: 20px;
  padding-top: 0px;
  padding-bottom: 0px;
`;

const CopyTextArea = styled.textarea`
  opacity: 0;
`;

export default function HelpSection() {
  const [toast, setToast] = useState(false);
  const [toastText, setToastText] = useState("");

  const handleShare = async () => {
    const currentUrl = "https://unionfestival.kr/";
    const shareObject: ShareData = {
      title: "희희낙락",
      text: "즐거운 축제의 시작, 희희낙락과 함께하세요!",
      url: currentUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareObject);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(currentUrl);
        setToastText("클립보드에 복사되었습니다.");
        setToast(true);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = currentUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        setToastText("복사되었습니다.");
        setToast(true);
      }
    } catch {
      alert("복사에 실패했습니다.");
    }
  };

  const handleCopyHelp = () => {
    window.open("https://open.kakao.com/o/sAfoQwng");
  };

  const handleCopyReview = () => {
    window.open("https://forms.gle/7RQop6HMcAY2ofro9");
  };

  const handleFortune = () => {
    const message: string[] = [
      "성적이나 취업 등의 걱정은 잠시 뒤로 하고 연인이나 친구들과 즐거운 시간을 만들어 보세요",
      "정신이 맑고 가벼우니, 큰 일을 계획하거나 공부를 하기 좋은 날이에요",
      "하고자 하는 일에 막힘이 없고 에너지가 넘치는 날이에요",
      "한 번의 실수로 금전적인 손실이 생길 수 있으니 조심 또 조심하세요!",
      "그동안 노력했던 일들이 오늘 좋은 결과로 찾아오겠군요",
      "게으름은 금물이예요. 일이든 애정이든 적극적으로 나를 어필해 보세요",
      "주저하지 말고 최선을 다하면 얻는 즐거움이 따를 거에요",
      "급할수록 돌아가야 한다는 것을 잊지 마시길",
      "거침없이 흐르는 강물과 같으니, 모든 일이 순조롭겠습니다",
      "내가 옳다고 생각하는 일을 주저하지 말고 실천하세요",
      "새로운 경험은 당신을 크게 만들어줄 것입니다",
      "할까 말까 고민되는 일이 있다면 지금 당장 도전하세요",
      "곧 있을 행운을 놓치지 마세요",
      "무슨 일이 있어도 당신의 편! 든든한 지원군이 생길거에요",
      "오래 전에 베푼 작은 친절이 눈덩이처럼 커져 행운으로 돌아올 예정이에요",
      "굳이 힘들여 노력하지 않았는데도, 상상도 못 한 멋진 일이…",
      "선택의 기로에서 평소 선택하지 않았던 것을 선택해보세요. 엄청난 행운이 기다리고 있으니.",
      "이 메시지를 읽고 있는 당신은 오늘 짱 행복하게 됩니다",
      "이 메시지를 읽고 있는 당신은 모든 일을 해 낼 용기가 생깁니다 !",
      "당신은 짱이에요",
      "이 메시지를 읽고 있는 당신은 앞으로 모든 일이 신기하게 잘 풀립니다 !",
      "이 메시지를 읽고 있는 당신은 아는 것만 시험에 나올거에요",
      "이 메시지를 읽고 있는 당신은 적게 일하고 돈은 많이 벌어서 부자가 될거에요",
      "중간고사를 망쳤어도 A+이 나오는 행운이 !",
    ];
    const randomIndex = Math.floor(Math.random() * message.length);
    setToastText(message[randomIndex]);
    setToast(true);
  };

  return (
    <HelpWrapper>
      <HelpTitle>지원</HelpTitle>
      <HelpElement onClick={handleCopyHelp}>
        <HelpIcon src="/Contact.svg" />
        <Helplink>문의하기</Helplink>
      </HelpElement>
      <HelpElement onClick={handleCopyReview}>
        <HelpIcon src="/review.svg" />
        <Helplink>리뷰 남기기</Helplink>
      </HelpElement>
      <HelpElement onClick={() => handleShare()}>
        <HelpIcon src="/Link.svg" />
        <Helplink>링크 공유하기</Helplink>
        <CopyTextArea id="copyTextArea" readOnly value="httplocalhost:8080/" />
        {toast && <Toast setToast={setToast} text={toastText} />}
      </HelpElement>
      <HelpElement onClick={() => handleFortune()}>
        <HelpIcon src="/clover.svg" />
        <Helplink>오늘의 운세</Helplink>
        {toast && <Toast setToast={setToast} text={toastText} />}
      </HelpElement>
    </HelpWrapper>
  );
}
