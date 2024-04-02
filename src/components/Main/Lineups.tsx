import { useState } from 'react';

import { useNavigate } from 'react-router';

import styled from 'styled-components';

import Header from './Header';
import LineUp from './LineUp';
import BlurContainer from '../BlurContainer';

import useCheckScreenWidth from '../../hooks/useCheckScreenWidth';

const Content = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;  

  p {
    color: white;
    font-size: 21px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    letter-spacing: -0.42px;
    padding-top: 19px;
  }
`;

const MainBlurContainer = styled(BlurContainer)`
`;

const BannerContainer = styled.div`
  width: 100%;
  height: 230px;
  position: absolute;
  top: 13rem;
  z-index: 100;
  cursor: pointer;
`;

export default function Lineups() {
  const defaultPerview = 3;
  const [perview, setPerView] = useState(defaultPerview);

  useCheckScreenWidth(defaultPerview, setPerView);

  const naviagetor = useNavigate();

  const handleClick = () => {
    naviagetor('/timetable');
  };
  return (
    <>
      <MainBlurContainer>
        <Content>
          <Header />
          <p>오늘의 라인업</p>
        </Content>
      </MainBlurContainer>
      <BannerContainer onClick={handleClick}>
        <LineUp
          perView={perview}
          spaceBetween={25}
        />
      </BannerContainer>
    </>
  );
}
