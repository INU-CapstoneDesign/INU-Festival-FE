import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import styled from "styled-components";

import Header from "../Notice/Header";
import BoothInstruction from "./BoothInstruction";
import InfoWithIcon from "./InfoWithIcon";
import Toast from "../Profile/Toast";
import BoothCommentComponent from "./BoothComment";

import boothImg from "../../types/boothImg";

import useFetchBooth from "../../hooks/useFetchBooth";
import useLikeStore from "../../hooks/useLikeStore";

const MapInfoTop = styled.div`
  margin: 0 auto;
  text-align: center;
  align-items: center;

  p {
    font-size: 13px;
    color: rgba(187, 199, 211, 1);
    font-weight: 510;
    padding-bottom: 8px;
    padding-top: 30px;
  }

  h2 {
    font-size: 18px;
    color: #0147c8;
    font-weight: 620;
    margin-bottom: 25px;
  }

  button {
    background-color: #ebf2ff;
    border: none;
    border-radius: 20px;
    padding: 10px 15px;
    flex-direction: column;
    vertical-align: middle;
    text-align: center;

    svg {
      vertical-align: middle;
    }

    span {
      vertical-align: middle;
      font-size: 12px;
      margin: 0 4px;
      font-weight: 550;
      color: black;
    }
  }
`;

const MapButtonBox = styled.div`
  display: flex;
  align-items: center;
  width: max-content;
  justify-content: space-between;
  margin: 0 auto;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.6px;

  button {
    padding: 0 4rem;
    padding-top: 30px;
    text-align: center;
    margin: 0 3rem;
    padding-bottom: 5px;
    border: none;
    background-color: #ffffff;
    cursor: pointer;
    color: #949494;
  }

  button > p {
    margin: 1.5rem 0;
  }
  .like {
    fill: #ff0000;
  }
  .unClicked {
    fill: #bbc7d3;
  }
  .shareClicked {
    fill: #0147c8;
  }
`;

const MapInfoBottom = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    flex: 1;
    border: none;
    background-color: #ffffff;
    padding: 1.3rem 6rem;
    font-weight: 700;
    font-size: 15px;
    cursor: pointer;
    color: black;
  }

  .selected {
    border-bottom: 2px solid #0147c8;
  }

  .notSelected {
    border-bottom: 2px solid #cedcea;
  }
`;

const MapImageContainer = styled.div<{ $translateImg: string }>`
  width: 800vw;
  background-color: white;
  transform: translateX(${(props) => props.$translateImg});
`;

const ImageBox = styled.div`
  img {
    width: 100vw;
    height: 100vw;
    float: left;
    max-width: 600px;
    max-height: 600px;
  }
`;

const Carousel = styled.div`
  overflow: hidden;
  position: relative;

  button {
    border: none;
  }
  margin-top: 50px;
