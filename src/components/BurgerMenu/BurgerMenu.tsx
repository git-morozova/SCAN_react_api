//https://codesandbox.io/p/sandbox/strange-rhodes-gsmtxt

import React from "react";
import { StyledHamburger } from './BurgerMenu.styled.ts';

export type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

const BurgerMenu = (props: Props) => (
  <StyledHamburger open={props.open} onClick={() => props.setOpen(!props.open)}>
    <div id="app-burger-top" />
    <div id="app-burger-mid" />
    <div id="app-burger-bottom" />
  </StyledHamburger>
);

export default BurgerMenu;
