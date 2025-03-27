import React, { useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "./styles/Button";
import styled from "styled-components";
import FormatPrice from "./Helpers/FormatPrice";
import { usePDF } from 'react-to-pdf';

const Success = () => {
  const location = useLocation();
  const orderDetails = location.state?.orderDetails || null;
  const { toPDF, targetRef } = usePDF({filename: 'order-summary.pdf'});
  
  // Get current date and time
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const formattedTime = currentDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  
  // Generate order timestamp
  const orderTimestamp = `${formattedDate} at ${formattedTime}`;
  
  return (
    <EmptyDiv>
      <h2>Thank You for Shopping with us!</h2>
      <h3>Your order has been successfully placed</h3>
      <img className="checkout" src="images/checkout.png" alt="checkout-page" />
      
      {orderDetails && (
        <div className="order-details" ref={targetRef}>
          <h4>Order Summary</h4>
          
          <div className="order-timestamp">
            <p><span>Order Date:</span> {orderTimestamp}</p>
            <p><span>Order Status:</span> <span className="success-status">Confirmed</span></p>
          </div>
          
          <div className="order-info">
            <p><span>Order ID:</span> {orderDetails.orderId}</p>
            <p><span>Payment ID:</span> {orderDetails.paymentId}</p>
            <p><span>Name:</span> {orderDetails.name}</p>
            <p><span>Email:</span> {orderDetails.email}</p>
            <p><span>Address:</span> {orderDetails.address}</p>
            <p><span>Payment Method:</span> Razorpay</p>
            <p><span>Payment Status:</span> <span className="success-status">Successful</span></p>
          </div>
          
          <div className="order-items">
            <h5>Items Purchased</h5>
            {orderDetails.items.map((item, index) => (
              <div className="order-item" key={index}>
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-details">
                  <p className="item-name">{item.name}</p>
                  <p>Qty: {item.amount}</p>
                  <p>Price: <FormatPrice price={item.price} /></p>
                  <p>Total: <FormatPrice price={item.price * item.amount} /></p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="order-summary">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span><FormatPrice price={orderDetails.totalPrice - 99} /></span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span><FormatPrice price={99} /></span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span><FormatPrice price={orderDetails.totalPrice} /></span>
            </div>
          </div>
          
          <div className="thank-you-message">
            <p>Thank you for shopping with ElectroGet! Your order has been received and is being processed. We'll send a confirmation email shortly.</p>
            <p>For any assistance, contact our customer support at support@electroget.com</p>
          </div>
        </div>
      )}
      
      <div className="action-buttons">
        {orderDetails && (
          <Button className="download-button" onClick={() => toPDF()}>
            Download Summary
          </Button>
        )}
        <Button>
          <NavLink to="/products">Continue Shopping</NavLink>
        </Button>
      </div>
    </EmptyDiv>
  );
};

const EmptyDiv = styled.div`
  display: grid;
  place-items: center;
  margin: 5rem auto;
  width: 90%;
  max-width: 1200px;
  
  .checkout {
    width: 150px;
    margin-bottom: 2rem;
  }
  
  h2 {
    font-size: 2.5rem;
    text-transform: capitalize;
    font-weight: bold;
    font-style: italic;
    color: ${({ theme }) => theme.colors.btn};
  }
  
  h3 {
    font-size: 2rem;
    text-transform: capitalize;
    font-weight: bold;
    font-style: italic;
    color: ${({ theme }) => theme.colors.btn};
    margin-bottom: 1.5rem;
  }
  
  .order-details {
    width: 100%;
    border: 1px solid #e8e8e8;
    border-radius: 10px;
    padding: 2rem;
    margin-bottom: 2rem;
    background-color: #f9f9f9;
  }
  
  h4 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    text-align: center;
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 0.5rem;
  }

  .order-timestamp {
    background-color: #f0f0f0;
    padding: 1rem;
    border-radius: 5px;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .order-timestamp p {
    margin: 0.5rem 0;
    font-size: 1.2rem;
  }
  
  .order-info {
    margin-bottom: 2rem;
  }
  
  .order-info p {
    margin: 0.7rem 0;
    font-size: 1.2rem;
  }
  
  .order-info span,
  .order-timestamp span {
    font-weight: bold;
    display: inline-block;
    margin-right: 0.5rem;
  }

  .success-status {
    color: #2e8b57;
    font-weight: bold;
  }
  
  .order-items h5 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 0.5rem;
  }
  
  .order-item {
    display: flex;
    margin-bottom: 1.5rem;
    padding: 0.5rem;
    border-bottom: 1px solid #f0f0f0;
  }
  
  .item-image {
    width: 80px;
    height: 80px;
    margin-right: 1.5rem;
  }
  
  .item-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }
  
  .item-details {
    flex-grow: 1;
  }
  
  .item-name {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .order-summary {
    margin-top: 2rem;
    border-top: 1px solid #e0e0e0;
    padding-top: 1rem;
  }

  .summary-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
  }

  .summary-row.total {
    border-top: 1px solid #e0e0e0;
    margin-top: 0.8rem;
    padding-top: 0.8rem;
    font-size: 1.4rem;
    font-weight: bold;
  }
  
  .thank-you-message {
    margin-top: 2rem;
    padding: 1.5rem;
    border-top: 1px solid #e0e0e0;
    text-align: center;
    font-style: italic;
    color: #555;
  }

  .thank-you-message p {
    margin: 0.5rem 0;
  }

  .action-buttons {
    display: flex;
    gap: 1.5rem;
    margin-top: 1rem;
  }

  .download-button {
    background-color: #4caf50;
  }
`;

export default Success;
