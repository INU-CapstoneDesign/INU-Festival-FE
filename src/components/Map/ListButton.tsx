import { styled } from "styled-components";

const Container = styled.div`
  max-width: 600px;
  width: 100%;
  position: fixed;
  z-index: 1;
  bottom: 190px;
  display: flex;
  height: 42px;
  margin: auto;

  button {
    border: 1px solid #2a4476;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 118px;
    height: 100%;
    padding: 0px;
    box-shadow: 0px 2px 20px 0px rgba(0, 71, 201, 0.15);
    border-radius: 5rem;
    background-color: #0147c8;
    color: #ffffff;
    font-size: 13px;
    font-style: normal;
    font-weight: 510;
    line-height: normal;
    letter-spacing: -0.26px;
    cursor: pointer;

    span,
    img {
      margin: 0.5rem;
    }
  }
`;

export default function ListButton() {
  return (
    <Container>
      <button type="button">
        <img src="/list.png" alt="list.png" />
        <span>목록보기</span>
      </button>
    </Container>
  );
}
