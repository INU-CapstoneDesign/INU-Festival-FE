import { useEffect, useState } from "react";

import { styled } from "styled-components";
import Kakao from "../../utils/CreateKakaoMap";
import Booth from "../../types/Booth";
import BoothDay from "../../types/BoothDay";

const Container = styled.div`
  max-width: 600px;
  z-index: 200;
  width: 100%;
  position: relative;
  height: 400px;
  top: 0;
`;

type MapLayerProps = {
  filteredBooths: Booth[];
  selectedDay: string;
  selectedBooth: Booth[] | null;
  setSelectedBooth: (value: Booth[] | null) => void;
  showMarker: Booth[] | null;
  setShowMarker: (value: Booth[] | null) => void;
};

export default function MapLayer({
  filteredBooths,
  selectedDay,
  selectedBooth,
  setSelectedBooth,
  showMarker,
  setShowMarker,
}: MapLayerProps) {
  const { kakao } = window;

  const [kakaoMap, setKakaoMap] = useState(null);
  const [markers, setMarkers] = useState<[]>([]);

  useEffect(() => {
    const map = Kakao();
    setKakaoMap(map);
  }, []);

  const moveLatLng = (data) => {
    const newLatLng = new kakao.maps.Coords(data[0], data[1]);
    kakaoMap.panTo(newLatLng);
  };

  const resetMarkers = () => {
    setMarkers((prevMarkers) => {
      prevMarkers.forEach((marker) => marker.setMap(null));
      return [];
    });
    setMarkers(() => []);
  };

  const createMarkers = (booth: Booth) => {
    let uniqueMarker = false;
    booth.boothDays.forEach((boothDay: BoothDay) => {
      if (boothDay.day === selectedDay) {
        const latlang = new kakao.maps.LatLng(booth.x, booth.y);
        const imageSize = new kakao.maps.Size(25, 30.17);
        const imageOption = { offset: new kakao.maps.Point(16, 34) };

        if (
          (booth.category === "푸드트럭" || booth.category === "플리마켓") &&
          uniqueMarker
        ) {
          return;
        }
        if (
          (booth.category === "푸드트럭" || booth.category === "플리마켓") &&
          !uniqueMarker
        ) {
          uniqueMarker = true;
          moveLatLng([600, -280]);
        }

        // 카테고리별 마커 이미지 설정
        const getMarkerImage = (category: string, name: string) => {
          // 존(Zone) 카테고리는 이름으로 매칭
          if (category === "존") {
            if (name.includes("돗자리")) {
              return "/markerOrange.svg";
            }
            if (name.includes("응원")) {
              return "/markerNavy.svg";
            }
            if (name.includes("버스킹")) {
              return "/markerSkyBlue.svg";
            }
            if (name.includes("팔찌") || name.includes("굿즈")) {
              return "/markerRed.svg";
            }
            if (name.includes("클린") || name.includes("쓰레기")) {
              return "/markerGreen.svg";
            }
            if (name.includes("취식")) {
              return "/markerPurple.svg";
            }
            // 존 기본값
            return "/marker.svg";
          }

          // 일반 카테고리별 매칭
          switch (category) {
            case "비주점":
              return "/markerBlue.svg";
            case "주점":
              return "/markerYellow.svg";
            case "푸드트럭":
              return "/markerBlack.svg";
            case "플리마켓":
              return "/markerPink.svg";
            default:
              return "/marker.svg";
          }
        };

        const markerImage = new kakao.maps.MarkerImage(
          booth.markerImage
            ? `/${booth.markerImage}.svg`
            : getMarkerImage(booth.category, booth.name),
          imageSize,
          imageOption
        );

        const marker = new kakao.maps.Marker({
          position: latlang,
          title: booth.name,
          image: markerImage,
          clickable: true,
        });
        marker.setMap(null);
        marker.setMap(kakaoMap);
        setMarkers((prevMarkers) => [...prevMarkers, marker]);
        if (booth.category === "푸드트럭" || booth.category === "플리마켓")
          return;
        if (booth.category !== "푸드트럭" && booth.category !== "플리마켓") {
          moveLatLng([700, -400]);
        }

        kakao.maps.event.addListener(marker, "click", () => {
          const newMarker: Booth[] = [];
          filteredBooths.forEach((wholeBooth) => {
            if (wholeBooth.name === booth.name || wholeBooth.x === booth.x) {
              newMarker.push(wholeBooth);
            }
          });
          setSelectedBooth(newMarker);
          setMarkers((prevMarkers) => [...prevMarkers, marker]);
        });
      }
    });
  };

  useEffect(() => {
    if (!kakaoMap) return;

    kakao.maps.event.addListener(kakaoMap, "click", () => {
      setSelectedBooth(null);
      setShowMarker(null);
    });

    resetMarkers();

    const booths: Booth[] = selectedBooth || showMarker || filteredBooths;

    booths.forEach((booth) => {
      createMarkers(booth);
    });
  }, [selectedDay, showMarker, filteredBooths, kakaoMap]);

  useEffect(() => {
    setSelectedBooth(null);
    setShowMarker(null);
  }, [Object.keys(filteredBooths).join()]);

  return <Container id="map" />;
}
