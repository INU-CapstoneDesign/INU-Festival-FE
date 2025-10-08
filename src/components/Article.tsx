import { styled } from "styled-components";

const Article = styled.article`
  padding-inline: ${(props) => props.theme.sizes.contentPadding};
`;

export default Article;
