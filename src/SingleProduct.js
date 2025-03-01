import { useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useProductContext } from "./context/productcontext";
import PageNavigation from "./components/PageNavigation";
import MyImage from "./components/MyImage";
import { Container } from "./styles/Container";
import FormatPrice from "./Helpers/FormatPrice";
import { MdSecurity } from "react-icons/md";
import { TbTruckDelivery, TbReplace } from "react-icons/tb";
import Star from "./components/Star";
import AddToCart from "./components/AddToCart";

const API = "http://localhost:9000/api/products";

const SingleProduct = () => {
  const { getSingleProduct, isSingleLoading, singleProduct } =
    useProductContext();

  const { id } = useParams();

  const {
    name,
    company,
    price,
    description,
    category,
    stars,
    reviews,
    image,
    colors,
    featured,
    shipping,
    stock,
  } = singleProduct;

  useEffect(() => {
    getSingleProduct(`${API}/${id}`);
  }, [id]);

  if (isSingleLoading) {
    return <div className="page_loading">Hold on! we are Loading...</div>;
  }

  return (
    <Wrapper>
      <PageNavigation title={name} />
      <Container className="container">
        <div className="grid grid-two-column">
          <div className="grid grid-four-column">
            <figure>
              <img
                src={image} //This is the url of the image
                className="box-image--style"
              />
            </figure>
          </div>

          <div className="product-data">
            <h2>{name}</h2>
            <Star stars={stars} reviews={reviews} />
            <p className="product-data-price">
              MRP:
              <del>
                <FormatPrice price={price + (price * 20) / 100} />
              </del>
            </p>
            <p className="product-data-price product-data-real-price">
              Deal of the Day: <FormatPrice price={price} />
            </p>
            <p>{description}</p>
            <div className="product-data-warranty">
              <div className="product-warranty-data">
                <TbTruckDelivery className="warranty-icon" />
                <p>Free Delivery</p>
              </div>

              <div className="product-warranty-data">
                <TbReplace className="warranty-icon" />
                <p>30 Days Replacement</p>
              </div>

              <div className="product-warranty-data">
                <TbTruckDelivery className="warranty-icon" />
                <p>Thapa Delivered</p>
              </div>

              <div className="product-warranty-data">
                <MdSecurity className="warranty-icon" />
                <p>2 Year Warranty</p>
              </div>
            </div>
            <div className="product-data-info">
              {/* <p>
                Available:
                <span> {stock > 0 ? "In Stock" : "Not Available"}</span>
              </p> */}
              <p>
                ID : <span> {id} </span>
              </p>
              <p>
                Brand :<span> {company} </span>
              </p>
              <p>
                Category :<span> {category} </span>
              </p>
              <p>
                Featured :<span> {featured ? "Yes" : "No"} </span>
              </p>
              <p>
                Shipping :
                <span> {shipping ? "Available" : "Not Available"} </span>
              </p>
              <p>
                Quantity left :<span> {stock} </span>
              </p>
              <p>
                Colors :
                {colors &&
                  colors.map((color, index) => (
                    <span
                      key={index}
                      style={{
                        backgroundColor: color,
                        padding: "0.5rem",
                        margin: "0.2rem",
                        borderRadius: "50%",
                      }}
                    ></span>
                  ))}
              </p>
            </div>
            <hr />
            {stock > 0 && <AddToCart product={singleProduct} />}
          </div>
        </div>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .container {
    padding: 9rem 0;
  }

  .product_images {
    display: flex;
    align-items: center;
  }

  h2 {
    color: ${({ theme }) => theme.colors.btn};
    text-transform: capitalize;
  }

  .product-data {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 2rem;

    .product-data-warranty {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ccc;
      margin-bottom: 1rem;

      .product-warranty-data {
        text-align: center;

        .warranty-icon {
          background-color: rgba(220, 220, 220, 0.5);
          border-radius: 50%;
          width: 4rem;
          height: 4rem;
          padding: 0.6rem;
          color: ${({ theme }) => theme.colors.btn};
        }
        p {
          font-size: 1.4rem;
          padding-top: 0.4rem;
        }
      }
    }

    .product-data-price {
      font-weight: bold;
    }
    .product-data-real-price {
      color: ${({ theme }) => theme.colors.btn};
    }
    .product-data-info {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      font-size: 1.8rem;

      span {
        font-weight: bold;
      }
    }

    hr {
      max-width: 100%;
      width: 90%;
      border: 0.1rem solid #000;
      color: red;
    }
  }

  .product-images {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .box-image--style {
    width: 300px; /* Set the fixed width */
    height: 300px; /* Set the fixed height */
    object-fit: cover; /* Ensure the image covers the box */
  }

  .page_loading {
    font-size: 3.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    padding: 0 2.4rem;
  }
`;

export default SingleProduct;
