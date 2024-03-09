import { useEffect, useState } from 'react';

import { styled } from 'styled-components';

import { useInterval } from 'usehooks-ts';
import Perform from '../../types/Perform';

const Section = styled.div`
  h1 {
    font-size: 21px;
    font-style: normal;
    font-weight: 800;
    line-height: 28px;
    letter-spacing: -0.84px;
    margin-top: 41px;
    margin-bottom: 24px;
  }
`;

const Container = styled.div`
    display: flex;
`;

const Line = styled.div`
    border: dotted 3px #CEDCEA;
    border-radius: 10px;
    margin-left: 10px;
    margin-right: 25px;
`;

const Item = styled.div`
    background-color: #EBF2FF;
    margin-bottom: 24px;
    padding: 20px;
    border-radius: 12px;
    overflow: hidden;
    text-overflow: ellipsis;

    span{
      font-size: 15px;
      font-style: normal;
      font-weight: 900;
      line-height: normal;
      letter-spacing: -0.6px;
    }

    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    span:nth-child(1) {
      font-size: 15px;
    }

    span:nth-child(2) {
      color: #F3BC5B;
      font-size: 13px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: -0.52px;
    }

    #name {
        color: #000;
        font-size: 17px;
        font-style: normal;
        font-weight: 800;
        line-height: normal;
        letter-spacing: -0.68px;
        margin-top: 8px;
        margin-bottom: 8px;
    }

    #detail {
      color: #9EA9B5;
      font-size: 13px;
      font-style: normal;
      font-weight: 500;
      line-height: 18px;
      letter-spacing: -0.52px;
    }

    #time{
      color: #0047C9;
      font-size: 15px;
      font-style: normal;
      font-weight: 900;
      line-height: normal;
      letter-spacing: -0.6px;
      padding-left: 4px;
    }

    &.active {
      background-color: #0047C9;
      color: #FFFFFF;

      #name, #detail, #time {
        color: #FFFFFF;
      }
    }

    p{
      align-items: center;
      display: flex;
    }
`;

type ScheduleProps = {
    performs: Perform[];
}

export default function Schedule({ performs }: ScheduleProps) {
  const [id, setId] = useState('-1');

  useEffect(() => {
    const match = (perform: Perform) => (
      perform.startTime <= '20:00'
      && perform.endTime >= '20:00'
    );

    const artist = performs.find(match);

    if (artist) {
      setId(artist.id);
    }
  }, [performs]);

  return (
    <Section>
      <h1>전체 일정을 확인해보세요!</h1>
      <Container>
        <Line />
        <div>
          {performs.map((perform) => {
            const isActive = perform.id === id;

            return (
              <Item
                key={perform.id}
                className={isActive ? 'active' : ''}
              >
                <div>
                  <p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
                      <path d="M7 0.5C3.13375 0.5 0 3.63375 0 7.5C0 11.3663 3.13375 14.5 7 14.5C10.8663 14.5 14 11.3663 14 7.5C14 3.63375 10.8657 0.5 7 0.5ZM10.2672 9.95011C10.17 10.0808 10.0212 10.15 9.87018 10.15C9.76749 10.15 9.66426 10.1181 9.57586 10.0528L6.67493 7.8992C6.53326 7.79377 6.46462 7.62684 6.47725 7.46266V2.99733C6.47725 2.72443 6.69854 2.50314 6.97145 2.50314C7.24435 2.50314 7.46564 2.72443 7.46564 2.99733V7.25455L10.1645 9.25824C10.3836 9.42077 10.4297 9.73102 10.2672 9.95011Z" fill="#FFC700" />
                    </svg>
                    <span id="time">{perform.startTime}</span>
                  </p>
                  {isActive ? <span>진행 중!</span> : ''}
                </div>
                {' '}
                <h2 id="name">{perform.name}</h2>
                <p id="detail">{perform.detail}</p>
              </Item>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
