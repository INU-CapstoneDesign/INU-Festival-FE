import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  z-index: 100;
  position: fixed;
  left: 50%;
  bottom: 0px;
  width: 100%;
  max-width: 600px;
  height: 8rem;
  padding-inline: 1.6rem;
  border-radius: 20px 20px 0px 0px;
  background: #FFF;
  box-shadow: 0px -3px 15px 0px rgba(1, 71, 200, 0.08);
  transform: translateX(-50%);
`;

const Nav = styled.nav`
  margin: 0px;
  padding: 0px;
  border: 0px;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.22px;
  vertical-align: baseline;
  cursor: pointer;

  ul {
    display: flex;

    li {
      width: 25%;
    }
  }

  span{
    min-width: max-content;
  }
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-block: 2rem;
  gap: 1rem;
  color: #BBC7D3;
  font-weight: 500;
  text-decoration: none;

  svg {
    width: 2.4rem;
    height: 2.4rem;
  }

  &.active {
    color: #0147C8;
  }


  &.active path {
    fill: #0147C8;
  }
`;

const color = '#BBC7D3';

export default function Navbar() {
  return (
    <Container>
      <Nav>
        <ul>
          <li>
            <StyledNavLink to="/">
              <svg
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.2274 5.75076L10.1296 0.38078C9.45849 -0.126927 8.54231 -0.126927 7.87123 0.38078L0.7734 5.75076C0.28715 6.11852 0 6.70108 0 7.32107V16.0489C0 17.1262 0.851931 18 1.90217 18H16.0978C17.1481 18 18 17.1262 18 16.0489V7.32107C18 6.70108 17.7136 6.11852 17.2274 5.75076ZM12.0452 14.8927C12.0452 15.2312 11.7779 15.5062 11.4471 15.5062H6.55368C6.22369 15.5062 5.95558 15.232 5.95558 14.8927C5.95558 14.5543 6.2229 14.2793 6.55368 14.2793H11.4471C11.7771 14.2793 12.0452 14.5535 12.0452 14.8927Z"
                  fill={color}
                />
              </svg>
              <span>홈</span>
            </StyledNavLink>
          </li>

          <li>
            <StyledNavLink to="/map">
              <svg
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.3757 18.8857L19.9144 2.14332C20.3354 0.87241 19.1319 -0.337033 17.8673 0.0860011L1.10814 5.68577C-0.379525 6.18293 -0.366033 8.30352 1.12883 8.78079L8.09315 11.0044C8.54917 11.15 8.90804 11.5079 9.05645 11.9653L11.3005 18.8776C11.7853 20.3699 13.8828 20.3753 14.3757 18.8866V18.8857ZM12.1487 7.85698C11.8366 7.54332 11.8366 7.03532 12.1487 6.72166L13.7902 5.07201C14.1023 4.75835 14.6078 4.75835 14.9199 5.07201C15.232 5.38567 15.232 5.89367 14.9199 6.20733L13.2784 7.85698C12.9663 8.17064 12.4608 8.17064 12.1487 7.85698Z"
                  fill={color}
                />
              </svg>
              <span>지도</span>
            </StyledNavLink>
          </li>

          <li>
            <StyledNavLink to="/timetable">
              <svg
                viewBox="0 0 22 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.0928 1.06323V1.58025C19.0928 2.96926 18.0607 4.16064 16.7039 4.26086C15.1911 4.37325 13.9297 3.15283 13.9297 1.6327V1.06417C13.9297 0.756954 13.6857 0.508749 13.3857 0.508749H8.64735C8.3391 0.508749 8.08865 0.764447 8.08865 1.07915V1.58118C8.08865 2.97019 7.05659 4.16158 5.69976 4.26179C4.18698 4.37419 2.92556 3.15377 2.92556 1.63363V1.07915C2.92556 0.764447 2.67512 0.508749 2.36687 0.508749H1.10087C0.49264 0.508749 0 1.01172 0 1.6327V15.8759C0 16.4969 0.49264 16.9999 1.10087 16.9999H20.8991C21.5074 16.9999 22 16.4969 22 15.8759V1.63176C22 1.01078 21.5074 0.507812 20.8991 0.507812H19.6377C19.3368 0.507812 19.0937 0.756954 19.0937 1.06323H19.0928ZM10.2748 12.5088H4.42825C4.05946 12.5088 3.73012 12.2418 3.67783 11.869C3.61269 11.4045 3.96313 11.0064 4.40532 11.0064H10.2519C10.6207 11.0064 10.95 11.2733 11.0023 11.6461C11.0674 12.1107 10.717 12.5088 10.2748 12.5088ZM18.3506 8.00266C18.3506 8.41759 18.0213 8.75383 17.6149 8.75383H4.40441C3.998 8.75383 3.66865 8.41759 3.66865 8.00266C3.66865 7.58774 3.998 7.25149 4.40441 7.25149H17.6149C18.0213 7.25149 18.3506 7.58774 18.3506 8.00266Z"
                  fill={color}
                />
              </svg>
              <span>타임테이블</span>
            </StyledNavLink>
          </li>

          <li>
            <StyledNavLink to="/guestbook">
              <svg
                viewBox="0 0 22 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.2503 0H2.74966C1.23093 0 0 1.23782 0 2.76505V11.981C0 13.5082 1.23093 14.746 2.74966 14.746H6.89705C7.19218 14.746 7.47448 14.8649 7.68162 15.0769L10.2159 17.6696C10.6467 18.1101 11.3533 18.1101 11.7841 17.6696L14.3184 15.0769C14.5255 14.8658 14.8078 14.746 15.1029 14.746H19.2503C20.7691 14.746 22 13.5082 22 11.981V2.76505C22 1.23782 20.7691 0 19.2503 0ZM10.2865 9.57536H4.4352C4.04658 9.57536 3.70745 9.28042 3.68271 8.89055C3.65521 8.46289 3.99158 8.10804 4.41045 8.10804H10.2608C10.6494 8.10804 10.9885 8.40298 11.0133 8.79285C11.0408 9.22051 10.7044 9.57536 10.2856 9.57536H10.2865ZM17.6115 5.88586H4.43611C4.0475 5.88586 3.70837 5.59093 3.68362 5.20105C3.65613 4.77339 3.9925 4.41855 4.41137 4.41855H17.5868C17.9754 4.41855 18.3145 4.71348 18.3393 5.10336C18.3668 5.53102 18.0304 5.88586 17.6115 5.88586Z"
                  fill={color}
                />
              </svg>
              <span>방명록</span>
            </StyledNavLink>
          </li>

          <li>
            <StyledNavLink to="/profile">
              <svg
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8.75 7.5C10.8211 7.5 12.5 5.82107 12.5 3.75C12.5 1.67893 10.8211 0 8.75 0C6.67893 0 5 1.67893 5 3.75C5 5.82107 6.67893 7.5 8.75 7.5Z" fill={color} />
                <path d="M7.37228 8.5H10.6277C14.6964 8.5 18 11.773 18 15.804C18 17.0161 17.0069 18 15.7834 18H2.21658C0.993086 18 0 17.0161 0 15.804C0 11.773 3.3036 8.5 7.37228 8.5Z" fill={color} />
              </svg>
              <span>프로필</span>
            </StyledNavLink>
          </li>

        </ul>
      </Nav>
    </Container>
  );
}
