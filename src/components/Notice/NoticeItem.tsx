import { useState } from "react";

import { styled } from "styled-components";

import Notice from "../../types/Notice";
import NoticeBottom from "./NoticeBottom";
import NoticeTitle from "./NoticeTitle";

const NoticeBox = styled.div`
  margin-bottom: 32px;
`;

const NoticeTop = styled.div`
  display: flex;
  cursor: pointer;
`;

const NoticeExtend = styled.div`
    margin: auto 0;
`;

type NoticeItemProps = {
  notice: Notice;
}

export default function NoticeItem({ notice } : NoticeItemProps) {
  const [isVisible, setVisible] = useState(false);

  const toggleContent = () => {
    setVisible(!isVisible);
  };

  return (
    <NoticeBox>
      <NoticeTop onClick={toggleContent}>
        <NoticeTitle notice={notice} />
        <NoticeExtend>
          {isVisible ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="10" viewBox="0 0 17 10" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M9.21926 0.682638C8.82873 0.292113 8.19557 0.292114 7.80505 0.682638L0.731411 7.75627C0.340887 8.1468 0.340887 8.77996 0.731411 9.17049C1.12194 9.56101 1.7551 9.56101 2.14562 9.17049L8.51215 2.80396L14.8787 9.17049C15.2692 9.56101 15.9024 9.56101 16.2929 9.17049C16.6834 8.77996 16.6834 8.1468 16.2929 7.75627L9.21926 0.682638Z" fill="#E0E0E0" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="10" viewBox="0 0 17 10" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M7.80516 8.78074C8.19568 9.17127 8.82884 9.17127 9.21937 8.78074L16.293 1.70711C16.6835 1.31658 16.6835 0.683418 16.293 0.292893C15.9025 -0.0976314 15.2693 -0.0976314 14.8788 0.292893L8.51226 6.65942L2.14573 0.292893C1.75521 -0.0976314 1.12205 -0.097631 0.731521 0.292893C0.340997 0.683418 0.340996 1.31658 0.731521 1.70711L7.80516 8.78074Z" fill="#E0E0E0" />
            </svg>
          )}
        </NoticeExtend>
      </NoticeTop>
      {isVisible && <NoticeBottom notice={notice} />}
    </NoticeBox>
  );
}
