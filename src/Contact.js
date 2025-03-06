import React, { useState } from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

// Move styled-component outside the function to prevent re-renders
const Wrapper = styled.section`
  padding: 9rem 0 5rem 0;
  text-align: center;
  background-color: #f9f9f9;

  h2 {
    font-size: 4rem;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 2rem;
  }

  h4 {
    font-size: 3.2rem;
    margin-bottom: 2rem;
    color: ${({ theme }) => theme.colors.secondary};
  }

  #submit-btn {
    margin: auto;
    border-radius: 0.7rem;
    padding: 1rem 2rem;
    background-color: ${({ theme }) => theme.colors.btn};
    color: #fff;
    border: none;
  }

  .map-box {
    height: 50rem;
    border: none;
    margin: 0 auto 6rem auto;
  }

  .container {
    margin-top: 6rem;

    .contact-form {
      max-width: 50rem;
      margin: auto;
      padding: 2rem;
      background-color: #fff;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      border-radius: 0.5rem;

      .contact-inputs {
        display: flex;
        flex-direction: column;
        gap: 2rem;

        input,
        textarea {
          text-transform: none;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 0.5rem;
          font-size: 1.6rem;
        }

        input[type="submit"] {
          cursor: pointer;
          transition: all 0.2s;

          &:hover {
            background-color: ${({ theme }) => theme.colors.white};
            border: 1px solid ${({ theme }) => theme.colors.btn};
            color: ${({ theme }) => theme.colors.btn};
            transform: scale(0.9);
          }
        }
      }
    }
  }
`;

const Contact = () => {
  const { isAuthenticated, user } = useAuth0();
  const [formData, setFormData] = useState({
    username: "",
    email: isAuthenticated ? user.email : "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:9000/api/contact/send-email", formData);
      alert("Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email.");
    }
  };

  return (
    <Wrapper>
      <h2 className="common-heading">Feel free to Contact Us</h2>
      <h4>Our store location</h4>

      {/* Google Map (will not reload on input changes) */}
      <iframe
        className="map-box"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.537386749772!2d73.2005647744632!3d19.21539774758306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be79325172f1c85%3A0xbe273d54b2c1e186!2sR.N.Traders!5e0!3m2!1sen!2sin!4v1740849921204!5m2!1sen!2sin"
        width="60%"
        style={{ border: 1, borderStyle: "solid", borderColor: "#6254F3" }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Maps Location"
      ></iframe>

      {/* Contact Form */}
      <div className="container">
        <div className="contact-form">
          <form onSubmit={handleSubmit} className="contact-inputs">
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              autoComplete="off"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="off"
            />
            <input
              type="text"
              placeholder="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              autoComplete="off"
            />
            <textarea
              name="message"
              cols="30"
              rows="10"
              placeholder="Your message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <input type="submit" value="Submit" name="submit" id="submit-btn" />
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default Contact;
