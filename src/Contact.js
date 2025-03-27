import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useUser } from "@clerk/clerk-react";
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

        .error-message {
          color: #e74c3c;
          font-size: 1.4rem;
          text-align: left;
          margin-top: -1rem;
        }

        .input-container {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          position: relative;
        }

        input.error, textarea.error {
          border: 1px solid #e74c3c;
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
  const { isSignedIn, user } = useUser();
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    phone: "",
    message: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  // Set email when user is signed in
  useEffect(() => {
    if (isSignedIn && user && user.primaryEmailAddress) {
      setFormData(prevData => ({
        ...prevData,
        email: user.primaryEmailAddress.emailAddress || ""
      }));
    }
  }, [isSignedIn, user]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: "",
      phone: "",
      message: "",
    };

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Phone validation
    const phoneRegex = /^\d{10}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
      isValid = false;
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setFormSubmitted(true);
    
    try {
      await axios.post("http://localhost:9000/api/contact/send-email", formData);
      alert("Email sent successfully!");
      // Reset form after successful submission
      setFormData({
        email: isSignedIn && user?.primaryEmailAddress ? user.primaryEmailAddress.emailAddress : "",
        phone: "",
        message: "",
      });
      setFormSubmitted(false);
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email. Please try again later.");
      setFormSubmitted(false);
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
            <div className="input-container">
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "error" : ""}
                autoComplete="off"
              />
              {errors.email && <div className="error-message">{errors.email}</div>}
            </div>

            <div className="input-container">
              <input
                type="text"
                placeholder="Phone (10 digits)"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? "error" : ""}
                autoComplete="off"
              />
              {errors.phone && <div className="error-message">{errors.phone}</div>}
            </div>

            <div className="input-container">
              <textarea
                name="message"
                cols="30"
                rows="10"
                placeholder="Your message"
                value={formData.message}
                onChange={handleChange}
                className={errors.message ? "error" : ""}
              ></textarea>
              {errors.message && <div className="error-message">{errors.message}</div>}
            </div>

            <input 
              type="submit" 
              value={formSubmitted ? "Submitting..." : "Submit"} 
              name="submit" 
              id="submit-btn" 
              disabled={formSubmitted}
            />
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default Contact;
