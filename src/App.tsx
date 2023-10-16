import styled, { ThemeProvider } from "styled-components";

import { Reset } from "styled-reset";

import GlobalStyle from "./styles/GlobalStyle";
import defaultTheme from "./styles/defaultTheme";

import Navbar from "./components/Navbar";
import FestivalSentence from "./components/FestivalSentence";
import BoothRanking from "./components/BoothRanking";
import LineUp from "./components/LineUp";

const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  background: ${(props) => props.theme.colors.layoutBackground};
  overflow: hidden;
  `;

  const Main = styled.div`
	display: flex;
	flex-direction: column;
`
const Wrapper = styled.div`
		margin:0 auto;
`

export default function App() {
	return (
		<ThemeProvider theme={defaultTheme}>
			<Reset />
			<GlobalStyle />
			<Container>
				<Main>
					<LineUp />
					<Wrapper>
						<FestivalSentence />
						<BoothRanking />					
					</Wrapper>
					<Navbar />
				</Main>
			</Container>
		</ThemeProvider>
	);
}
