import { styled } from 'styled-components';
import Header from '../components/Notice/Header';
import NoticeItem from '../components/Notice/NoticeItem';
import Notice from '../types/Notice';

export default function NoticePage() {
  const notices: Notice[] = [
    {
      id: '1',
      title: '알콜존 안내',
      content: '알콜존에 대해 안내 드립니다.\n\n♦︎️ 장소\n 도서관과 중앙광장 사이\n\n♦︎ 시간\n 10월 6일 18시 - 23시\n\n ♦︎ 주의사항\n 알코올존은 음식이나 주류를 제공하는 곳이 아닌 장소만 마련되어 있는 곳입니다. 테이블 및 의자를 사용한 후, 뒷정리는 스스로 해야합니다. 알코올존은 예약제가 아니며, 자리가 없을 시 사용 불가할 수 있습니다.',
      date: '2023.10.09',
      category: '공지사항',
      img: ['BOL.jpeg', 'DAMONS.png', 'BOL2.jpeg']
    },
    {
      id: '2',
      title: '축제기간 변경되는 버스 노선',
      content: '알콜존에 대해 안내 드립니다.\n\n♦︎️ 장소\n 도서관과 중앙광장 사이\n\n♦︎ 시간\n 10월 6일 18시 - 23시\n\n ♦︎ 주의사항\n 알코올존은 음식이나 주류를 제공하는 곳이 아닌 장소만 마련되어 있는 곳입니다. 테이블 및 의자를 사용한 후, 뒷정리는 스스로 해야합니다. 알코올존은 예약제가 아니며, 자리가 없을 시 사용 불가할 수 있습니다.',
      date: '2023.10.09',
      category: '공지사항',
      img: []
    },
  ];

  const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

  const NoticeList = styled.div`

  `

  return (
    <Wrapper>
      <Header>알림 센터</Header>
      <NoticeList>
        {
          notices.map((notice) => (
            <NoticeItem key={notice.id} notice={notice} />
          ))
        }
      </NoticeList>
    </Wrapper>
  );
}