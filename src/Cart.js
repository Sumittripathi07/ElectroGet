import styled from "styled-components";
import { useCartContext } from "./context/cart_context";
import CartItem from "./components/CartItem";
import { NavLink } from "react-router-dom";
import { Button } from "./styles/Button";
import FormatPrice from "./Helpers/FormatPrice";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { useUser } from "@clerk/clerk-react";

const Cart = () => {
  const { cart, clearCart, total_price, shipping_fee } = useCartContext();
  const { isSignedIn, user, isLoaded } = useUser();

  // const { isAuthenticated, user } = useAuth0();
  const [address, setAddress] = useState({
    name: "",
    flatNumber: "",
    landmark: "",
    state: "",
    district: "",
    pincode: "",
  });

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  // const handelCheckout = (e) => {
  //   e.preventDefault();
  //   console.log(address);
  // };

  // async function handelCheckout(e) {
  //   e.preventDefault();
  //   console.log(address);

  //   const AMOUNT = shipping_fee + total_price;
  //   try {
  //     console.log("01");

  //     const response = await fetch("/api/razorpayCheckout", {
  //       headers: { "Content-Type": "application/json" },
  //       method: "POST",
  //       body: JSON.stringify({ total: total }),
  //     });
  //     const data = await response.json();
  //     console.log("02");

  //     const options = {
  //       key: process.env.RAZORPAY_KEY_ID,
  //       amount: AMOUNT * 100,
  //       currency: "INR",
  //       name: "Eyeware Ecommerce",
  //       description: "Test",
  //       order_id: data.orderId,
  //       handler: async function (res) {
  //         console.log("Payment Successful", res);
  //         setPaymentDetail(res);

  //         const response = await axios.post("/api/checkout", {
  //           name,
  //           email,
  //           address,
  //           country,
  //           zip,
  //           city,
  //           cartProducts,
  //         });

  //         if (response) {
  //           // window.location = response.data.url
  //           toast.success("Order placed successfully");
  //           setIsSuccess(true);
  //           clearCart();
  //         } else {
  //           toast.error("An error occured!!");
  //         }
  //       },
  //       prefill: {
  //         name: "SUMIT TRIPATHI",
  //         email: "sumit@gmail.com",
  //         contact: "999999999",
  //       },
  //       theme: {
  //         color: "#3399c",
  //       },
  //     };

  //     const rzp1 = new window.Razorpay(options);
  //     rzp1.open();
  //   } catch (error) {
  //     console.error("Payment Faield", error);
  //   } finally {
  //     setIsProcessing(false);
  //   }
  // }

  if (cart.length === 0) {
    //when your cart is empty return "NO ITEMS IN CART"
    return (
      <EmptyDiv>
        <h3>Oops! No item in cart </h3>
        <img
          className="empty-cart"
          src="images/empty-cart.png"
          alt="empty-cart"
        />
        <Button>
          <NavLink to="/products">continue Shopping</NavLink>
        </Button>
      </EmptyDiv>
    );
  }

  return (
    <Wrapper>
      <div className="container">
        {isSignedIn && (
          <div className="cart-user--profile">
            <img src={user.imageUrl} alt={user.firstName} />
            <h2 className="cart-user--name">
              {user.firstName}&nbsp;
              {user.lastName}
            </h2>
          </div>
        )}
        <div className="grid cart_heading grid-five-column">
          <p>Item</p>
          <p className="cart-hide">Price</p>
          <p>Quantity</p>
          <p className="cart-hide">Subtotal</p>
          <p>Remove</p>
        </div>
        <hr />

        <div className="cart-item">
          {cart.map((curElem) => {
            return <CartItem key={curElem.id} {...curElem} />;
          })}
        </div>

        <hr />

        <div className="cart-three-button">
          <NavLink to="/products">
            <Button> continue Shopping </Button>
          </NavLink>
          <NavLink to="/checkout">
            <Button className="btn btn-checkout">Checkout</Button>
          </NavLink>

          <Button className="btn btn-clear" onClick={clearCart}>
            clear cart
          </Button>
        </div>

        {/* order total_amount  */}
        <div className="order-total--amount">
          <div className="order-total--subdata">
            <div>
              <p>subtotal:</p>
              <p>
                <FormatPrice price={total_price} />{" "}
                {/* display subtotal of all the products in cart */}
              </p>
            </div>
            <div>
              <p>shipping fee:</p>
              <p>
                <FormatPrice price={shipping_fee} />{" "}
                {/* display shipping fee of all the products in cart */}
              </p>
            </div>
            <hr />
            <div>
              <p>order total:</p>
              <p>
                <FormatPrice price={shipping_fee + total_price} />{" "}
                {/* display total price of all the products in cart */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const EmptyDiv = styled.div`
  display: grid;
  place-items: center;
  height: 50vh;

  h3 {
    font-size: 4.2rem;
    text-transform: capitalize;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.btn};
  }
`;

const Wrapper = styled.section`
  padding: 9rem 0;

  .grid-four-column {
    grid-template-columns: repeat(4, 1fr);
  }

  .grid-five-column {
    grid-template-columns: repeat(4, 1fr) 0.3fr;
    text-align: center;
    align-items: center;
  }
  .cart-heading {
    text-align: center;
    text-transform: uppercase;
  }
  hr {
    margin-top: 1rem;
    text-align: center;
    justify-content: center;
  }
  .cart-item {
    padding: 3.2rem 0;
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
  }

  .cart-user--profile {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1.2rem;
    margin-bottom: 5.4rem;

    img {
      width: 8rem;
      height: 8rem;
      border-radius: 50%;
    }
    h2 {
      font-size: 2.4rem;
    }
  }
  .cart-user--name {
    text-transform: capitalize;
    color: ${({ theme }) => theme.colors.btn};
  }
  .cart-image--name {
    /* background-color: red; */
    align-items: center;
    display: grid;
    gap: 1rem;
    grid-template-columns: 0.4fr 1fr;
    text-transform: capitalize;
    text-align: left;
    img {
      max-width: 5rem;
      height: 5rem;
      object-fit: contain;
      color: transparent;
    }

    .color-div {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 1rem;

      .color-style {
        width: 1.4rem;
        height: 1.4rem;

        border-radius: 50%;
      }
    }
  }

  .cart-three-button {
    margin-top: 2rem;
    display: flex;
    justify-content: space-between;

    .btn-checkout {
      float: left;
      margin-right: 65rem;
    }

    .btn-clear {
      background-color: #e74c3c;
    }
  }

  .amount-toggle {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2.4rem;
    font-size: 1.4rem;

    button {
      border: none;
      background-color: #fff;
      cursor: pointer;
    }

    .amount-style {
      font-size: 2.4rem;
      color: ${({ theme }) => theme.colors.btn};
    }
  }

  .remove_icon {
    font-size: 1.6rem;
    color: #e74c3c;
    cursor: pointer;
  }

  .order-total--amount {
    width: 100%;
    margin: 4.8rem 0;
    text-transform: capitalize;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;

    .order-total--subdata {
      border: 0.1rem solid #f0f0f0;
      display: flex;
      flex-direction: column;
      gap: 1.8rem;
      padding: 3.2rem;
    }
    div {
      display: flex;
      gap: 3.2rem;
      justify-content: space-between;
    }

    div:last-child {
      background-color: #fafafa;
    }

    div p:last-child {
      font-weight: bold;
      color: ${({ theme }) => theme.colors.heading};
    }
  }

  .address-input {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f0f8ff; /* Light blue background */
    color: #000; /* Black text */
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid-five-column {
      grid-template-columns: 1.5fr 1fr 0.5fr;
    }
    .cart-hide {
      display: none;
    }

    .cart-two-button {
      margin-top: 2rem;
      display: flex;
      justify-content: space-between;
      gap: 2.2rem;
    }

    .order-total--amount {
      width: 100%;
      text-transform: capitalize;
      justify-content: flex-start;
      align-items: flex-start;

      .order-total--subdata {
        width: 100%;
        border: 0.1rem solid #f0f0f0;
        display: flex;
        flex-direction: column;
        gap: 1.8rem;
        padding: 3.2rem;
      }
    }
  }
`;

export default Cart;
