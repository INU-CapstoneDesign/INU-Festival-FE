import { useNavigate } from "react-router";

import styled from "styled-components";

import Booth from "../../types/Booth";

type BoothItemProps = {
  booth: Booth;
  index: number;
};

const BoothContainer = styled.div`
  display: flex;
  align-items: center;
  align-self: stretch;
  gap: 3rem;
`;

const BoothDetail = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

const BoothRank = styled.img`
  width: 28px;
  height: 28px;
  flex-shrink: 0;
`;

const BoothImg = styled.img`
  width: 48px;
  height: 48px;
  left: 45px;
  border-radius: 50%;
  margin-left: 1.3rem;
`;

const BoothTitle = styled.div`
  margin-left: 1.3rem;
  div {
    &:first-child {
      color: #b6bbc4;
      font-size: 13px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: -0.26px;
    }
    &:last-child {
      font-size: 15px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: -0.3px;
    }
  }
`;

const BoothList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 36px;
  cursor: pointer;
`;

export default function BoothItem({ booth, index }: BoothItemProps) {
  const navigate = useNavigate();
  const boothImgUrl =
    booth.boothImgs.length > 0
      ? booth.boothImgs[0].url
      : "/PinkBoothDefault.jpeg";

  const handleClick = (id: string) => {
    navigate(`/map/${id}`);
  };
  return (
    <BoothList onClick={() => handleClick(booth.id)}>
      <BoothContainer>
        <BoothDetail>
          <BoothRank src={`/Rank${index + 1}.png`} alt="순위" />
          <BoothImg src={boothImgUrl} alt="부스이미지" />
          <BoothTitle>
            <div>{booth.category}</div>
            <div>{booth.name}</div>
          </BoothTitle>
        </BoothDetail>
      </BoothContainer>
    </BoothList>
  );
}
