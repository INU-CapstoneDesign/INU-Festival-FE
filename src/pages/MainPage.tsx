import { useEffect } from "react";
import Article from "../components/Article";
import Footer from "../components/Main/Footer";
import Lineups from "../components/Main/Lineups";
import FestivalSentence from "../components/Main/FestivalSentence";
import BoothRanking from "../components/Main/BoothRanking";

export default function MainPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Lineups />
      <Article>
        <FestivalSentence />
        <BoothRanking />
        <Footer />
      </Article>
    </>
  );
}
