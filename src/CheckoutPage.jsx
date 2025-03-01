import React, { useState } from "react";
import { useCartContext } from "./context/cart_context";
import { useUser, SignInButton } from "@clerk/clerk-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { cart, clearCart, total_price, shipping_fee } = useCartContext();
  const { isSignedIn, user } = useUser();
  const finalPrice = total_price + 99;
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [billingZip, setBillingZip] = useState("");
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    try {
      const orderDetails = {
        email,
        name: fullName,
        address: billingAddress,
        zip: billingZip,
        line_items: cart,
        total_price: finalPrice,
      };

      const { data: order } = await axios.post(
        "http://localhost:9000/api/razorpay/create-order",
        {
          amount: finalPrice,
          currency: "INR",
          receipt: `receipt_${Date.now()}`,
          notes: orderDetails,
        }
      );

      const options = {
        key: process.env.RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "ElectroGet",
        description: "Test Transaction",
        order_id: order.id,
        handler: async (response) => {
          const paymentDetails = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            orderDetails,
          };

          await axios.post(
            "http://localhost:9000/api/razorpay/verify-payment",
            paymentDetails
          );
          clearCart();
          alert("Payment successful and order placed!");
          navigate("/");
        },
        prefill: {
          name: fullName,
          email: email,
        },
        theme: {
          color: "#3399cc",
        },
      };

      if (window.Razorpay) {
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      } else {
        console.error("Razorpay SDK not loaded");
        alert("Failed to load payment gateway. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <>
      <div class="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32 m-3">
        <div class="px-4 pt-8">
          <p class="text-xl font-medium">Order Summary</p>
          <p class="text-gray-400">
            Check your items. And select a suitable shipping method.
          </p>
          <div class="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            {cart.map((curElem) => {
              return (
                <div class="flex flex-col rounded-lg bg-white sm:flex-row">
                  <img
                    class="m-2 h-24 w-28 rounded-md border object-cover object-center"
                    src={curElem.image}
                    alt=""
                  />
                  <div class="flex w-full flex-col px-4 py-4">
                    <span class="font-semibold text-lg">{curElem.name}</span>

                    <span class="float-right text-lg text-gray-400">
                      Qty: {curElem.amount}
                    </span>

                    <p class="text-xl font-bold">${curElem.price}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div class="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          {!isSignedIn ? (
            <div className="mt-4 flex justify-center">
              <SignInButton>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                  Sign In to Continue
                </button>
              </SignInButton>
            </div>
          ) : (
            <div class="">
              <p class="text-xl font-medium">Payment Details</p>
              <p class="text-gray-400">
                Complete your order by providing your Shipping details.
              </p>
              <label for="email" class="mt-4 mb-2 block text-xl font-medium">
                Email
              </label>
              <div class="relative">
                <input
                  type="text"
                  id="email"
                  name="email"
                  class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-xl shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="your.email@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>
              </div>
              <label
                for="card-holder"
                class="mt-4 mb-2 block text-xl font-medium"
              >
                Full Name
              </label>
              <div class="relative">
                <input
                  type="text"
                  id="card-holder"
                  name="card-holder"
                  class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-xl uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Your full name here"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                    />
                  </svg>
                </div>
              </div>

              <label
                for="billing-address"
                class="mt-4 mb-2 block text-xl font-medium"
              >
                Billing Address
              </label>
              <div class="flex flex-col sm:flex-row">
                <div class="relative flex-shrink-0 sm:w-7/12">
                  <input
                    type="text"
                    id="billing-address"
                    name="billing-address"
                    class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-xl shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Street Address"
                    value={billingAddress}
                    onChange={(e) => setBillingAddress(e.target.value)}
                  />
                  <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <img class="h-4 w-4 object-contain" alt="" />
                  </div>
                </div>

                <input
                  type="text"
                  name="billing-zip"
                  class="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-xl shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="ZIP"
                  value={billingZip}
                  onChange={(e) => setBillingZip(e.target.value)}
                />
              </div>

              <div class="mt-6 border-t border-b py-2">
                <div class="flex items-center justify-between">
                  <p class="text-xl font-medium text-gray-900">Subtotal</p>
                  <p class="font-semibold text-gray-900">
                    ₹{total_price.toLocaleString()}
                  </p>
                </div>
                <div class="flex items-center justify-between">
                  <p class="text-xl font-medium text-gray-900">Shipping</p>
                  <p class="font-semibold text-gray-900">₹199.00</p>
                </div>
              </div>
              <div class="mt-6 flex items-center justify-between">
                <p class="text-xl font-medium text-gray-900">Total</p>
                <p class="text-2xl font-semibold text-gray-900">
                  ₹{finalPrice.toLocaleString()}
                </p>
              </div>
              <button
                class="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
                onClick={handlePlaceOrder}
              >
                Place Order
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
