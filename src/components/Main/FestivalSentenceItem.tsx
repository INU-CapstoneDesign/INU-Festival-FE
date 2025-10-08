import styled from "styled-components";

import Shouts from "../../types/Shouts";

const SentenceItemBox = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  height: 60px;
  padding-left: 16px;
`;

const BallonBox = styled.div`
  width: 45px;
  img{
    height: 30.16px;
    top: 496px;
    left: 44px;
  }
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  color: #0042B9;
  font-size: 15px;
  font-style: normal;
  font-weight: 800;
  line-height: 21px;
  letter-spacing: -0.45px;

  span{
    color: #939393;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 100%;
    letter-spacing: -0.36px;
  }
`;

type SententenceItemProps = {
  sentence: Shouts;
}

export default function FestivalSentenceItem({ sentence }: SententenceItemProps) {
  return (
    <SentenceItemBox key={sentence.id}>
      <BallonBox>
        <img src={`${sentence.emoji}.svg`} alt="말풍선" />
      </BallonBox>
      <ContentBox>
        <span>
          {`${sentence.studentId.slice(0, 6)}***`}
        </span>
        {sentence.content}
      </ContentBox>
    </SentenceItemBox>
  );
}
