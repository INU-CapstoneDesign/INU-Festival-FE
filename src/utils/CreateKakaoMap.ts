export default function Kakao() {
  const { kakao } = window as any;

  const plan = (x: number, y: number, z: number) => {
    y = -y - 1;
    const limit = Math.ceil(3 / 2 ** z);
    const path = "split_map/";

    if (y >= 0 && y < limit && x >= 0 && x < limit) {
      return `${path}${z}_${y}_${x}.png`;
    }
    return "https://i1.daumcdn.net/dmaps/apis/white.png";
  };

  kakao.maps.Tileset.add(
    "PLAN",
    new kakao.maps.Tileset(512, 512, plan, "", false, 0, 2)
  );

  const node = document.getElementById("map");
  const map = new kakao.maps.Map(node, {
    projectionId: null,
    mapTypeId: kakao.maps.MapTypeId.PLAN,
    $scale: false,
    // 지도의 중심 좌표 (x, y)
    center: new kakao.maps.Coords(750, -400),
    level: 0,
  });
  return map;
}
