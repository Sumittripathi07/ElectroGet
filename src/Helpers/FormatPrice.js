const FormatPrice = ({ price }) => {
  // Destructuring the props i.e. price
  return Intl.NumberFormat("en-IN", {
    // This is a built-in function in JavaScript which formats the price in Indian currency or any other currency
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(price); // price is in paisa so we divide it by 100 to get the price in rupees
};

export default FormatPrice;
