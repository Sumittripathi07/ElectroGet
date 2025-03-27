import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Nav from "./Nav";

const Header = () => {
  return (
    <MainHeader>
      <NavLink to="/" className="brand-name">      {/*Whenever I click on brand name I get back to home page i.e. '/' */}
        ElectroGet
      </NavLink>
      <Nav />
    </MainHeader>
  );
};

const MainHeader = styled.header`
  padding: 0 4.8rem;
  height: 10rem;
  background-color: ${({ theme }) => theme.colors.bg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  .brand-name {
    font-size: 3.2rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.btn};
    text-transform: capitalize;
    text-decoration: none;
    transition: color 0.3s ease-in-out;
    
    &:hover {
      color: ${({ theme }) => theme.colors.heading};
    }
  }
`;
export default Header;