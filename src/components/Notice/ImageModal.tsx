import styled from "styled-components";

const ModalBox = styled.div`
    z-index: 300;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.8);
    align-items: center;

    button{
        background: none;
        border: none;
        padding: 15px;
        float: right;
        cursor: pointer;
    }
`;

const ImageBox = styled.img`
    width: 100%;
    object-fit: contain;
    max-height: 50%;
    position : sticky;
    align-items: center;
    top: 50%;
    transform: translateY(-50%);
    margin-bottom: 26.25px;
`;
type ImageModalProps = {
    img: string,
    setModal: React.Dispatch<React.SetStateAction<boolean>>
}
export default function ImageModal({ img, setModal }: ImageModalProps) {
  function handleCloseButton() {
    setModal(false);
  }

  return (
    <ModalBox>
      <button type="button" onClick={handleCloseButton} aria-label="닫기버튼">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M1.70736 0.884202C1.31683 0.493678 0.683669 0.493678 0.293145 0.884202C-0.0973793 1.27473 -0.0973793 1.90789 0.293145 2.29842L7.58625 9.59152L0.292893 16.8849C-0.0976311 17.2754 -0.0976311 17.9086 0.292893 18.2991C0.683418 18.6896 1.31658 18.6896 1.70711 18.2991L9.00047 11.0057L16.2425 18.2478C16.633 18.6383 17.2662 18.6383 17.6567 18.2478C18.0472 17.8572 18.0472 17.2241 17.6567 16.8335L10.4147 9.59152L17.6564 2.34976C18.047 1.95923 18.047 1.32607 17.6564 0.935543C17.2659 0.545019 16.6328 0.545019 16.2422 0.935543L9.00047 8.17731L1.70736 0.884202Z" fill="white" />
        </svg>
      </button>
      <ImageBox src={img} />
    </ModalBox>
  );
}
