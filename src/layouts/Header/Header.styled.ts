import styled from "styled-components";
export const colors = {
  bright: "#FFB64F",
  main: "#029491",
  white: "#ffffff"
};

export const StyledMenu = styled.nav<{ open: boolean }>`
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  position: fixed;
  background-color: ${colors.main};
  z-index: 20;

  display: flex;
  flex-direction: column;
  padding: 2.3rem 1.1rem;

  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const StyledLink = styled.a`

  color: ${colors.white};
  text-decoration: none;

`;
