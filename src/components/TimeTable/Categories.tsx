import { styled } from "styled-components";
import Category from "./Category";

const Content = styled.header`
  position: relative;
  z-index: 1;
  color: #FFFFFF;

  h1, ul, p {
    padding-block: 1rem;
  }
  h1 {
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 800;
    line-height: 15px; /* 93.75% */
    letter-spacing: -0.48px;
    margin-top: 19px;
  }
  ul {
      display: flex;
      justify-content: space-between;
      align-items: center;
  }
  p {
      font-weight: 510;
      line-height: 21px;
      text-align: center;
  }
`;

type CategoriesProps = {
    categories: string[];
    filterCategory: string;
    setFilterCatergory: (category: string) => void;
    dates: string[];
  }

export default function Categories({
  categories,
  filterCategory,
  setFilterCatergory,
  dates,
}: CategoriesProps) {
  const handleSetFilterCategory = (category: string) => {
    setFilterCatergory(category);
  };
  return (
    <Content>
      <h1>타임테이블</h1>
      <ul>
        {categories.map((category: string, index) => (
          <Category
            key={category}
            active={category === filterCategory}
            category={category}
            handleSetFilterCategory={handleSetFilterCategory}
            date={dates[index]}
          />
        ))}
      </ul>
    </Content>
  );
}
