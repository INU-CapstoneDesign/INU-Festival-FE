import { css, styled } from "styled-components";

type ButtonProps = {
    $active: boolean;
  }

const Date = styled.p`
  font-size: 13px;
  font-style: normal;
  font-weight: 510;
  line-height: 21px;
  letter-spacing: -0.52px;
`;

const Button = styled.button<ButtonProps>`
    width: 104px;
    height: 37px;;
    border-radius: 20px;
    border: 0;
    background: transparent;
    color: #FFFFFF;
    cursor: pointer;
    font-size: 13px;
    font-weight: 510;
    line-height: 21px;
    letter-spacing: -0.52px;

    ${(props) => props.$active && css`
      background: #FFFFFF;
      color: #000;
      transition: .3s;
    `};
`;

type CategoryProps = {
    active: boolean;
    category: string;
    handleSetFilterCategory: (category: string) => void;
    date: string;
  }

export default function Category({
  active,
  category, handleSetFilterCategory,
  date,
}: CategoryProps) {
  return (
    <li key={category}>
      <Date>{date}</Date>
      <Button
        type="button"
        $active={active}
        onClick={() => handleSetFilterCategory(category)}
      >
        Day
        {" "}
        {category[category.length - 1]}
      </Button>
    </li>
  );
}
