import styled from "styled-components";

export default function ErrorMessage({ message }) {
  return (
    <Error>
      <span>🚨</span>
      {message}
    </Error>
  );
}

const Error = styled.div`
  text-align: center;
  font-size: 2rem;
  padding: 4.8rem;
`;
