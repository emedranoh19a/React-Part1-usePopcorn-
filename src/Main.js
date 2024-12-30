import styled from "styled-components"

const StyledMain = styled.main`
  margin-top: 2.4rem;
  height: calc(100vh - 7.2rem - 3 * 2.4rem);
  display: flex;
  gap: 2.4rem;
  justify-content: center;
`

export default function Main({ children }) {
  return <StyledMain>{children}</StyledMain>;
}
