import React from "react";
import FormatPrice from "../Helpers/FormatPrice";
import CartAmountToggle from "./CartAmountToggle";
import { FaTrash } from "react-icons/fa";
import { useCartContext } from "../context/cart_context";

//destructuring the props
const CartItem = ({ id, name, image, color, price, amount }) => {
  const { removeItem, setDecrease, setIncrement } = useCartContext();
  // const setDecrease = () => {
  //   // amount > 1 ? setAmount(amount - 1) : setAmount(1);
  // };

  // const setIncrease = () => {
  //   // amount < stock ? setAmount(amount + 1) : setAmount(stock);
  // };

  return (
    <div className="cart_heading grid grid-five-column">
      <div className="cart-image--name">
        <div>
          <figure>
            <img src={image} alt={id} />      {/*displaying image in cart item*/}
          </figure>
        </div>
        <div>
          <p>{name}</p>                     {/*displaying name of product in cart item*/}
          <div className="color-div">
            <p>color:</p>                     {/*displaying colour of product in cart item*/}
            <div
              className="color-style"         
              style={{ backgroundColor: color, color: color }}></div>  
          </div>
        </div>
      </div>
      {/* price   */}
      <div className="cart-hide">     {/*displaying price of product in cart item*/}
        <p>
          <FormatPrice price={price} />
        </p>
      </div>

      {/* Quantity  */}           {/*displaying amount in cart item*/}
      <CartAmountToggle
        amount={amount}
        setDecrease={() => setDecrease(id)}
        setIncrease={() => setIncrement(id)}
      />

      {/* //Subtotal */}            {/*displaying subtotal that is total price of a product in cart item*/}
      <div className="cart-hide">
        <p>
          <FormatPrice price={price * amount} />
        </p>
      </div>

      {/*removes the cart item*/}
      <div>
        <FaTrash className="remove_icon" onClick={() => removeItem(id)} />      {/*removing the cart item with its specific personal id where id is combination of id+color*/}
      </div>
    </div>
  );
};

export default CartItem;