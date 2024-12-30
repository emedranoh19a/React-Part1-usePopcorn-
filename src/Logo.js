import styled from "styled-components";

const StyledLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  & span {
    font-size: 3.2rem;
  }
  & h1 {
    font-size: 2.4rem;
    font-weight: 600;
    color: #fff;
  }
`;

export default function Logo() {
  return (
    <StyledLogo>
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </StyledLogo>
  );
}
