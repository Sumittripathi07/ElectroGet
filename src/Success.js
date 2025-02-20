import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "./styles/Button";
import styled from "styled-components";

const Success = () => {
  return (
    <EmptyDiv>
      <h2>Thank You for Shopping with us!</h2>
      <h3>Your order has been successfully placed </h3>
      <img className="checkout" src="images/checkout.png" alt="checkout-page" />
      <Button>
        <NavLink to="/products">continue Shopping</NavLink>
      </Button>
    </EmptyDiv>
  );
};

const EmptyDiv = styled.div`
  display: grid;
  place-items: center;
  margin-top: 5rem;

  .checkout {
    width: 20%;
    height: 100%;
  }

  h2 {
    font-size: 2.5rem;
    text-transform: capitalize;
    font-weight: bold;
    font-style: italic;
    color: ${({ theme }) => theme.colors.btn};
  }

  h3 {
    font-size: 3rem;
    text-transform: capitalize;
    font-weight: bold;
    font-style: italic;
    color: ${({ theme }) => theme.colors.btn};
  }
`;

export default Success;
