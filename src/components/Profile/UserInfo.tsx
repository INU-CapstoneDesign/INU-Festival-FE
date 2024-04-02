import styled from 'styled-components';

import { useEffect } from 'react';
import useUserStore from '../../hooks/useUserStore';
import useCheckAccessToken from '../../hooks/useCheckAccessToken';

const UserInfoWrapper = styled.div`
  display: flex;
  margin-top: 16px;
  justify-content: space-between;
  margin-bottom: 24px;
`;
const UserSection = styled.div`
  letter-spacing: -0.6px;
  white-space: pre-wrap;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 15px;
  font-style: normal;
  line-height: 20px;
  letter-spacing: -0.6px;

  span{
    font-weight: 400;
  }

  b{
    color: #0147C8;
    font-weight: 800;
  }
`;

const Container = styled.div`
  font-size: 15px;
  font-style: normal;
  line-height: 18px;
  letter-spacing: -0.6px;

  div{
    font-weight: 500;
  }

  p{
    color: #0147C8;
    font-weight: 800;
  }
`;

type UserInfoProps ={
  isLoggedIn: boolean;
}

function UserDetail() {
  useCheckAccessToken();
  const [, store] = useUserStore();

  useEffect(() => {
    store.fetchCurrentUser();
  }, []);

  return (
    <Container>
      <div>안녕하세요!</div>
      <p>
        {store.name}
        {' '}
        님
      </p>
    </Container>
  );
}

export default function UserInfo({ isLoggedIn }: UserInfoProps) {
  return (
    <UserInfoWrapper>
      <UserSection>
        {isLoggedIn
          ? <UserDetail />
          : (
            <span>
              즐거운 축제의 시작
              <br />
              <b>희희낙락</b>
              과 함께하세요!
            </span>
          )}
      </UserSection>
    </UserInfoWrapper>
  );
}
