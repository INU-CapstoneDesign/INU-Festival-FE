import { styled } from "styled-components";

import Article from "../components/Article";
import Header from "../components/Notice/Header";
import NoticeItem from "../components/Notice/NoticeItem";

import useFetchNotices from "../hooks/useFetchNotice";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const NoticeList = styled.div`
  padding-top: 84px;
`;

export default function NoticePage() {
  const notices = useFetchNotices();

  return (
    <Wrapper>
      <Header shadow="true">알림 센터</Header>
      <Article>
        <NoticeList>
          {
            notices.map((notice) => (
              <NoticeItem key={notice.id} notice={notice} />
            ))
          }
        </NoticeList>
      </Article>
    </Wrapper>
  );
}
