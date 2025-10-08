import styled from "styled-components";

import { useNavigate } from "react-router";
import useFetchBoothsRanking from "../../hooks/useFetchBoothsRanking";

import getCompactNumberFormatter from "../../utils/getCompactNumberFormat";

import SkeletonBoothRanking from "../Loading/SkeletonBoothRanking";
import BoothItem from "./BoothItem";

const BoothRankingTitle = styled.div`
  width: 100%;
  font-size: 21px;
  font-style: normal;
  font-weight: 800;
  line-height: 30px;
  letter-spacing: -0.42px;
  margin-top: 36px;
  margin-bottom: 16px;
`;

const UpdateDate = styled.span`
  color: #a9a9a9;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 15px;
  letter-spacing: -0.45px;
`;

const BoothRankingContainer = styled.div`
  display: flex;
  width: 100%;
  height: 492px;
  padding: 24px 20px;
  align-items: flex-start;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0px 2px 20px 0px rgba(0, 71, 201, 0.15);
  margin-top: 28px;
  margin-bottom: 40px;
`;

const BoothWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1 0 0;
  height: 100%;
`;
const BoothRankingCrown = styled.div`
  color: #0047c9;
  font-size: 20px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  letter-spacing: -0.4px;
`;
const LineDiv = styled.div`
  width: 100%;
  height: 1px;
  background-color: #cedcea;
  margin-bottom: 20px;
  margin-top: 12px;
`;

const BoothRank = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  width: 98%;
  height: 100%;
  margin-bottom: 1.5rem;
  min-height: 5rem;
`;

const BoothHeartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  height: 100%;
`;

const BoothHeart = styled.div`
  width: 6.8rem;
  height: 3rem;
  flex-shrink: 0;
  border-radius: 999px;
  background: #ebf2ff;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-left: 0.95rem;
  cursor: pointer;

  img {
    width: 12px;
    height: 10px;
  }

  div {
    text-align: left;
    color: #0047c9;
    font-size: 13px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    letter-spacing: -0.26px;
  }
`;

export default function BoothRanking() {
  const { data } = useFetchBoothsRanking();
  const formatter = getCompactNumberFormatter();
  const navigate = useNavigate();

  const handleClick = (id: string) => {
    navigate(`map/${id}`);
  };

  return (
    <>
      <BoothRankingTitle>
        축제에서 가장
        <br />
        인기있는 부스를 확인하세요
      </BoothRankingTitle>

      <UpdateDate>💥 랭킹은 매일 오전 09시에 초기화됩니다. 💥</UpdateDate>

      <BoothRankingContainer>
        <BoothWrapper>
          <BoothRankingCrown>부스 랭킹 👑</BoothRankingCrown>
          <LineDiv />
          {data === undefined
            ? new Array(5)
                .fill(1)
                .map((_, i) => <SkeletonBoothRanking key={i} />)
            : data?.booths.map((booth, index) => (
                <BoothRank key={booth.id}>
                  <BoothItem booth={booth} index={index} />
                  <BoothHeartContainer>
                    <BoothHeart onClick={() => handleClick(booth.id)}>
                      <img src="/Heart.svg" alt="좋아요 하트" />
                      <div>{formatter.format(booth.liked)}</div>
                    </BoothHeart>
                  </BoothHeartContainer>
                </BoothRank>
              ))}
        </BoothWrapper>
      </BoothRankingContainer>
    </>
  );
}
