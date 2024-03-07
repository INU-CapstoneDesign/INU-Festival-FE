import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { styled } from 'styled-components';

import Notice from '../../types/Notice';
import useCheckScreenWidth from '../../hooks/useCheckScreenWidth';

const NoticeContentBox = styled.div`
background-color: #EBF2FF;
margin-top: 2.3rem;
padding: 2rem;
border-radius: 10px;
font-size: 15px;
font-style: normal;
font-weight: 400;
line-height: 24px;
letter-spacing: -0.6px;
white-space: pre-line;
`;

const NoticeImageContainer = styled.div`
border-radius: 1rem;
display: flex;
`;

const NoticeImageBox = styled.img`
width: 15rem;
border-radius: 1rem;
margin: 2rem 0.6rem;
`;

type NoticeItemProps = {
    notice: Notice;
}

export default function NoticeBottom({ notice } : NoticeItemProps) {
  const [perview, setPerView] = useState(3);
  const defaultPerview = 3;

  useCheckScreenWidth(defaultPerview, setPerView);

  return (
    <NoticeContentBox>
      {notice.content}
      <Swiper
        slidesPerView={perview}
        spaceBetween={10}
        allowTouchMove
        freeMode
        freeModeMinimumVelocity={0.01}
      >
        <NoticeImageContainer>
          {
            notice.noticeImgs.map((img) => {
              const key = `${img.id} + ${img.img}`;
              return (
                <SwiperSlide key={key}>
                  <NoticeImageBox src={img.img} alt={img.img} />
                </SwiperSlide>
              );
            })
          }
        </NoticeImageContainer>
      </Swiper>
    </NoticeContentBox>
  );
}
