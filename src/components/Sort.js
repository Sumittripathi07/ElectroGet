import React from "react";
import styled from "styled-components";
import { BsFillGridFill, BsList } from "react-icons/bs";
import { useFilterContext } from "../context/filter_context";

const Sort = () => {
  const { filter_products, grid_view, setGridView, setListView, sorting } = useFilterContext();
  return (
    <Wrapper className="sort-section">
      {/* 1st column  LIST AND GRID VIEW */}
      <div className="sorting-list--grid">      {/*Providing two buttons for list view and grid view*/}
        <button
          className={grid_view ? "active sort-btn" : "sort-btn"}
          onClick={setGridView}>                          {/*if grid view is true then show gird view and set it as active*/}
          <BsFillGridFill className="icon" />     {/*Setting grid view icon*/}
        </button>

        <button                                        
          className={!grid_view ? "active sort-btn" : " sort-btn"}        
          onClick={setListView}>                  {/*Setting List view icon*/}
          <BsList className="icon" />             {/*if grid view is false then show list view and set it as active*/}
        </button>
      </div>

      {/* 2nd column - Shows how many products are present  */}
      <div className="product-data">
        <p>{`${filter_products.length} Product Available`}</p>
      </div>

      {/* 3rd column - show a drop down menu */} 
      <div className="sort-selection">
        <form action="#">
          <label htmlFor="sort"></label>
          <select
            name="sort"
            id="sort"
            className="sort-selection--style"
            onClick={sorting}>
            <option value="lowest">Price (lowest)</option>
            <option value="#" disabled></option>            {/*taking a dummy option for space and disabling the option*/}
            <option value="highest">Price (highest)</option>
            <option value="#" disabled></option>
            <option value="a-z">Price (a-z)</option>
            <option value="#" disabled></option>
            <option value="z-a">Price (z-a)</option>
          </select>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  justify-content: space-between;
  margin-top: 5rem;

  .sorting-list--grid {
    display: flex;
    gap: 2rem;

    .sort-btn {
      padding: 0.8rem 1rem;
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }

    .icon {
      font-size: 1.6rem;
    }
    .active {
      background-color: ${({ theme }) => theme.colors.black};
      color: #fff;
    }
  }

  .sort-selection .sort-selection--style {
    padding: 0.5rem;
    cursor: pointer;

    .sort-select--option {
      padding: 0.5rem 0;
      cursor: pointer;
      height: 2rem;
      padding: 10px;
    }
  }
`;

export default Sort;