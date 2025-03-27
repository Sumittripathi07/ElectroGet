import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useFilterContext } from "../context/filter_context";
import { FaCheck, FaSearch } from "react-icons/fa";
import FormatPrice from "../Helpers/FormatPrice";
import { Button } from "../styles/Button";

const FilterSection = () => {
  const {
    filters: { text, category, color, price, maxPrice, minPrice },
    updateFilterValue,
    all_products,
    clearFilters,
  } = useFilterContext();

  const [searchInput, setSearchInput] = useState(text);
  const [isSearching, setIsSearching] = useState(false);

  // Debounce search input to improve performance
  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      const context = this;
      setIsSearching(true);
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(context, args);
        setIsSearching(false);
      }, delay);
    };
  };

  // Create debounced search function
  const debouncedUpdateFilter = useCallback(
    debounce((value) => {
      const event = { 
        target: { 
          name: "text", 
          value 
        } 
      };
      updateFilterValue(event);
    }, 400),
    [updateFilterValue]
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    debouncedUpdateFilter(value);
  };

  // Reset search input when filters are cleared
  useEffect(() => {
    if (text === "") {
      setSearchInput("");
    }
  }, [text]);

  const getUniqueData = (data, attr) => {
    let newVal = data.map((curElem) => {
      const value = curElem[attr];
      return typeof value === "string" ? value.toLowerCase() : value;
    });

    if (attr === "colors") {
      newVal = newVal.flat();
    }

    return (newVal = ["all", ...new Set(newVal)]);
  };

  const categoryData = getUniqueData(all_products, "category");
  const companyData = getUniqueData(all_products, "company");
  const colorsData = getUniqueData(all_products, "colors");

  return (
    <Wrapper>
      <div className="filter-search">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="search-container">
            <div className="search-icon">
              <FaSearch />
            </div>
            <input
              type="text"
              name="text"
              placeholder="Search products..."
              value={searchInput}
              onChange={handleSearchChange}
              aria-label="Search products"
            />
            {isSearching && <div className="search-spinner"></div>}
          </div>
          {searchInput && (
            <button 
              className="clear-search" 
              onClick={() => {
                setSearchInput("");
                const event = { 
                  target: { 
                    name: "text", 
                    value: "" 
                  } 
                };
                updateFilterValue(event);
              }}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </form>
      </div>

      <div className="filter-category">
        <h3>Category</h3>
        <form action="#">
          <select
            name="category"
            id="category"
            className="filter-category--select"
            onChange={updateFilterValue}
            value={category}
            aria-label="Filter by category"
          >
            {categoryData.map((curElem, index) => {
              return (
                <option key={index} value={curElem} name="category">
                  {curElem}
                </option>
              );
            })}
          </select>
        </form>
      </div>

      <div className="filter-company">
        <h3>Company</h3>
        <form action="#">
          <select
            name="company"
            id="company"
            className="filter-company--select"
            onChange={updateFilterValue}
            value={category === "all" ? "all" : undefined}
            aria-label="Filter by company"
          >
            {companyData.map((curElem, index) => {
              return (
                <option key={index} value={curElem} name="company">
                  {curElem}
                </option>
              );
            })}
          </select>
        </form>
      </div>

      <div className="filter-colors colors">
        <h3>Colors</h3>
        <div className="filter-color-style" role="group" aria-label="Filter by color">
          {colorsData.map((curColor, index) => {
            if (curColor === "all") {
              return (
                <button
                  key={index}
                  type="button"
                  value={curColor}
                  name="color"
                  className="color-all--style"
                  onClick={updateFilterValue}
                  aria-pressed={color === "all"}
                >
                  all
                </button>
              );
            }
            return (
              <div className="tooltip" key={index}>
                <button
                  type="button"
                  value={curColor}
                  name="color"
                  style={{ backgroundColor: curColor }}
                  className={color === curColor ? "btnStyle active" : "btnStyle"}
                  onClick={updateFilterValue}
                  aria-label={`Select ${curColor} color`}
                  aria-pressed={color === curColor}
                >
                  {color === curColor ? <FaCheck className="checkStyle" /> : null}
                </button>
                <span className="tooltiptext">{curColor}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="filter_price">
        <h3>Price</h3>
        <p>
          <FormatPrice price={price} />
        </p>
        <input
          type="range"
          name="price"
          min={minPrice}
          max={maxPrice}
          value={price}
          onChange={updateFilterValue}
          aria-label="Filter by price"
        />
        <div className="price-range">
          <span><FormatPrice price={minPrice} /></span>
          <span><FormatPrice price={maxPrice} /></span>
        </div>
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
    padding: 2rem 0 1rem 0;
    font-weight: bold;
  }

  .filter-search {
    position: relative;

    form {
      position: relative;
      display: flex;
      align-items: center;
    }

    .search-container {
      position: relative;
      width: 100%;
      display: flex;
      align-items: center;
    }

    input {
      padding: 0.8rem 1rem 0.8rem 3rem;
      width: 100%;
      border-radius: 5px;
      border: 1px solid #e2e8f0;
      transition: all 0.3s ease;

      &:focus, &:hover {
        border-color: ${({ theme }) => theme.colors.btn};
        outline: none;
        box-shadow: 0 0 0 2px rgba(98, 84, 243, 0.2);
      }
    }

    .search-icon {
      position: absolute;
      left: 1rem;
      color: #718096;
    }

    .search-spinner {
      position: absolute;
      right: 1rem;
      width: 15px;
      height: 15px;
      border: 2px solid rgba(98, 84, 243, 0.3);
      border-top-color: ${({ theme }) => theme.colors.btn};
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    .clear-search {
      position: absolute;
      right: 0.5rem;
      background: none;
      border: none;
      font-size: 2rem;
      color: #718096;
      cursor: pointer;
      padding: 0.2rem 0.7rem;
      line-height: 1;
      border-radius: 50%;

      &:hover {
        background-color: rgba(0, 0, 0, 0.05);
      }
    }
  }

  .price-range {
    display: flex;
    justify-content: space-between;
    margin-top: 0.5rem;
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.text};
  }

  .filter-category--select,
  .filter-company--select {
    padding: 0.8rem 1.2rem;
    width: 100%;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.text};
    text-transform: capitalize;
    border: 1px solid #e2e8f0;
    border-radius: 5px;
    
    &:focus, &:hover {
      border-color: ${({ theme }) => theme.colors.btn};
      outline: none;
      box-shadow: 0 0 0 2px rgba(98, 84, 243, 0.2);
    }
  }

  .filter-color-style {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 0.5rem;
  }

  .color-all--style {
    background-color: transparent;
    text-transform: capitalize;
    border: 1px solid #e2e8f0;
    border-radius: 3px;
    padding: 0.2rem 0.5rem;
    cursor: pointer;
    
    &:hover {
      background-color: #f7fafc;
    }
  }

  .btnStyle {
    width: 2.4rem;
    height: 2.4rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 0.5rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      opacity: 0.85;
      transform: scale(1.1);
    }
  }

  .active {
    opacity: 1;
    box-shadow: 0 0 0 2px white, 0 0 0 4px ${({ theme }) => theme.colors.btn};
  }

  .checkStyle {
    font-size: 1.2rem;
    color: #fff;
  }

  .filter_price {
    input {
      margin: 0.5rem 0 1rem 0;
      padding: 0;
      box-shadow: none;
      cursor: pointer;
      width: 100%;
      accent-color: ${({ theme }) => theme.colors.btn};
    }
  }

  .filter-shipping {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .filter-clear .btn {
    background-color: #e74c3c;
    color: #fff;
    padding: 0.8rem 1.5rem;
    transition: all 0.3s ease;
    
    &:hover {
      background-color: #c0392b;
    }
  }

  .tooltip {
    position: relative;
    display: inline-block;
  }

  .tooltip .tooltiptext {
    visibility: hidden;
    width: 80px;
    background-color: #1a202c;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -40px;
    opacity: 0;
    transition: opacity 0.3s;
    font-size: 1.2rem;
    text-transform: capitalize;
  }

  .tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 0.9;
  }
`;

export default FilterSection;
