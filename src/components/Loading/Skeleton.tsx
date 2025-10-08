import { styled } from "styled-components";

type SkeletonBoxProps = {
  $width: number;
  $height: number;
  $radius: number;
}

const Skeleton = {
  SkeletonBox: styled.div<SkeletonBoxProps>`
    position: relative;
    overflow: hidden;
    background-color: ${(props) => props.theme.colors.skeletonBackground};
    width: ${(props) => props.$width}px;
    height: ${(props) => props.$height}px;
    border-radius: ${(props) => props.$radius}px;
    animation: 1s linear infinite alternate slidein;

    @keyframes slidein {
      50% {
        background-color: #dbdbdb;

      }
      100% {
        background-color: #bcbcbc;
      }
    }
`,
};

export default Skeleton;
