import { useNavigate } from 'react-router-dom';

import { styled } from 'styled-components';

import InfoWithIcon from '../MapDetail/InfoWithIcon';
import Booth from '../../types/Booth';

import getCompactNumberFormatter from '../../utils/getCompactNumberFormat';

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
    display: flex;
    padding: 10px;
    width: 100%;
    border-bottom: 1px solid #CEDCEA;

    img{
      width: 160px;
      height: 160px;
      border-radius: 12px;
    }
`;

const BoothContent = styled.div`
    margin-left: 20px;

    div {
      color: #BBC7D3;
      margin-top: 3px;
      margin-bottom: 2.5px;
      margin-right: 5px;
      font-size: 11px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: -0.44px;
    }
    
    b {
      color: #0147C8;
      font-size: 16px;
      font-style: normal;
      font-weight: 800;
      line-height: normal;
      letter-spacing: -0.64px;
      margin-top: 7px;
    }
`;

const LikedNumber = styled.p` 
    padding: 4px 12px;
    display: flex;
    background-color: #EBF2FF;
    border-radius: 15px;
    align-items: center;
    justify-content: center;
    width: fit-content;
    margin-top: 10px;
  
    span {
      font-size: 11px;
      font-style: normal;
      font-weight: 800;
      line-height: normal;
      letter-spacing: -0.22px;
      color: #0047C9;
    }
`;

type BoothListProps = {
  booths: Booth[];
  selectedDay: string;
};

export default function BoothList({
  booths,
  selectedDay,
}: BoothListProps) {
  if (!booths) { return []; }

  const formatter = getCompactNumberFormatter();
  const navigate = useNavigate();

  const handleNavigate = (id: string) => {
    navigate(`/map/${id}`, { state: { date: selectedDay } });
  };

  return (
    <Container>
      {booths.map((booth) => {
        const {
          id, name, category, liked, boothImgs,
        } = booth;

        return (
          <PreButton
            onClick={() => handleNavigate(id)}
            key={id}
          >
            <BoothContainer>
              <img src={boothImgs && boothImgs[0].url} alt="boothImg.png" />
              <BoothContent>
                <div>{category}</div>
                <b>{name}</b>
                <LikedNumber>
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="10" viewBox="0 0 13 11" fill="none">
                    <path d="M11.4179 1.12468C10.0511 -0.136666 7.87118 -0.00321332 6.54828 1.29688C6.51752 1.32701 6.46478 1.32701 6.42962 1.29688C5.10233 -0.00321332 2.92241 -0.136666 1.55996 1.12468C0.197513 2.38602 0.122798 4.60737 1.48525 5.9419L5.44514 9.82064C6.02528 10.3889 6.96141 10.3889 7.54155 9.82064L11.3388 6.10118L11.497 5.9462C12.8595 4.61167 12.8331 2.43338 11.4223 1.12898L11.4179 1.12468Z" fill="#0047C9" />
                  </svg>
                  <span>{formatter.format(liked)}</span>
                </LikedNumber>
                <InfoWithIcon
                  small="true"
                  booth={booth}
                  selectedDay={selectedDay}
                />
              </BoothContent>
            </BoothContainer>
          </PreButton>
        );
      })}
    </Container>
  );
}
