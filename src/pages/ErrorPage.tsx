import styled from "styled-components";

const Container = styled.div`
    display: flex;
    height: calc(100vh - 8rem);
    justify-content: center;
    text-align: center;
    flex-direction: column;
`;

const Box = styled.div`
    img{
        width: 60%;
    }
    
    p{
        padding: 20px;
        font-weight: 700;
    }
`;
export default function ErrorPage() {
  return (
    <Container>
      <Box>
        <img src="/UNION/svg/water_mark_digital.svg" alt="로고" />
        <p>에러가 발생했습니다.</p>
      </Box>
    </Container>

  );
}
