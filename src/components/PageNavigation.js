import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const PageNavigation = ({ title }) => {     //This is the title of the page
  return (
    <Wrapper>
      <NavLink to="/">Home</NavLink> / {title}              {/*This helps us navigate to page eg Home/iphone x*/}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  height: 10rem;
  background-color: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.btn};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 3.2rem;
  padding-left: 1.2rem;

  a {
    font-size: 3.2rem;
  }
`;

export default PageNavigation;