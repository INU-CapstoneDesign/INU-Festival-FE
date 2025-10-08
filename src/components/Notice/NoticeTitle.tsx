import { styled } from "styled-components";

import Notice from "../../types/Notice";

type NoticeItemProps = {
    notice: Notice;
}

const NoticeTitleBox = styled.div`
  padding-left: 1.3rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  font-style: normal;

  span{
    font-size: 13px;
    font-weight: 800;
    line-height: 100%;
    letter-spacing: -0.52px;
  }

  p{
    padding-top: 12px;
    padding-bottom: 2px;
    font-size: 16px;
    font-weight: 500;
    line-height: 21px;
    letter-spacing: -0.64px;
  }

  div{
    color: #A9A9A9;
    font-size: 13px;
    font-weight: 600;
    line-height: 21px; 
    letter-spacing: -0.52px;
  }
    `;

export default function NoticeTitle({ notice } : NoticeItemProps) {
  const { category } = notice;
  return (
    <>
      { category === "공지사항" ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
          <path d="M14 7.49969C14 6.11162 12.8415 4.97542 11.3729 4.87355V1.56243C11.3729 0.699346 10.6183 0 9.68712 0H9.61834C9.27242 0 8.93324 0.0924962 8.64262 0.266864L3.30007 3.46798H1.68577C0.754552 3.46798 0 4.16733 0 5.03042V9.41398C0 10.2771 0.754552 10.9764 1.68577 10.9764H3.30007L8.6089 14.6669C8.91976 14.8831 9.29804 15 9.68712 15C10.6183 15 11.3729 14.3007 11.3729 13.4376V10.1265C12.8422 10.0246 14 8.88838 14 7.50031V7.49969Z" fill="url(#paint0_linear_546_927)" />
          <defs>
            <linearGradient id="paint0_linear_546_927" x1="11.5294" y1="11.7857" x2="2.63923" y2="1.94585" gradientUnits="userSpaceOnUse">
              <stop stopColor="#43B7BA" />
              <stop offset="1" stopColor="#3AE197" />
            </linearGradient>
          </defs>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M12.963 9.74307V5.96108C12.963 2.66902 10.294 0 7.00062 0C3.70783 0 1.03822 2.66902 1.03822 5.96108V9.74307C0.465042 9.74307 0 10.208 0 10.7811V11.371C0 11.944 0.465042 12.409 1.03822 12.409H4.90169C5.15859 13.327 6.00054 14 7 14C7.99946 14 8.84204 13.3263 9.09831 12.409H12.9618C13.535 12.409 14 11.944 14 11.371V10.7811C14 10.208 13.535 9.74307 12.9618 9.74307H12.963Z" fill="url(#paint0_linear_546_949)" />
          <defs>
            <linearGradient id="paint0_linear_546_949" x1="15.1053" y1="12.8947" x2="0" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFC700" />
              <stop offset="1" stopColor="#FFE99D" />
            </linearGradient>
          </defs>
        </svg>
      )}
      <NoticeTitleBox>
        <span>{category}</span>
        <p>{notice.title}</p>
        <div>{notice.updatedAt.slice(0, 10)}</div>
      </NoticeTitleBox>
    </>
  );
}
