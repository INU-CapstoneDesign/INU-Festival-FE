import { useNavigate } from "react-router-dom";
import { useRef } from "react";

import { styled } from "styled-components";

import InfoWithIcon from "../MapDetail/InfoWithIcon";
import Booth from "../../types/Booth";

import getCompactNumberFormatter from "../../utils/getCompactNumberFormat";

const Container = styled.div`
  overflow-y: scroll;
  width: 100%;
  height: 100%;
`;

const PreButton = styled.div`
  cursor: pointer;
  text-decoration: none;
  color: inherit;
`;

const BoothContainer = styled.div`
  flex: 1;
  overflow-x: scroll;
  display: flex;
  padding-top: 17px;
  padding-bottom: 12px;
  padding-right: 10px;
  padding-left: 10px;
  width: 100%;
`;

const BoothContent = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;

  div {
    color: #bbc7d3;
    margin-top: 2.6px;
    margin-bottom: 2.5px;
    margin-right: 5px;
    font-size: 11px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.44px;
    align-items: center;
  }

  b {
    color: #0147c8;
    font-size: 16px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    letter-spacing: -0.64px;
    width: max-content;
  }
`;

const LikedNumber = styled.p`
  padding: 4px 12px;
  height: 26px;
  display: flex;
  background-color: #ebf2ff;
  border-radius: 15px;
  align-items: center;
  justify-content: center;
  width: fit-content;
  margin-top: 5px;

  svg {
    margin: 0 1px;
  }

  span {
    font-size: 11px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    letter-spacing: -0.22px;
    color: #0047c9;
  }
`;

const Image = styled.div`
  width: 154px;
  height: 154px;
  border-radius: 12px;

  img {
    width: 154px;
    height: 154px;
    border-radius: 12px;
  }
`;

const BoothBox = styled.div`
  border-bottom: 1px solid #cedcea;
  display: flex;

  button {
    background-color: transparent;
    padding: 0 5px;
    border: none;
    height: 26px;
  }
`;

const NameBox = styled.div`
  display: flex;

  button {
    padding: 4px 12px;
    display: flex;
    background-color: #ebf2ff;
    border-radius: 15px;
    align-items: center;
    justify-content: center;
    width: max-content;
    margin-top: 5px;
    margin-left: 6px;

    img {
      width: 11px;
    }

    p {
      padding-left: 3px;
    }
  }

  p {
    font-size: 11px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    letter-spacing: -0.22px;
    color: #0047c9;
  }
`;

type BoothListProps = {
  booths: Booth[];
  selectedDay: string;
  setShowMarker: (value: string) => void;
};

export default function BoothList({
  booths,
  selectedDay,
  setShowMarker,
}: BoothListProps) {
  if (!booths) {
    return [];
  }

  const markerButton = useRef<HTMLElement>(null);

  const formatter = getCompactNumberFormatter();
  const navigate = useNavigate();

  const handleShowMarker = (id: string) => {
    const markerArray = booths.filter((booth) => booth.id === id);
    setShowMarker(markerArray);
    window.scrollTo(0, 0);
  };

  const handleNavigate = (
    id: string,
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    const isMark = (e.target as HTMLElement).parentNode.isEqualNode(
      markerButton.current as HTMLElement
    );
    if (!isMark) {
      navigate(`/map/${id}`, { state: { date: selectedDay } });
    } else {
      handleShowMarker(id);
    }
  };

  return (
    <Container>
      {booths.map((booth) => {
        const { id, name, category, liked, boothImgs } = booth;

        return (
          <BoothBox key={id}>
            <PreButton onClick={(e) => handleNavigate(id, e)}>
              <BoothContainer>
                <Image>
                  <img
                    src={
                      boothImgs.length > 0
                        ? boothImgs[0].url
                        : "/PinkBoothDefault.jpeg"
                    }
                    alt="boothImg.png"
                  />
                </Image>
                <BoothContent>
                  <div>{category}</div>
                  <b>{name}</b>
                  <NameBox>
                    <LikedNumber>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="13"
                        height="10"
                        viewBox="0 0 13 11"
                        fill="none"
                      >
                        <path
                          d="M11.4179 1.12468C10.0511 -0.136666 7.87118 -0.00321332 6.54828 1.29688C6.51752 1.32701 6.46478 1.32701 6.42962 1.29688C5.10233 -0.00321332 2.92241 -0.136666 1.55996 1.12468C0.197513 2.38602 0.122798 4.60737 1.48525 5.9419L5.44514 9.82064C6.02528 10.3889 6.96141 10.3889 7.54155 9.82064L11.3388 6.10118L11.497 5.9462C12.8595 4.61167 12.8331 2.43338 11.4223 1.12898L11.4179 1.12468Z"
                          fill="#0047C9"
                        />
                      </svg>
                      <span>{formatter.format(liked)}</span>
                    </LikedNumber>
                    <div>
                      <button
                        ref={markerButton}
                        onClick={() => handleShowMarker(id)}
                        type="button"
                      >
                        <img src="/marker.svg" alt="marker.svg" />
                        <p>위치 보기</p>
                      </button>
                    </div>
                  </NameBox>
                  <InfoWithIcon
                    small="true"
                    booth={booth}
                    selectedDay={selectedDay}
                  />
                </BoothContent>
              </BoothContainer>
            </PreButton>
          </BoothBox>
        );
      })}
    </Container>
  );
}
