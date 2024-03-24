import { styled } from 'styled-components';

import Perform from '../../types/Perform';

const Container = styled.div`
width: 159px;
height: 21rem;
margin-bottom: 20px;
cursor: pointer;

img {
  width: 159px;
  height: 154px;
  border-radius: 1.2rem;
  box-shadow: 0px 2px 10px 0px rgba(0, 71, 201, 0.15);
}

div {
  margin-top: 5px;
  margin-top: 5px;
}
`;

const Title = styled.p`
  font-size: 15px;
  font-weight: 800;
  line-height: 21px;
  letter-spacing: -0.45px;
`;

const Description = styled.p`
  display: flex;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: -0.39px;
  margin-top: 5px;
`;

type LineupProps = {
  lineup: Perform;
}

export default function Lineup({ lineup }: LineupProps) {
  const {
    name, startTime, endTime,
  } = lineup;

  return (
    <Container>
      <img src="BOL.jpeg" alt="" />
      <div>
        <Title>{name}</Title>
        <Description>
          {startTime}
          {' '}
          ~
          {' '}
          {endTime}
        </Description>
      </div>

    </Container>
  );
}
