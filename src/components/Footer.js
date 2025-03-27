import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Button } from "../styles/Button";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [subscribeError, setSubscribeError] = useState("");
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);

  const handleSubscribeChange = (e) => {
    setSubscribeEmail(e.target.value);
    setSubscribeError("");
    setSubscribeSuccess(false);
  };

  const handleSubscribeSubmit = (e) => {
    e.preventDefault();
    
    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!subscribeEmail.trim()) {
      setSubscribeError("Email is required");
      return;
    } else if (!emailRegex.test(subscribeEmail)) {
      setSubscribeError("Please enter a valid email");
      return;
    }

    // Here you would typically handle the subscription logic
    // For now, we'll just show a success message
    setSubscribeSuccess(true);
    setSubscribeEmail("");
  };

  return (
    <>
      <Wrapper>
        <section className="contact-short">
          <div className="grid grid-two-column">
            <div>
              <h3>Get in touch</h3>
              <p>Feel free to contact us anytime.</p>
            </div>
            <div>
              <Button>
                <NavLink to="/contact">Contact Us</NavLink>
              </Button>
            </div>
          </div>
        </section>

        {/*Main Footer*/}
        <footer>
          {/*About us column of footer*/}
          <div className="container grid grid-five-column-footer">
            <div className="footer-about">
              <h3>About Us</h3>
              <p>
                We believe that technology should be a seamless part of your
                life.
              </p>
              <NavLink to="/about">
                <input className="footer-btn" type="submit" value="Read More" />
              </NavLink>
            </div>

            {/*Subsribe us column of footer*/}
            <div className="footer-subscribe">
              <h3>Subscribe to get important updates</h3>
              <form onSubmit={handleSubscribeSubmit}>
                <div className="subscribe-input-container">
                  <input 
                    type="email" 
                    placeholder="Email address" 
                    value={subscribeEmail}
                    onChange={handleSubscribeChange}
                    className={subscribeError ? "error" : ""}
                  />
                  {subscribeError && <div className="error-message">{subscribeError}</div>}
                  {subscribeSuccess && <div className="success-message">Thank you for subscribing!</div>}
                </div>
                <input 
                  className="footer-btn" 
                  type="submit" 
                  value="Subscribe" 
                />
              </form>
            </div>

            {/*Quick Links column of footer*/}
            <div className="footer-quick-links">
              <h3>Quick Links</h3>
              <ul>
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/about">About</NavLink>
                </li>
                <li>
                  <NavLink to="/products">Products</NavLink>
                </li>
                <li>
                  <NavLink to="/contact">Contact</NavLink>
                </li>
              </ul>
            </div>

            {/*Social Media column of footer*/}
            <div className="footer-social">
              <h3>Social Media</h3>
              <div className="footer-social--icons">
                {/*Add <a> tag here to make the icon links work eg.
                        <div>
                        <a href='https://www.instagram.com/' target='_blank'>
                        <FaInstagram className='icons' />
                        </div>
                    
                    */}
                <div>
                  <FaInstagram className="icons" />
                </div>
                <div>
                  <FaTwitter className="icons" />
                </div>
                <div>
                  <FaLinkedin className="icons" />
                </div>
                <div>
                  <FaFacebook className="icons" />
                </div>
              </div>
            </div>
            <div className="footer-contact">
              <h3>Call Us</h3>
              <div>
                <a href="tel:+911234567890">Phone: +91 1234567890</a>
              </div>
              <br></br>
              <div>
                <a href="mailto: ElectroGet@gmail.com">
                  Email: ElectroGet@gmail.com
                </a>
              </div>
            </div>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <div className="footer-bottom--section">
            <hr />
            <div className="container grid grid-three-column ">
              <p className="bottom-footer-text">
                @{new Date().getFullYear()} ElectroGet. All Rights Reserved
              </p>
              <div>
                <p>
                  Designed by:{" "}
                  <a
                    className="bottom-footer-text"
                    href="https://www.linkedin.com/in/sumittripathi07/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    SUMIT TRIPATHI
                  </a>{" "}
                </p>
              </div>

              <div>
                <p className="bottom-footer-text">Privacy Policy</p>
                <p className="bottom-footer-text">Terms & Conditions</p>
              </div>
            </div>
          </div>
        </footer>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  .iSIFGq {
    margin: 0;
  }

  .footer-btn{
    border-radius: 0.7rem;
    &:hover,
    &:active {
      box-shadow: 0 2rem 2rem 0 rgb(132 144 255 / 30%);
      box-shadow: ${({ theme }) => theme.colors.shadowSupport};
      transform: scale(0.96);
    }
  }

  .footer-subscribe {
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .subscribe-input-container {
      position: relative;
      
      input {
        width: 100%;
      }
      
      input.error {
        border: 1px solid #e74c3c;
      }
      
      .error-message {
        color: #e74c3c;
        font-size: 1.2rem;
        margin-top: 0.5rem;
        text-align: left;
      }
      
      .success-message {
        color: #2ecc71;
        font-size: 1.2rem;
        margin-top: 0.5rem;
        text-align: left;
      }
    }
  }

  .bottom-footer-text{
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.white};
    &:hover {
        color: ${({ theme }) => theme.colors.btn};
    }
  }
  .contact-short {
    max-width: 60vw;
    margin: auto;
    padding: 5rem 10rem;
    background-color: ${({ theme }) => theme.colors.bg};
    border-radius: 1rem;
    box-shadow: ${({ theme }) => theme.colors.shadowSupport};
    transform: translateY(50%);

    .grid div:last-child {
      justify-self: end;
      align-self: center;
    }
  }

  footer {
    padding: 14rem 0 9rem 0;
    background-color: ${({ theme }) => theme.colors.footer_bg};
    h3 {
      color: ${({ theme }) => theme.colors.hr};
      margin-bottom: 2.4rem;
    }

    .footer-contact{
        a {
            color: ${({ theme }) => theme.colors.white};
            text-decoration: none;
            font-size: 1.6rem;
            transition: all 0.2s;
            &:hover {
                color: ${({ theme }) => theme.colors.btn};
            }
        }
    }
    p {
      color: ${({ theme }) => theme.colors.white};
    }
    .footer-social--icons {
      display: flex;
      gap: 2rem;

      div {
        padding: 1rem;
        border-radius: 50%;
        border: 2px solid ${({ theme }) => theme.colors.white};

        .icons {
          color: ${({ theme }) => theme.colors.white};
          font-size: 2.4rem;
          position: relative;
          cursor: pointer;
        }
      }
    }
  }

  .footer-quick-links{
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
        li {
            margin-bottom: 1.6rem;
            a {
                color: ${({ theme }) => theme.colors.white};
                text-decoration: none;
                font-size: 1.6rem;
                transition: all 0.2s;
                &:hover {
                    color: ${({ theme }) => theme.colors.btn};
                }
            }
        }
    }
  }

  .footer-bottom--section {
    padding-top: 9rem;

    hr {
      margin-bottom: 2rem;
      color: ${({ theme }) => theme.colors.hr};
      height: 0.1px;
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .contact-short {
      max-width: 80vw;
      margin: 4.8rem auto;
      transform: translateY(0%);
      text-align: center;

      .grid div:last-child {
        justify-self: center;
      }
    }

    footer {
      padding: 9rem 0 9rem 0;
    }

    .footer-bottom--section {
      padding-top: 4.8rem;
    }
  }
`;

export default Footer;
