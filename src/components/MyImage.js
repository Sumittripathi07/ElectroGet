import React, { useState } from "react";
import styled from "styled-components";

const MyImage = ({ imgs = [{ url: "" }] }) => {
  const [mainImage, setMainImage] = useState(imgs[0]);      //We use useState to set the image from the api dynamically

  return (
    // Now we divide the images in two columns
    //1st columnn consists of 4 images 
    <Wrapper>
      <div className="grid grid-four-column">         
        {imgs.map((curElm, index) => {
          return (
            <figure>
              <img
                src={curElm.url}                               //This is the url of the image
                alt={curElm.filename}                         //This is the name of the image
                className="box-image--style"
                key={index}                                  //This is the key of the image
                onClick={() => setMainImage(curElm)}        //This is the function that helps us change the main image when we click on the image
              />
            </figure>
          );
        })}
      </div>


      {/* 2nd column  */}

      <div className="main-screen">                             
        <img src={mainImage.url} alt={mainImage.filename} />    {/*This is the main image*/}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 0.4fr 1fr;
  gap: 1rem;

  .grid {
    flex-direction: row;
    justify-items: center;
    align-items: center;
    width: 100%;
    gap: 1rem;
    /* order: 2; */

    img {
      max-width: 100%;
      max-height: 100%;
      background-size: cover;
      object-fit: contain;
      cursor: pointer;
      box-shadow: ${({ theme }) => theme.colors.shadow};
    }
  }

  .main-screen {
    display: grid;
    place-items: center;
    order: 1;
    img {
      max-width: 100%;
      height: auto;
      box-shadow: ${({ theme }) => theme.colors.shadow};
    }
  }
  .grid-four-column {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    display: flex;
    flex-direction: column;
    order: 1;

    .grid-four-column {
      grid-template-rows: 1fr;
      grid-template-columns: repeat(4, 1fr);
    }
  }
`;

export default MyImage;