import styled from 'styled-components';

const Container = styled.div`
  color: ${(props) => props.theme.colors.subText};
  margin-bottom: 5rem;
  
  h1, h2 {
      font-weight: bold;
  }
  h1 {
    font-size: 2rem;
  }
  h2 {
    font-size: 1.8rem;
    margin-bottom: 1em;
  }
  p {
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
  }
`;

const Section = styled.div`
  margin-top: 2em;
`;

const Item = styled.div`
  width: fit-content;
  display: flex;
  justify-content: space-between;

  h3{
    margin-right: 8px;
  }
`;

export default function Footer() {
  return (
    <Container>
      <h1>희희낙락</h1>
      <Section>
        <h2>우리의 소개</h2>
        <Item>
          <h3>
            <p>Front End</p>
            <p>Back End</p>
            <p>Design</p>
          </h3>
          <div>
            <p>유소정, 이의영, 이희주</p>
            <p>김선희, 이헌도</p>
            <p>서찬해</p>
          </div>
        </Item>
      </Section>
      <Section>
        <h2>서버 운영시간</h2>
        <p>23.00.00 ~ 23.00.00</p>
      </Section>
      <Section>
        <p>Copyrigth 2023 희희낙락 All rights reserved.</p>
      </Section>
    </Container>
  );
}
