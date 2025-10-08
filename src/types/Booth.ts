import BoothDay from "./BoothDay";
import boothImg from "./boothImg";
import BoothComment from "./BoothComment";

interface Booth {
    id: string;
    name: string;
    category: string;
    department: string;
    description: string;
    liked: number;
    markerImage: string;
    boothDays: BoothDay[];
    boothImgs: boothImg[];
    boothComments: BoothComment[];
    time: string;
    location: string;
    x: string;
    y: string;
  }

export default Booth;
