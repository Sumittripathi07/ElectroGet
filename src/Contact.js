import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const Contact = () => {

  const { isAuthenticated, user } = useAuth0();

  const Wrapper = styled.section`
    padding: 9rem 0 5rem 0;
    text-align: center;

    h4{
      font-size: 3.2rem;
      margin-bottom: 2rem;

    }
    #submit-btn {
      margin: auto;
      border-radius: 0.7rem;
    }

    .map-box {
      height: 50rem;
      border: none;
      margin-bottom: 6rem;
    }

    .container {
      margin-top: 6rem;

      .contact-form {
        max-width: 50rem;
        margin: auto;

        .contact-inputs {
          display: flex;
          flex-direction: column;
          gap: 3rem;

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

  return (
    <Wrapper>
      <h2 className="common-heading">Feel free to Contact Us</h2>
      <h4>Our store location</h4>

      {/*Google map location*/}
      <iframe className="map-box" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3679.5146977092277!2d75.93220677379585!3d22.746272626585437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962e3cd9d3de1ad%3A0xebaf3ee69f583ff5!2sPhoenix%20Citadel%20Mall!5e0!3m2!1sen!2sin!4v1692897536586!5m2!1sen!2sin" 
      width="60%" 
      style={{border: 1, borderStyle:"solid", borderColor:"#6254F3"}} 
      allowFullScreen="" 
      loading="lazy" 
      referrerPolicy="no-referrer-when-downgrade" 
      title="Google Maps Location - Phoenix Citadel Mall">
      </iframe>

      {/*Contact form integratted with Email*/}
      <div className="container">
        <div className="contact-form">
            <form action="https://formspree.io/f/mzblrjwd" method="POST" className="contact-inputs">
              <input type="text" placeholder="Username" name="username"  required autoComplete="off"/>
              <input type="email" placeholder="Email" name="email" value={isAuthenticated ? user.email : " "} required autoComplete="off"/>
              <input type="text" placeholder="Phone" name="phone" required autoComplete="off"/>
              <textarea name="message" cols="30" rows="10" placeholder="Your message" required></textarea>
              <input type="submit" value="Submit" name="submit" id="submit-btn"/>
            </form>
        </div> 
      </div>       
    </Wrapper>
  );
};

export default Contact;