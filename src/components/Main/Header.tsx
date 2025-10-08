import { NavLink } from "react-router-dom";

import styled from "styled-components";

const Container = styled.div`
  max-width: 600px;
  padding: 11px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0;
`;

const Title = styled.div`
  display: flex;
  align-items: center;

  span {
    font-size: 1.8rem;
    font-weight: bold;
    color: #ffffff;
    padding-block: 1.4em;
    padding-inline: 0.4em;
    line-height: 100%;
  }

  img {
    width: 100px;
    height: 45px;
  }
`;

const PreButton = styled(NavLink)`
  cursor: pointer;
`;

export default function Header() {
  return (
    <Container>
      <Title>
        <img src="/UNION/svg/water_mark_digital.svg" alt="로고" />
      </Title>
      <PreButton to="/notices">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="22"
          viewBox="0 0 20 22"
          fill="none"
        >
          <path
            d="M20 10.9995C20 8.96371 18.3451 7.29728 16.247 7.14787V2.29157C16.247 1.02571 15.1691 0 13.8387 0H13.7405C13.2463 0 12.7618 0.135661 12.3466 0.3914L4.71438 5.08637H2.40825C1.07793 5.08637 0 6.11208 0 7.37794V13.8072C0 15.073 1.07793 16.0987 2.40825 16.0987H4.71438L12.2984 21.5114C12.7425 21.8286 13.2829 22 13.8387 22C15.1691 22 16.247 20.9743 16.247 19.7084V14.8521C18.346 14.7027 20 13.0363 20 11.0005V10.9995Z"
            fill="white"
          />
        </svg>
      </PreButton>
    </Container>
  );
}
