import React from "react";
import { useCartContext } from "./context/cart_context";

const CheckoutPage = () => {
  const { cart, clearCart, total_price, shipping_fee } = useCartContext();
  const finalPrice = total_price + 99;
  console.log(total_price);

  console.log(cart);

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
          <p class="text-xl font-medium">Payment Details</p>
          <p class="text-gray-400">
            Complete your order by providing your Shipping details.
          </p>
          <div class="">
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
                />
                <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <img
                    class="h-4 w-4 object-contain"
                    src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxEHBhEQEhQQEBASFRMYEhYREBARFRYQGBgZIhgRHxYZHigsGCMlHx0WLTUtJSkrLjouGCEzOT84NywuMSwBCgoKDg0OGhAQGi0fIB8tLS0tLi0tNy0tKy0tLSstLS0rKy03LS4tLS0tLS0tMC0tLyswLS0rLS0tLy0tLS0tLf/AABEIALcBEwMBEQACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABAYCAwUHAf/EAD4QAAEDAgMFBQQIBgEFAAAAAAEAAgMEEQUSIQYWMVHSEyJBkpMyVJHTBxUjM1JTcYEUQkNh0fCCF2JyobH/xAAaAQEAAwEBAQAAAAAAAAAAAAAAAQIEAwUG/8QALhEBAAECBQIGAgICAwEAAAAAAAECAxEVUaHREpETFCExQVIEYXGxgfAzwfEi/9oADAMBAAIRAxEAPwCyL5B9cICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIO1utUc4fPJ0L0csvax3nh5+Z2dJ25N1qjnD55OhMsvax3ngzOzpO3JutUc4fPJ0Jll7WO88GZ2dJ25N1qjnD55OhMsvax3ngzOzpO3JutUc4fPJ0Jll7WO88GZ2dJ25N1qjnD55OhMsvax3ngzOzpO3JutUc4fPJ0Jll7WO88GZ2dJ25N1qjnD55OhMsvax3ngzOzpO3JutUc4fPJ0Jll7WO88GZ2dJ25N1qjnD55OhMsvax3ngzOzpO3JutUc4fPJ0Jll7WO88GZ2dJ25N1qjnD55OhMsvax3ngzOzpO3JutUc4fPJ0Jll7WO88GZ2dJ25N1qjnD55OhMsvax3ngzOzpO3JutUc4fPJ0Jll7WO88GZ2dJ25N1qjnD55OhMsvax3ngzOzp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"
                    alt=""
                  />
                </div>
              </div>

              <input
                type="text"
                name="billing-zip"
                class="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-xl shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="ZIP"
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
          </div>
          <button class="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">
            Place Order
          </button>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
