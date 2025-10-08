import { useEffect, useState } from "react";

import { styled } from "styled-components";

import Perform from "../../types/Perform";

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

const Item = styled.div`
  background-color: #ebf2ff;
  padding: 20px;
  margin-bottom: 24px;
  border-radius: 12px;
  overflow: hidden;
  text-overflow: ellipsis;

  span {
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
    color: #f3bc5b;
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
    color: #9ea9b5;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: 18px;
    letter-spacing: -0.52px;
  }

  #time {
    color: #0047c9;
    font-size: 15px;
    font-style: normal;
    font-weight: 900;
    line-height: normal;
    letter-spacing: -0.6px;
    padding-left: 4px;
  }

  &.active {
    background-color: #0047c9;
    color: #ffffff;

    #name,
    #detail,
    #time {
      color: #ffffff;
    }
  }

  p {
    align-items: center;
    display: flex;
  }
`;

type ScheduleProps = {
  performs: Perform[];
};

export default function Schedule({ performs }: ScheduleProps) {
  const [id, setId] = useState("-1");
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const hours = now
        .getHours()
        .toString()
        .padStart(2, "0");
      const minutes = now
        .getMinutes()
        .toString()
        .padStart(2, "0");
      const seconds = now
        .getSeconds()
        .toString()
        .padStart(2, "0");
      const month = now.getMonth() + 1;
      const date = now.getDate();
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
      setCurrentDate(`${month}월 0${date}일`);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const match = (perform) => perform.date === currentDate && perform.time <= currentTime;

    const artist = performs.find(match);
    if (artist) {
      setId(artist.id);
    } else {
      setId("-1");
    }
  }, [currentTime]);

  return (
    <Section>
      <h1>전체 일정을 확인해보세요!</h1>
      <div>
        <div>
          {performs.map((perform) => {
            const isActive = perform.id === id;

            return (
              <Item key={perform.id} className={isActive ? "active" : ""}>
                <div>
                  <p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="15"
                      viewBox="0 0 14 15"
                      fill="none"
                    >
                      <path
                        d="M7 0.5C3.13375 0.5 0 3.63375 0 7.5C0 11.3663 3.13375 14.5 7 14.5C10.8663 14.5 14 11.3663 14 7.5C14 3.63375 10.8657 0.5 7 0.5ZM10.2672 9.95011C10.17 10.0808 10.0212 10.15 9.87018 10.15C9.76749 10.15 9.66426 10.1181 9.57586 10.0528L6.67493 7.8992C6.53326 7.79377 6.46462 7.62684 6.47725 7.46266V2.99733C6.47725 2.72443 6.69854 2.50314 6.97145 2.50314C7.24435 2.50314 7.46564 2.72443 7.46564 2.99733V7.25455L10.1645 9.25824C10.3836 9.42077 10.4297 9.73102 10.2672 9.95011Z"
                        fill="#FFC700"
                      />
                    </svg>
                    <span id="time">{perform.time}</span>
                  </p>
                  {isActive ? <span>진행 중!</span> : ""}
                </div>
                {" "}
                <h2 id="name">{perform.name}</h2>
                <p id="detail">{perform.detail}</p>
              </Item>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
