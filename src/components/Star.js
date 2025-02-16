import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import styled from "styled-components";

//IF YOU DON'T UNDERSTOOD WATCH THIS VIDEO: https://www.youtube.com/watch?v=KvEEmZ5ThC4&list=PLwGdqUZWnOp0f3nfgWGbk3_fe8hoMIYpA&index=22
// FROM THAPA TIME: 14:52
const Star = ({ stars, reviews }) => {
  const ratingStar = Array.from({ length: 5 }, (elem, index) => {
    let number = index + 0.5; //We use this to get the half star
    // debugger;                                   //i=0, i=1, i=2, i=3, i=4 [0-based indexing of 5 elements]
    return (
      <span key={index}>
        {" "}
        {/*This is the star component*/}
        {stars >= index + 1 ? ( //If the stars score is greater than the index of array then we show the full star
          <FaStar className="icon" />
        ) : stars >= number ? ( //If the stars are greater than the number then we show the half star
          <FaStarHalfAlt className="icon" />
        ) : (
          <AiOutlineStar className="icon" />
        )}
      </span>
    );
  });

  return (
    <Wrapper>
      <div className="icon-style">
        {ratingStar}
        <p>({reviews} customer reviews)</p>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .icon-style {
    display: flex;
    gap: 0.2rem;
    align-items: center;
    justify-content: flex-start;

    .icon {
      font-size: 2rem;
      color: orange;
    }

    .empty-icon {
      font-size: 2.6rem;
    }
    p {
      margin: 0;
      padding-left: 1.2rem;
    }
  }
`;

export default Star;
