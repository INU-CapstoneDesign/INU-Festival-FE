import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import useAccessToken from "../../hooks/useAccessToken";
import UserInfo from "./UserInfo";
import { apiService } from "../../services/ApiService";

const ProfileWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 242px;
  border-radius: 0px 0px 20px 20px;
  background-color: #ebf2ff;
  padding-top: 52px;
  padding-right: 1.6rem;
  padding-left: 1.6rem;
  box-shadow: 0px 3px 13px 0px rgba(1, 71, 200, 0.1);
  justify-content: space-around;
  position: relative;
`;

const ProfileContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
`;

const ProfileTitle = styled.div`
  font-size: 24px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  letter-spacing: -0.96px;
  align-items: center;
  display: flex;

  svg {
    margin-left: 10px;
  }
`;

const UserIcon = styled.img`
  width: 118px;
  height: 150px;
  margin-bottom: 32px;
  flex-shrink: 1;
`;

const LoginBtn = styled.button`
  width: 12em;
  display: flex;
  justify-content: center;
  padding: 15px 60px;
  border-radius: 12px;
  border: none;
  background: #0147c8;
  color: #fff;
  font-size: 15px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  letter-spacing: -0.6px;
  cursor: pointer;
`;

export default function ProfileSection() {
  const { accessToken, setAccessToken } = useAccessToken();

  const navigate = useNavigate();

  const handleClickLogout = async () => {
    const confirmLogout = window.confirm("로그아웃 하시겠습니까?");
    if (confirmLogout) {
      await apiService.logout();
      setAccessToken("");
      navigate("/profile");
    }
  };

  const handleClickLogIn = () => {
    navigate("/login");
  };

  return (
    <ProfileWrapper>
      <ProfileContainer>
        <ProfileTitle>
          프로필
          {accessToken && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="24"
              viewBox="0 0 22 24"
              fill="none"
            >
              <path
                d="M10.9569 9.71113C13.5598 9.71113 15.6698 7.64915 15.6698 5.10557C15.6698 2.56198 13.5598 0.5 10.9569 0.5C8.35413 0.5 6.24414 2.56198 6.24414 5.10557C6.24414 7.64915 8.35413 9.71113 10.9569 9.71113Z"
                fill="#0147C8"
              />
              <path
                d="M9.01057 12.0469H12.9894C17.9623 12.0469 22 15.9927 22 20.8524C22 22.3137 20.7862 23.4999 19.2908 23.4999H2.70916C1.21377 23.4999 0 22.3137 0 20.8524C0 15.9927 4.03773 12.0469 9.01057 12.0469Z"
                fill="#0147C8"
              />
            </svg>
          )}
        </ProfileTitle>
        <UserInfo isLoggedIn={!!accessToken} />
        {accessToken ? (
          <LoginBtn onClick={handleClickLogout}>로그아웃</LoginBtn>
        ) : (
          <LoginBtn onClick={handleClickLogIn}>로그인</LoginBtn>
        )}
      </ProfileContainer>
      <UserIcon src="/profileImg.png" alt="major" />
    </ProfileWrapper>
  );
}
