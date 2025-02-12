import React from 'react';
//import { useContext } from 'react';
import HeroSection from './components/HeroSection';
//import { AppContext } from './context/productcontext';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Button } from './styles/Button';


const About = () => {

  //const myName = useContext(AppContext);
  
  // Here we are passing data to our HeroSection component using props
  const data = {
    name: "Gearlogy Electronics",
    description: `Explore a curated collection of the latest electronics at Gearlogy. From sleek smartphones that keep you connected, to smart home solutions for modern living, we offer top-tier gadgets that blend technology with style.
    
    Discover high-definition TVs, sleek smartphones, durable smart watches, immersive audio gear, and accessories that match your personality. Our commitment to quality ensures durable products that accompany you on every journey. 
    
    Quality is key – our products promise durability for every adventure. With a user-friendly interface and dedicated support team, Gearlogy is more than shopping – it's a tech-savvy lifestyle. Embrace innovation with us and elevate your electronics game today`
};


  return (
    <>
      {/*myName*/}
      <HeroSection  myData={data}/>
      <Wrapper>
        <div className='container'>
            <div className="grid grid-two-column">
               {/* Our homepage hero image*/}
               <div className='hero-sectiion-image'>
                    <figure>
                        <img
                            src="images/themanbehind.jpg"
                            alt="themanbehind"
                            className="img-style"
                        />
                    </figure>
                </div>

                <div className='hero-section-data'>
                    <p className='intro-data'>Meet the Developer</p>
                    <h1>Garv Chouhan</h1>
                    <div>
                      <p>I am a passionate developer pursuing my <span>B.Tech. in Computer Science Engineering from IIIT Vadodara.</span> Fueled by passion of technology and innovation, I explore the dynamic realm of <span>Software Development</span>. Profoundly intrigued by <span>Front-end Developement and UI/UX Designing</span>, I craft seamless and visually captivating digital experiences.
                        <br></br>
                        Throughout my journey, I've tackled diverse standout projects showcasing excellence. <span>Click on PORTFOLIO</span> to know more about me and witness efficient coding, user-friendly design, and my craft's progression.
                        <br/><br/>
                        As I stand on the threshold of embarking on a professional career, I am enthusiastically <span>seeking opportunities</span> to contribute my skills and passion to innovative teams. <span>If you believe in the power of collaboration and innovation, I am ready to bring my dedication and creativity to the table.</span> Feel free to explore my portfolio, and if you find my work aligns with your vision, please don't hesitate to reach out.</p>
                    </div>
                    <NavLink to="https://garv-chouhan.netlify.app/">
                        <Button>Portfolio</Button>
                    </NavLink>
                </div>
            </div>
        </div>
    </Wrapper>
    </>
  )
}
const Wrapper = styled.section`
padding: 12rem 0;

  .container {
    background-color: ${({ theme }) => theme.colors.background};
  }

  img {
    min-width: 10rem;
    height: 10rem;
    border-radius: 8%;
    border: 3px solid ${({ theme }) => theme.colors.border};
  }
  

  span {
    color: ${({ theme }) => theme.colors.btn};
    font-weight: bold;
  }

  .hero-section-data {
    p {
      margin: 2rem 0;
    }

    h1 {
      text-transform: capitalize;
      font-weight: bold;
      color: ${({ theme }) => theme.colors.btn};
    }

    .intro-data {
      color: ${({ theme }) => theme.colors.text};
      margin-bottom: 0;
      font-weight: bold;
    }
  }

  .hero-section-image {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  figure {
    position: relative;

    &::after {
      content: "";
      width: 60%;
      height: 80%;
      background-color:  ${({ theme }) => theme.colors.btn};
      position: absolute;
      right: 50%;
      border-radius: 10%;
      top: -5rem;
      z-index: -1;
    }
  }
  .img-style {
    width: 100%;
    height: auto;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid {
      gap: 10rem;
    }

    figure::after {
      content: "";
      width: 50%;
      height: 100%;
      left: 0;
      top: 10%;
      /* bottom: 10%; */
      background-color: rgba(81, 56, 238, 0.4);
    }
  }
`;


export default About