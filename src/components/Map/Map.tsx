import { useState } from "react";

import styled from "styled-components";

import MapLayer from "./MapLayer";
import BottomSheet from "./BannerContent";
import Booth from "../../types/Booth";
import useFetchBooths from "../../hooks/useFetchBooths";

const Container = styled.div`
  max-width: 600px;
  width: 100%;
  cursor: grab;
`;

export default function Map() {
  const booths = useFetchBooths();
  const [selectedDay, setSelectedDay] = useState<string>(
    localStorage.getItem("day") || "Day 1"
  );
  const [selectedCategory, setSelectedCategory] = useState<string>(
    localStorage.getItem("category") || "비주점"
  );
  const [selectedBooth, setSelectedBooth] = useState<Booth[] | null>(null);
  const [showMarker, setShowMarker] = useState<Booth[] | null>(null);

  const filtered = booths.filter((booth) => {
    const dayCount = booth.boothDays.filter(
      (boothDay) => boothDay.day === selectedDay
    );
    return dayCount.length > 0 && booth.category === selectedCategory;
  });

  return (
    <Container>
      <MapLayer
        filteredBooths={filtered}
        selectedDay={selectedDay}
        selectedBooth={selectedBooth}
        setSelectedBooth={setSelectedBooth}
        showMarker={showMarker}
        setShowMarker={setShowMarker}
      />
      <BottomSheet
        setSelectedDay={setSelectedDay}
        selectedDay={selectedDay}
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
        booths={selectedBooth || filtered}
        setShowMarker={setShowMarker}
      />
    </Container>
  );
}
