import React, { useEffect } from 'react';

import styled from 'styled-components';

import TextBox from '../UI/TextBox';
import Button from '../UI/Button';

import useAccessToken from '../../hooks/useAccessToken';
import useLoginFormStore from '../../hooks/useLoginFormStore';
import useCheckAccessToken from '../../hooks/useCheckAccessToken';

const Container = styled.div`
  width: 100%;
  display: flex;
  padding: 88px 20px 124px 20px;
  flex-direction: column;
  align-items: center;
  gap: 15px;

  form {
    width: 100%;
  }
`;

const LmsButton = styled(Button)`
  display: flex;
  height: 48px;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border-radius: 12px;
  border:none;
  background: #0147C8;
  color: #FFF;
  font-family: "SF Pro";
  font-size: 15px;
  font-style: normal;
  font-weight: 510;
  line-height: normal;
  letter-spacing: -0.6px;
`;

const BtnWrapper = styled.div`
  display:flex;
  flex-direction:column;
  align-items: center;
  width:100%;
  gap:10px;
  margin-top:50px;
`;

const Details = styled.div`
  color: #CFCFCF;
  text-align: center;
  font-family: "SF Pro";
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 19px; 
  letter-spacing: -0.52px;
  margin-top:60px;
  
  span{
    display:block;
  }

`;

export default function LoginForm() {
  const { setAccessToken } = useAccessToken();

  const [{
    email, password, valid, error, accessToken,
  }, store] = useLoginFormStore();

  useEffect(() => {
    if (accessToken) {
      setAccessToken(accessToken);
    }
  }, [accessToken]);

  const handleChangeEmail = (value: string) => {
    store.changeEmail(value);
  };

  const handleChangePassword = (value: string) => {
    store.changePassword(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    store.lmsLogin();
  };

  return (
    <Container>
      <img src="INUlogo.png" alt="INU logo" />
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
          <LmsButton type="submit" disabled={!valid}>
            로그인
          </LmsButton>
          {error && (
            <p>로그인 실패</p>
          )}
        </BtnWrapper>
      </form>
      <Details>
        <span>로그인 정보는 포탈과 동일합니다</span>
        <span>학생은 학번, 교원은 교번, 직원은 사번입니다.</span>
        <span>아이디 찾기 / 비밀번호 찾기는</span>
        <span>PC에서 포탈을 이용하시기 바랍니다.</span>
      </Details>
    </Container>
  );
}
