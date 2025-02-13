import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AppProvider } from "./context/productcontext";
import { FilterContextProvider } from "./context/filter_context";
import { CartProvider } from "./context/cart_context";
import { ClerkProvider } from "@clerk/clerk-react";
// import dotenv from "dotenv";

const root = ReactDOM.createRoot(document.getElementById("root"));

// console.log(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
let PUBLISHABLE_KEY = "pk_test_cXVpY2sta2l3aS0zMS5jbGVyay5hY2NvdW50cy5kZXYk";

root.render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <AppProvider>
      <FilterContextProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </FilterContextProvider>
    </AppProvider>
  </ClerkProvider>
);
reportWebVitals();
