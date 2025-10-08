import { useNavigate } from "react-router-dom";

import styled from "styled-components";

type HeaderProps = {
  children: React.ReactNode;
  shadow: "true" | "false";
}

const HeaderContainer = styled.div <{ $shadow: string }>`
  max-width: 600px;
  z-index: 3;
  position: fixed;
  width: 100%;
  height: 52px;
  display: flex;
  align-items: center;
  padding-inline: ${(props) => props.theme.sizes.contentPadding};
  padding-block: 12px;
  box-shadow: ${(props) => (props.$shadow === "true" ? "0px 0.3rem 0.3rem 0px rgba(0, 0, 0, 0.05)" : "none")};
  padding-top: 8px;
  background-color: #FFFFFF;
  justify-content:center;
  
  span{
    margin: 0 auto;
    font-size: 16px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    letter-spacing: -0.64px;

  }

  button{
    background: none;
    border: none;
    position: absolute;
    width: 100%;
    margin-right: 90%;
  }
`;

export default function Header({ children, shadow }: HeaderProps) {
  const navigate = useNavigate();
  return (
    <HeaderContainer $shadow={shadow}>
      <button type="button" onClick={() => navigate(-1)} aria-label="Go Back">
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="20" viewBox="0 0 11 20" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M0.706858 9.19451C0.316334 9.58503 0.316334 10.2182 0.706858 10.6087L9.19426 19.0961C9.58479 19.4866 10.2179 19.4866 10.6085 19.0961C10.999 18.7056 10.999 18.0724 10.6085 17.6819L2.82818 9.90162L10.6085 2.12132C10.999 1.7308 10.999 1.09763 10.6085 0.707107C10.2179 0.316582 9.58479 0.316582 9.19426 0.707107L0.706858 9.19451Z" fill="black" />
        </svg>
      </button>
      <span>{children}</span>
    </HeaderContainer>
  );
}
