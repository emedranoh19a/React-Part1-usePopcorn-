import styled from "styled-components";

export default function NumResults({ movies }) {
  return (
    <StyledNumResults>
      Found <strong>{movies.length}</strong> results
    </StyledNumResults>
  );
}

const StyledNumResults = styled.p`
  justify-self: end;
  font-size: 1.8rem;
`;
