import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const CartAmountToggle = ({ amount, setDecrease, setIncrease }) => {
  return (
    <div className="cart-button">
      <div className="amount-toggle">
        <button onClick={() => setDecrease()}>      {/*This button is used to decrease the amount of product*/}
          <FaMinus />
        </button>
        <div className="amount-style">{amount}</div>    {/*Displays the amount of product we have added in our cart*/}
        <button onClick={() => setIncrease()}>          {/*This button is used to increase the amount of product*/}
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default CartAmountToggle;