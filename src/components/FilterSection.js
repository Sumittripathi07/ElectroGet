import styled from "styled-components";
import { useFilterContext } from "../context/filter_context";
import { FaCheck } from "react-icons/fa";
import FormatPrice from "../Helpers/FormatPrice";
import { Button } from "../styles/Button";


const FilterSection = () => {         //using useFilterContext to get all the data from filter_context
  const {
    filters: { text, category, color, price, maxPrice, minPrice },
    updateFilterValue,
    all_products,
    clearFilters,
  } = useFilterContext();

  // get the unique values of each property
  const getUniqueData = (data, attr) => {         //function to get unique data from all products based on category, company and colors
    let newVal = data.map((curElem) => {
      return curElem[attr];
    });

    if (attr === "colors") {            //handing the colors array explicitly, where we need to flatten the array and then get the unique values of colours from the array
      // return (newVal = ["All", ...new Set([].concat(...newVal))]);
      newVal = newVal.flat();         //flat() method concatenates sub-array elements
    }

    return (newVal = ["all", ...new Set(newVal)]);      //using Set() method i.e. set data structure that returns unique values from the array
  };

  // we need to have the individual data of each in an array format
  const categoryData = getUniqueData(all_products, "category");           //getting unique data from all products based on category
  const companyData = getUniqueData(all_products, "company");             //getting unique data from all products based on company
  const colorsData = getUniqueData(all_products, "colors");               //getting unique data from all products based on colors
  // console.log(
  //   "🚀 ~ file: FilterSection.js ~ line 23 ~ FilterSection ~ companyData",
  //   colorsData
  // );

  return (
    <Wrapper>
      <div className="filter-search">
        <form onSubmit={(e) => e.preventDefault()}>     {/*preventing the default behaviour of form*/}
          <input
            type="text"
            name="text"
            placeholder="Search"        //MAKING OUR SEARCH BAR FOR FILTER SECTION
            value={text}
            onChange={updateFilterValue}
          />
        </form>
      </div>

      <div className="filter-category">  
        <h3>Category</h3>
        <div>                                        {/*MAKING OUR CATEGORY SECTION*/}
          {categoryData.map((curElem, index) => {
            return (
              <button                     //running map loop to print all the element sof categoryData array
                key={index}
                type="button"
                name="category"
                value={curElem}
                className={curElem === category ? "active" : ""}
                onClick={updateFilterValue}>
                {curElem}
              </button>
            );
          })}
        </div>
      </div>


        {/*Making company wise filter using form or drop down menu*/}
      <div className="filter-company">
        <h3>Company</h3>

        <form action="#">
          <select
            name="company"
            id="company"
            className="filter-company--select"
            onClick={updateFilterValue}>
            {companyData.map((curElem, index) => {         //running map loop to print all the elements of companyData array
              return (
                <option key={index} value={curElem} name="company">
                  {curElem}
                </option>
              );
            })}
          </select>
        </form>
      </div>

        {/*Making color wise filter using form or drop down menu*/}
        <div className="filter-colors colors">
        <h3>Colors</h3>

        <div className="filter-color-style">
          {colorsData.map((curColor, index) => {
            if (curColor === "all") {
              return (
                <button
                  key={index}
                  type="button"
                  value={curColor}
                  name="color"
                  className="color-all--style"
                  onClick={updateFilterValue}>
                  all
                </button>
              );
            }
            return (
              <button               //running map loop to print all the elements of colorsData array
                key={index}
                type="button"
                value={curColor}
                name="color"
                style={{ backgroundColor: curColor }}
                className={color === curColor ? "btnStyle active" : "btnStyle"}         //if color is equal to curColor then add active class else not
                onClick={updateFilterValue}>
                {color === curColor ? <FaCheck className="checkStyle" /> : null}        {/*if color is equal to curColor then add check mark else not*/}
              </button>
            );
          })}
        </div>
      </div>

      <div className="filter_price">
        <h3>Price</h3>
        <p>
          <FormatPrice price={price} />     {/*using FormatPrice helper function to format the price i.e covert 60lakh to 60thousand*/}
        </p>
        {/*making price range slider*/}
        <input                              
          type="range"
          name="price"
          min={minPrice}
          max={maxPrice}
          value={price}
          onChange={updateFilterValue}
        />
      </div>

      <div className="filter-clear">
        <Button className="btn" onClick={clearFilters}>
          Clear Filters
        </Button>
        </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  h3 {
    padding: 2rem 0;
    font-size: bold;
  }

  .filter-search {
    input {
      padding: 0.6rem 1rem;
      width: 80%;
    }
  }

  .filter-category {
    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.4rem;

      button {
        border: none;
        background-color: ${({ theme }) => theme.colors.white};
        text-transform: capitalize;
        cursor: pointer;

        &:hover {
          color: ${({ theme }) => theme.colors.btn};
        }
      }

      .active {
        border-bottom: 1px solid rgb(98, 84, 243);
        color: ${({ theme }) => theme.colors.btn};
      }
    }
  }

  .filter-company--select {
    padding: 0.3rem 1.2rem;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.text};
    text-transform: capitalize;
  }

  .filter-color-style {
    display: flex;
    justify-content: center;
  }

  .color-all--style {
    background-color: transparent;
    text-transform: capitalize;
    border: none;
    cursor: pointer;
  }
  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  .active {
    opacity: 1;
  }

  .checkStyle {
    font-size: 1rem;
    color: #fff;
  }

  .filter_price {
    input {
      margin: 0.5rem 0 1rem 0;
      padding: 0;
      box-shadow: none;
      cursor: pointer;
    }
  }

  .filter-shipping {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .filter-clear .btn {
    background-color: #ec7063;
    color: #fff;
  }
`;

export default FilterSection;