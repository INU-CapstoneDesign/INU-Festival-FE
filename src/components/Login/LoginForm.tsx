import { useState } from "react";

import styled from "styled-components";

import TextBox from "../UI/TextBox";
import Button from "../UI/Button";

import useAccessToken from "../../hooks/useAccessToken";

const Container = styled.div`
  width: 100%;
  display: flex;
  padding: 88px 20px 124px 20px;
  flex-direction: column;
  align-items: center;
  gap: 15px;

  margin-bottom: -10px;

  form {
    width: 100%;
    margin-top: 10px;
  }

  img {
    width: 121px;
    height: 92px;
  }
`;

const LmsButton = styled(Button)`
  display: flex;
  height: 48px;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border-radius: 12px;
  border: none;
  background: #0147c8;
  color: #fff;
  font-family: "SF Pro";
  font-size: 15px;
  font-style: normal;
  font-weight: 510;
  line-height: normal;
  letter-spacing: -0.6px;
`;

const BtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 10px;
  margin-top: 40px;
`;

const Details = styled.div`
  color: #cfcfcf;
  text-align: center;
  font-family: "SF Pro";
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: -0.52px;
  margin-top: 50px;

  span {
    display: block;
  }
`;

export default function LoginForm() {
  const { setAccessToken } = useAccessToken();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleChangeEmail = (value: string) => {
    setEmail(value);
  };

  const handleChangePassword = (value: string) => {
    setPassword(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 간단한 로그인 처리 (실제 구현 필요)
    if (email && password) {
      setAccessToken("dummy-token");
    } else {
      setError("이메일과 비밀번호를 입력해주세요.");
    }
  };

  return (
    <Container>
      <img src="/INUlogo.png" alt="INU logo" />
      <form onSubmit={handleSubmit}>
        <TextBox
          label="E-mail"
          placeholder="학번"
          value={email}
          onChange={handleChangeEmail}
        />
        <TextBox
          label="Password"
          placeholder="비밀번호"
          type="password"
          value={password}
          onChange={handleChangePassword}
        />
        <BtnWrapper>
          <LmsButton type="submit" disabled={!email || !password}>
            로그인
          </LmsButton>
          {error && <p>{error}</p>}
        </BtnWrapper>
      </form>
      <Details>
        <span>로그인 정보는 포탈과 동일합니다</span>
        <span>재학생만 로그인이 가능합니다</span>
        <span>아이디 찾기 / 비밀번호 찾기는</span>
        <span>PC에서 포탈을 이용하시기 바랍니다.</span>
      </Details>
    </Container>
  );
}
