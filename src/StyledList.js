import styled from "styled-components";

const StyledList = styled.ul`
  list-style: none;
  padding: 0.8rem 0;
  overflow: scroll;

  & li {
    position: relative;
    display: grid;
    grid-template-columns: 4rem 1fr;
    grid-template-rows: auto auto;
    column-gap: 2.4rem;
    font-size: 1.6rem;
    align-items: center;

    padding: 1.6rem 3.2rem;
    border-bottom: 1px solid var(--color-background-100);
  }

  & img {
    width: 100%;
    grid-row: 1 / -1;
  }

  & h3 {
    font-size: 1.8rem;
  }

  & div {
    display: flex;
    align-items: center;
    gap: 2.4rem;
  }

  & p {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }
`;

export default StyledList;
