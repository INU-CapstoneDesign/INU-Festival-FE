import { styled } from "styled-components";

import { Swiper, SwiperSlide } from "swiper/react";

import useFetchPerforms from "../../hooks/useFetchPerforms";

import Skeleton from "../Loading/Skeleton";

const Container = styled.div`
  height: 21rem;
  position: relative;
  padding-inline: 1.6rem;
  margin-top: 6px;
  margin-bottom: 20px;

  img {
    width: 220px;
    height: 21rem;
    border-radius: 0.9rem;
    box-shadow: 0px 2px 20px 0px rgba(0, 71, 201, 0.15);
  }
`;

type LineUpProps = {
  perView: number;
  spaceBetween: number;
};
const SkeletonImg = styled(Skeleton.SkeletonBox)`
  box-shadow: 0px 2px 20px 0px rgba(0, 71, 201, 0.15);
`;

export default function LineUp({ perView, spaceBetween }: LineUpProps) {
  const { data } = useFetchPerforms();

  const lineups =
    data?.performs?.filter(
      (perform) => perform.category === "연예인" && perform.day === "day3"
    ) || [];

  return (
    <Swiper
      spaceBetween={spaceBetween}
      slidesPerView={perView}
      speed={300}
      pagination={{ clickable: true }}
      allowTouchMove
      slidesOffsetAfter={50}
    >
      {data === undefined
        ? new Array(5).fill(1).map((_, i) => (
            <SwiperSlide key={i}>
              <Container data-hash={i}>
                <SkeletonImg $width={200} $height={210} $radius={9} />
              </Container>
            </SwiperSlide>
          ))
        : lineups.map((lineup, index) => {
            const key = `${index}-${lineup.id}`;
            return (
              <SwiperSlide key={key}>
                <Container data-hash={key}>
                  {lineup.img ? (
                    <img src={lineup.img} alt={lineup.img} />
                  ) : (
                    <img src="/LineupDefault.jpeg" alt="Default" />
                  )}
                </Container>
              </SwiperSlide>
            );
          })}
    </Swiper>
  );
}