`;

const ButtonContainer = styled.div`
  position: absolute;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 3vw;
  top: 50%;

  button {
    width: 40px;
    height: 40px;
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export default function DetailedMapPage() {
  const { id } = useParams<{ id: string }>();
  const [showInstruction, setShowInstruction] = useState<boolean>(true);
  const booth = useFetchBooth(id);
  const [, store] = useLikeStore();
  const [translateImg, setTranslateImg] = useState<string>("0");
  const [cliked, setClicked] = useState(false);
  const [shareBtnClicked, setShareBtnClicked] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!booth) {
    return null;
  }
  const {
    name,
    category,
    description,
    liked,
    boothImgs,
    boothDays,
    boothComments,
  } = booth;

  let selectedDay;
  const location = useLocation();
  if (location.state && location.state.date) {
    selectedDay = location.state.date;
  } else {
    selectedDay = boothDays && boothDays["0"].day;
  }

  const handleRightButton = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 600) {
      const newPosition = parseInt(translateImg, 10) - 600;
      const maxPosition = boothImgs.length * -600;
      setTranslateImg(() =>
        newPosition <= maxPosition ? "0" : `${newPosition}px`
      );
    } else {
      const newPosition = parseInt(translateImg, 10) - 100;
      const maxPosition = boothImgs.length * -100;
      setTranslateImg(() =>
        newPosition <= maxPosition ? "0" : `${newPosition}vw`
      );
    }
  };

  const handleLeftButton = () => {
    if (boothImgs.length <= 1) return;

    const screenWidth = window.innerWidth;
    if (screenWidth >= 600) {
      const currentPosition = parseInt(translateImg, 10);
      const newPosition = currentPosition + 600;
      const maxPosition = (boothImgs.length - 1) * -600;
      const updatedPosition =
        newPosition > 0 ? maxPosition : currentPosition + 600;
      setTranslateImg(`${updatedPosition}px`);
    } else {
      const currentPosition = parseInt(translateImg, 10);
      const newPosition = currentPosition + 100;
      const maxPosition = (boothImgs.length - 1) * -100;
      const updatedPosition =
        newPosition > 0 ? maxPosition : currentPosition + 100;
      setTranslateImg(`${updatedPosition}vw`);
    }
  };

  const [toast, setToast] = useState(false);
  const [toastText, setToastText] = useState("");
  const [likeCount, setLikeCount] = useState<number>(0);
  const [commentCount, setCommentCount] = useState<number>(
    boothComments?.length || 0
  );

  useEffect(() => {
    setCommentCount(boothComments?.length || 0);
  }, [boothComments]);

  useEffect(() => {
    if (booth && liked) {
      setLikeCount(liked);
    }
  }, [booth]);

  const handleBoothLike = (value: string) => {
    const newLikeCount = likeCount + 1;
    setLikeCount(newLikeCount);
    store.increase(value);
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 100);
  };

  const handleShare = async (url: string) => {
    const shareObject: ShareData = {
      title: "희희낙락",
      text: "즐거운 축제의 시작, 희희낙락과 함께하세요!",
      url: window.location.href,
    };
    setShareBtnClicked(true);
    setTimeout(() => {
      setShareBtnClicked(false);
    }, 100);

    try {
      if (navigator.share) {
        await navigator.share(shareObject);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setToastText("클립보드에 복사되었습니다.");
        setToast(true);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        setToastText("복사되었습니다.");
        setToast(true);
      }
    } catch {
      alert("복사에 실패했습니다.");
    }
  };

  return (
    <>
      <Header shadow="false"> </Header>
      <Carousel>
        <MapImageContainer $translateImg={translateImg}>
          {boothImgs && boothImgs.length > 0 ? (
            boothImgs.map((img: boothImg) => (
              <ImageBox key={img.id}>
                <img src={img.url} alt={img.url} />
              </ImageBox>
            ))
          ) : (
            <ImageBox>
              <img src="/PinkBoothDefault.jpeg" alt="Default" />
            </ImageBox>
          )}
        </MapImageContainer>
        {boothImgs && boothImgs.length > 1 && (
          <ButtonContainer>
            <Button className="left" type="button" onClick={handleLeftButton}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="23"
                viewBox="0 0 12 23"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.307017 11.0735C-0.0835074 11.464 -0.0835071 12.0972 0.307017 12.4877L10.1944 22.3751C10.5849 22.7656 11.2181 22.7656 11.6086 22.3751C11.9991 21.9845 11.9991 21.3514 11.6086 20.9608L2.42834 11.7806L11.6086 2.60032C11.9991 2.2098 11.9991 1.57663 11.6086 1.18611C11.2181 0.795586 10.5849 0.795586 10.1944 1.18611L0.307017 11.0735Z"
                  fill="#ffffff"
                />
              </svg>
            </Button>
            <Button className="right" type="button" onClick={handleRightButton}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="23"
                viewBox="0 0 13 23"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.3065 12.1962C12.6971 11.8056 12.6971 11.1725 12.3065 10.7819L2.60872 1.08413C2.21819 0.693609 1.58503 0.693609 1.1945 1.08413C0.80398 1.47466 0.80398 2.10782 1.1945 2.49835L10.1852 11.4891L1.1945 20.4798C0.80398 20.8703 0.80398 21.5034 1.1945 21.894C1.58503 22.2845 2.21819 22.2845 2.60872 21.894L12.3065 12.1962Z"
                  fill="#ffffff"
                />
              </svg>
            </Button>
          </ButtonContainer>
        )}
      </Carousel>
      <MapInfoTop>
        <p>{category}</p>
        <h2>{name}</h2>
        <button type="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="14"
            viewBox="0 0 16 14"
            fill="none"
          >
            <path
              d="M14.5572 1.64121C12.7348 0.00145993 9.82823 0.174949 8.06438 1.86506C8.02336 1.90424 7.95304 1.90424 7.90616 1.86506C6.13644 0.174949 3.22988 0.00145993 1.41328 1.64121C-0.403316 3.28096 -0.502936 6.1687 1.31366 7.90359L6.59352 12.946C7.36704 13.6847 8.61522 13.6847 9.38873 12.946L14.4518 8.11066L14.6627 7.90919C16.4793 6.1743 16.4442 3.34252 14.5631 1.6468L14.5572 1.64121Z"
              fill="#FF3D00"
            />
          </svg>
          <span>{likeCount}</span>
        </button>
      </MapInfoTop>
      <MapButtonBox>
        <button
          className={shareBtnClicked ? "shareClicked" : "unClicked"}
          type="button"
          onClick={() => handleShare(window.location.href)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="currnet"
          >
            <path
              d="M20.0487 15.0782C18.8702 15.0782 17.799 15.5375 17.0026 16.2864L9.38293 12.4089C9.39705 12.2627 9.40458 12.1146 9.40458 11.9646C9.40458 11.7911 9.39328 11.6213 9.37446 11.4534L16.9038 7.62114C17.7096 8.4257 18.8203 8.92372 20.0477 8.92372C22.5064 8.92372 24.5 6.926 24.5 4.46233C24.5 1.99866 22.5073 0 20.0487 0C17.59 0 15.5964 1.99772 15.5964 4.46139C15.5964 4.61607 15.6039 4.76793 15.6199 4.91884L8.05854 8.76715C7.25656 7.98428 6.16184 7.5023 4.95417 7.5023C2.49365 7.5023 0.5 9.50002 0.5 11.9637C0.5 14.4274 2.49365 16.4251 4.95229 16.4251C6.18443 16.4251 7.29892 15.9233 8.1056 15.1131L15.6359 18.9453C15.6105 19.1396 15.5954 19.3368 15.5954 19.5386C15.5954 22.0023 17.5891 24 20.0477 24C22.5064 24 24.5 22.0023 24.5 19.5386C24.5 17.0749 22.5064 15.0772 20.0477 15.0772L20.0487 15.0782Z"
              fill="current"
            />
          </svg>
          <p>공유하기</p>
        </button>
        <button
          className={cliked ? "like" : "unClicked"}
          type="button"
          onClick={() => handleBoothLike(id)}
        >
          <svg
            width="24"
            height="21"
            viewBox="0 0 24 21"
            fill="current"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.8359 1.84349C19.1022 -0.805334 14.7424 -0.525083 12.0966 2.2051C12.035 2.26839 11.9296 2.26839 11.8592 2.2051C9.20466 -0.525083 4.84482 -0.805334 2.11992 1.84349C-0.604974 4.49231 -0.754403 9.15714 1.97049 11.9596L9.89028 20.105C11.0506 21.2983 12.9228 21.2983 14.0831 20.105L21.6777 12.2941L21.9941 11.9687C24.719 9.16618 24.6662 4.59176 21.8447 1.85253L21.8359 1.84349Z"
              fill="current"
            />
          </svg>
          <p>무한 좋아요</p>
        </button>
      </MapButtonBox>
      {toast && <Toast setToast={setToast} text={toastText} />}
      <InfoWithIcon small="false" booth={booth} selectedDay={selectedDay} />
      <MapInfoBottom>
        <button
          type="button"
          className={showInstruction ? "selected" : "notSelected"}
          onClick={() => setShowInstruction(true)}
        >
          부스 소개
        </button>
        <button
          type="button"
          className={showInstruction ? "notSelected" : "selected"}
          onClick={() => setShowInstruction(false)}
        >
          댓글 ({commentCount}){" "}
        </button>
      </MapInfoBottom>
      {showInstruction ? (
        <BoothInstruction
          description={
            description ||
            "아직 부스 소개가 없어요! \n 여러분의 댓글이 소중한 정보가 될 수 있습니다!"
          }
        />
      ) : (
        <BoothCommentComponent boothId={id} setCommentCount={setCommentCount} />
      )}
    </>
  );
}
