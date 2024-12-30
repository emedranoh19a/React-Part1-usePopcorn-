import { useState } from "react";
import styled from "styled-components";

const StyledBox = styled.div`
  width: 42rem;
  max-width: 42rem;
  background-color: var(--color-background-500);
  border-radius: 0.9rem;
  overflow: scroll;
  position: relative;
`;

const StyledButton = styled.button`
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;
  height: 2.4rem;
  aspect-ratio: 1;
  border-radius: 50%;
  border: none;
  background-color: var(--color-background-900);
  color: var(--color-text);
  font-size: 1.4rem;
  font-weight: bold;
  cursor: pointer;
  z-index: 999;
`;

export default function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <StyledBox>
      <StyledButton onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </StyledButton>
      {isOpen && children}
    </StyledBox>
  );
}
