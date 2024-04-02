import { Outlet } from 'react-router-dom';

import { styled } from 'styled-components';

import Navbar from './Main/Navbar';
import useCheckAccessToken from '../hooks/useCheckAccessToken';

import useLikeStore from '../hooks/useLikeStore';
import useUserStore from '../hooks/useUserStore';

const Container = styled.div`
  margin: auto;
  max-width: 600px;
  height: 100%;
  background: ${(props) => props.theme.colors.layoutBackground};
  
  main {
    position: relative;
    display: flex;
    flex-direction: column;
  }
`;

export default function Layout() {
  const [, store] = useLikeStore();

  if (store.liked) {
    store.boothLike();
  }

  useCheckAccessToken();
  
  return (
    <Container>
      <main>
        <Outlet />
      </main>
      <Navbar />
    </Container>
  );
}
