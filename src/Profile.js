import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { useUser, SignInButton, useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Container } from "./styles/Container";
import { Button } from "./styles/Button";
import FormatPrice from "./Helpers/FormatPrice";

const Profile = () => {
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isSignedIn) {
      return;
    }

    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`http://localhost:9000/api/razorpay/user-orders/${user.primaryEmailAddress.emailAddress}`);
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to fetch your orders. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [isSignedIn, user]);

  // Function to get appropriate status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case 'processing':
        return '#f59e0b'; // Amber
      case 'shipped':
        return '#3b82f6'; // Blue
      case 'delivered':
        return '#10b981'; // Green
      case 'cancelled':
        return '#ef4444'; // Red
      default:
        return '#6b7280'; // Gray
    }
  };

  // Format the date to be more readable
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (!isSignedIn) {
    return (
      <Wrapper>
        <Container>
          <div className="sign-in-container">
            <h2>Please sign in to view your profile</h2>
            <SignInButton>
              <Button>Sign In</Button>
            </SignInButton>
          </div>
        </Container>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Container>
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-info">
              <img className="profile-image" src={user.imageUrl} alt={user.firstName} />
              <div className="user-details">
                <h2>Welcome, {user.firstName} {user.lastName}</h2>
                <p className="email">{user.primaryEmailAddress.emailAddress}</p>
                <div className="actions">
                  <Button onClick={() => signOut(() => navigate("/"))}>Sign Out</Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="orders-section">
            <h3>Your Orders</h3>
            
            {isLoading && <div className="loading">Loading your orders...</div>}
            {error && <div className="error">{error}</div>}
            
            {!isLoading && orders.length === 0 && (
              <div className="empty-orders">
                <p>You haven't placed any orders yet.</p>
                <NavLink to="/products">
                  <Button>Start Shopping</Button>
                </NavLink>
              </div>
            )}
            
            {!isLoading && orders.length > 0 && (
              <div className="orders-container">
                {orders.map((order) => (
                  <div className="order-card" key={order._id}>
                    <div className="order-header">
                      <div className="order-info">
                        <p className="order-id">
                          <span>Order ID:</span> {order._id}
                        </p>
                        <p className="order-date">
                          <span>Ordered on:</span> {formatDate(order.createdAt)}
                        </p>
                      </div>
                      <div className="order-status" style={{ backgroundColor: getStatusColor(order.status) }}>
                        {order.status || 'processing'}
                      </div>
                    </div>
                    
                    <div className="order-delivery">
                      <p>
                        <span>Shipping Address:</span> {order.address}, {order.zip}
                      </p>
                    </div>
                    
                    <div className="order-items">
                      <h4>Items:</h4>
                      <div className="items-container">
                        {Array.isArray(order.line_items) ? (
                          order.line_items.map((item, index) => (
                            <div className="item" key={index}>
                              <div className="item-image">
                                <img src={item.image} alt={item.name} />
                              </div>
                              <div className="item-details">
                                <p className="item-name">{item.name}</p>
                                <p className="item-color">Color: {item.color}</p>
                                <p className="item-quantity">Qty: {item.amount}</p>
                                <p className="item-price"><FormatPrice price={item.price} /></p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p>Order details not available</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="order-footer">
                      <div className="order-total">
                        <span>Total:</span> <FormatPrice price={order.total_price} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 5rem 0;
  background-color: ${({ theme }) => theme.colors.bg};

  .profile-container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }

  .profile-header {
    background-color: white;
    border-radius: 8px;
    padding: 2rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
  }

  .profile-info {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .profile-image {
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
    object-fit: cover;
  }

  .user-details {
    flex: 1;

    h2 {
      font-size: 2.4rem;
      margin-bottom: 0.5rem;
      color: ${({ theme }) => theme.colors.heading};
    }

    .email {
      font-size: 1.6rem;
      color: ${({ theme }) => theme.colors.text};
      margin-bottom: 1.5rem;
    }
  }

  .sign-in-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    min-height: 40vh;
    padding: 2rem;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    h2 {
      font-size: 2.4rem;
      margin-bottom: 2rem;
      color: ${({ theme }) => theme.colors.heading};
    }
  }

  .orders-section {
    h3 {
      font-size: 2.2rem;
      margin-bottom: 2rem;
      color: ${({ theme }) => theme.colors.heading};
    }

    .loading, .error, .empty-orders {
      text-align: center;
      padding: 2rem;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .error {
      color: #ef4444;
    }

    .empty-orders {
      p {
        font-size: 1.8rem;
        margin-bottom: 2rem;
        color: ${({ theme }) => theme.colors.text};
      }
    }
  }

  .orders-container {
    display: grid;
    gap: 2rem;
  }

  .order-card {
    background-color: white;
    border-radius: 8px;
    padding: 2rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .order-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};

    .order-info {
      p {
        font-size: 1.6rem;
        margin-bottom: 0.5rem;
        color: ${({ theme }) => theme.colors.text};

        span {
          font-weight: bold;
          color: ${({ theme }) => theme.colors.heading};
        }
      }
    }

    .order-status {
      padding: 0.5rem 1rem;
      border-radius: 4px;
      color: white;
      font-size: 1.4rem;
      text-transform: capitalize;
      font-weight: 500;
    }
  }

  .order-delivery {
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};

    p {
      font-size: 1.6rem;
      color: ${({ theme }) => theme.colors.text};

      span {
        font-weight: bold;
        color: ${({ theme }) => theme.colors.heading};
      }
    }
  }

  .order-items {
    h4 {
      font-size: 1.8rem;
      margin-bottom: 1.5rem;
      color: ${({ theme }) => theme.colors.heading};
    }
  }

  .items-container {
    display: grid;
    gap: 1.5rem;
    
    @media (min-width: ${({ theme }) => theme.media.tab}) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .item {
    display: flex;
    gap: 1.5rem;
    padding: 1rem;
    background-color: ${({ theme }) => theme.colors.bg};
    border-radius: 6px;
  }

  .item-image {
    width: 8rem;
    height: 8rem;
    flex-shrink: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 4px;
    }
  }

  .item-details {
    flex: 1;

    p {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
      color: ${({ theme }) => theme.colors.text};
    }

    .item-name {
      font-weight: bold;
      color: ${({ theme }) => theme.colors.heading};
    }
  }

  .order-footer {
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    display: flex;
    justify-content: flex-end;

    .order-total {
      font-size: 1.8rem;
      font-weight: bold;
      color: ${({ theme }) => theme.colors.heading};

      span {
        margin-right: 0.5rem;
      }
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .profile-info {
      flex-direction: column;
      text-align: center;
    }

    .order-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }

    .order-status {
      align-self: flex-start;
    }
  }
`;

export default Profile;