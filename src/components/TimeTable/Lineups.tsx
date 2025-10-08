import { styled } from "styled-components";

import { Swiper, SwiperSlide } from "swiper/react";

import { useState } from "react";

import Lineup from "./Lineup";

import Perform from "../../types/Perform";

import useCheckScreenWidth from "../../hooks/useCheckScreenWidth";

type LineupsProps = {
  lineups: Perform[];
};

const Section = styled.section`
  h1 {
    font-size: 21px;
    font-weight: 800;
    line-height: normal;
    letter-spacing: -0.84px;
    margin-top: 32px;
    margin-bottom: 12px;
    width: 100%;
  }

  h3 {
    color: #a9a9a9;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: 15px;
    letter-spacing: -0.39px;
    margin-bottom: 20px;
  }
`;

export default function Lineups({ lineups }: LineupsProps) {
  const defaultPerview = 4;
  const [perview, setPerView] = useState(defaultPerview);

  useCheckScreenWidth(defaultPerview, setPerView);

  return (
    <Section>
      <h1>Lineup</h1>
      <h3>오늘의 신나는 라인업!</h3>
      <Swiper
        spaceBetween={115}
        slidesPerView={perview}
        speed={300}
        pagination={{ clickable: true }}
        allowTouchMove
        slidesOffsetAfter={110}
      >
        {lineups.map((lineup) => (
          <SwiperSlide key={lineup.id}>
            <Lineup lineup={lineup} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Section>
  );
}
