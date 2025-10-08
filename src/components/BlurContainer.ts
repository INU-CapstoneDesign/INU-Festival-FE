import styled from "styled-components";

const BlurContainer = styled.div`
  max-width: 600px;
  width: 100%;
  padding-inline: ${(props) => props.theme.sizes.contentPadding};
  height: 300px;
  box-shadow: -27.5px 27.5px 27.5px 0px rgba(255, 255, 255, 0.20) inset, 27.5px -27.5px 27.5px 0px rgba(99, 99, 99, 0.20) inset;
  border-radius: 0px 0px 12px 12px;
  overflow: hidden;


  ::before {  
    position: absolute;
    content: "";
    filter: blur(20px);
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    z-index: -1;
    background-size: cover;
    background-color: #FEC0CA;
    background-image: url("LineupDefault.jpeg");
  }
`;

export default BlurContainer;
