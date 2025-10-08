import { styled } from "styled-components";

import Skeleton from "./Skeleton";

const SkeletonItem = styled.li`
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  height: 100%;
  padding-left: 35px;

`;

const SkeletonImg = styled(Skeleton.SkeletonBox)`
    background-color: ${(props) => props.theme.colors.skeletonBackground};
    margin-right: 10px;
`;

const SkeletonInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const SkeletonName = styled(Skeleton.SkeletonBox)`
    height: 15px;
    margin-top: 2.5px;
`;

const SkeletonContent = styled(Skeleton.SkeletonBox)`
    height: 17px;
    border-radius: 10px;
    margin-top: 2.5px;
`;

export default function SkeletonBoothRanking() {
  return (
    <SkeletonItem>
      <SkeletonImg
        $width={70}
        $height={50}
        $radius={100}
      />
      <SkeletonInfo>
        <SkeletonName
          $width={60}
          $height={15}
          $radius={10}
        />
        <SkeletonContent
          $width={200}
          $height={17}
          $radius={10}
        />
      </SkeletonInfo>
    </SkeletonItem>
  );
}
