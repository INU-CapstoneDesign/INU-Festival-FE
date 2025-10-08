import { useNavigate } from "react-router";
import styled from "styled-components";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import FestivalSentenceItem from "./FestivalSentenceItem";
import useFetchSentence from "../../hooks/useFetchSentence";

import SkeletonFestivalSentence from "../Loading/SkeletonFestivalSentenceItem";

const FestivalSentenceBox = styled.div`
  display: flex;
  direction: columns;
  cursor: pointer;

  .swiper {
    width: 100%;
    height: 100%;
  }
`;

const SentenceBox = styled.div`
  margin-top: 75px;
  background-color: #f8f8fa;
  width: 100%;
  height: 60px;
  border-radius: 12px;
  align-items: center;
  overflow: hidden;
`;

export default function FestivalSentence() {
  const { data } = useFetchSentence();
  const navigate = useNavigate();

  const handleClickGuestbook = () => {
    navigate("/guestbook");
  };

  return (
    <FestivalSentenceBox onClick={handleClickGuestbook}>
      <SentenceBox>
        {data === undefined ? (
          <SkeletonFestivalSentence />
        ) : (
          <Swiper
            direction="vertical"
            loop
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            className="mySwiper"
          >
            {data.shouts
              .slice(0)
              .reverse()
              .map((sentence) => (
                <SwiperSlide key={sentence.id}>
                  <FestivalSentenceItem sentence={sentence} />
                </SwiperSlide>
              ))}
          </Swiper>
        )}
      </SentenceBox>
    </FestivalSentenceBox>
  );
}
