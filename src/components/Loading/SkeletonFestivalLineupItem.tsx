import { styled } from "styled-components";

import { SwiperSlide } from "swiper/react";

import Skeleton from "./Skeleton";

const SkeletonImg = styled(Skeleton.SkeletonBox)`
    box-shadow: 0px 2px 20px 0px rgba(0, 71, 201, 0.15);
`;

const Container = styled.div`
    height: 21rem;
    position: relative;
    padding-inline: 1.6rem;
    margin-bottom: 20px;
`;

export default function SkeletonFestivalLineupItem() {
  return (
    new Array(5).fill(1).map((_, i) => (
      <SwiperSlide key={i}>
        <Container>
          <SkeletonImg
            $width={200}
            $height={210}
            $radius={9}
          />
        </Container>
      </SwiperSlide>
    )));
}

// 컴포넌트 통째로 넓으면 동작하지 않는다.
// LineUp.tsx
