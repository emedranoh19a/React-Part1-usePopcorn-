import styled from "styled-components"

const StyledNavBar= styled.nav`
display: grid;
grid-template-columns: 1fr 1fr 1fr;
align-items: center;
height: 7.2rem;
padding: 0 3.2rem;
background-color: var(--color-primary);
border-radius: 0.9rem;
` 

export default function NavBar({ children }) {
  return <StyledNavBar 
  >{children}</StyledNavBar>;
}
