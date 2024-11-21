import styled from "styled-components";

export const colors = {
  main: "#029491",
  white: "#ffffff"
};

export const StyledHamburger = styled.button<{ open: boolean }>`
       ${({ open }) =>
      open ? "position:fixed" : "margin-right: 15px;"};
  right:4vw;
  top: 6vw;
  @media (max-width: 380px) {
    top: 12vw;
margin-right: 15px;
  }
  width: 1rem;
  height: 2rem;
      
  padding: 0;
  background: transparent;

  display: flex;
  flex-direction: column;
  justify-content: space-around;

  border: none;
  cursor: pointer;
  outline: none;
  z-index: 20;

  div {
    position: relative;
    width: 2rem;
    height: 0.3rem;
    border-radius: 1px;
    transition: all 0.3s linear;
    transform-origin: 1px;
    background-color: ${({ open }) =>
      open ? colors.white : colors.main};

  }
    
  #app-burger-top {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
    }

  #app-burger-mid {
      opacity: ${({ open }) => (open ? "0" : "1")};
      transform: ${({ open }) => (open ? "translateX(20px)" : "translateX(0)")};
    }

  #app-burger-bottom {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
    }
`;
