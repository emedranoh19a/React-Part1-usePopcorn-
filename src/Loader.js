import styled from "styled-components";

const StyledLoader = styled`
  text-align: center;
  text-transform: uppercase;
  font-size: 2rem;
  font-weight: 600;
  margin: 4.8rem;
`;
export default function Loader() {
  return <StyledLoader>Loading...</StyledLoader>;
}
