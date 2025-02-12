const filterReducer = (state, action) => {
    switch (action.type) {
      case "LOAD_FILTER_PRODUCTS":      //This case is used to load the products

      let priceArr = action.payload.map((curElem) => curElem.price);
      console.log(
        "🚀 ~ file: filterReducer.js ~ line 5 ~ filterReducer ~ priceArr",
        priceArr
      );


      let maxPrice = Math.max(...priceArr);
      console.log(
        "🚀 ~ file: filterReducer.js ~ line 23 ~ filterReducer ~ maxPrice",
        maxPrice
      );
        return {
          ...state,
          filter_products: [...action.payload],
          all_products: [...action.payload],
          filters: { ...state.filters, maxPrice, price: maxPrice, minPrice: 0 },
        };
  
      case "SET_GRID_VIEW":       //This case is used to set the grid view
        return {
          ...state,
          grid_view: true,
        };

      case "SET_LIST_VIEW":       //This case is used to set the list view
        return {                  //we change the grid_view to false to actvate list view as true
          ...state,
          grid_view: false,
        };
  
      case "GET_SORT_VALUE":      //This case is used to get the sort value
        //let userSortValue = document.getElementById("sort").value;      //getting the value from the drop down menu
        //let sort_value = userSortValue.options[userSortValue.selectedIndex].value;     //getting the selected value
        return {
          ...state,
          sorting_value: action.payload,
        };

      case "UPDATE_FILTERS_VALUE":     //This case is used to update the filter value
        return {
          ...state,
          filters: {
            ...state.filters,
            [action.payload.name]: action.payload.value,
          },
        };
      
        case "SORTING_PRODUCTS":
          let newSortData;
          // let tempSortProduct = [...action.payload];
    
          const { filter_products, sorting_value } = state;
          let tempSortProduct = [...filter_products];
    
          const sortingProducts = (a, b) => {
            if (sorting_value === "lowest") {         //sorting the products based on the selected value
              return a.price - b.price;               //like a-z, z-a, lowest, highest
            }
    
            if (sorting_value === "highest") {
              return b.price - a.price;
            }
    
            if (sorting_value === "a-z") {
              return a.name.localeCompare(b.name);
            }
    
            if (sorting_value === "z-a") {
              return b.name.localeCompare(a.name);
            }
          };
    
          newSortData = tempSortProduct.sort(sortingProducts);
    
          return {
            ...state,
            filter_products: newSortData,       //new sorted data is stored in filter_products which is obtained by above operations
          };


          case "FILTER_PRODUCTS":
            let { all_products } = state;
            let tempFilterProduct = [...all_products];
      
            const { text, category, company, color, price } = state.filters;
      
            if (text) {           //filtering the products based on the text
              tempFilterProduct = tempFilterProduct.filter((curElem) => {
                return curElem.name.toLowerCase().includes(text);         //firstly converting the text to lowercase and then checking if the text typed in the search box includes the text in the product name
              });
            }
      
            if (category !== "all") {     //filtering the products based on the category but if it is === all then we dont need to filter
              tempFilterProduct = tempFilterProduct.filter(
                (curElem) => curElem.category === category
              );
            }
      
            if (company !== "all") {      //filtering the products based on the company but if it is === all then we dont need to filter
              tempFilterProduct = tempFilterProduct.filter(
                (curElem) => curElem.company.toLowerCase() === company.toLowerCase()        //firstly converting the company to lowercase and then checking if the company typed in the search box includes the company in the product name
              );
            }
      
            if (color !== "all") {                  //filtering the products based on the color
              tempFilterProduct = tempFilterProduct.filter((curElem) =>
                curElem.colors.includes(color)
              );
            }

            if(price === 0){
              tempFilterProduct = tempFilterProduct.filter((curElem) => curElem.price === price);        //if price === 0 then we dont need to filter

            }
            else{
              tempFilterProduct = tempFilterProduct.filter((curElem) => curElem.price <= price);        //filtering the products based on the price if curPrice < price then only it will be displayed
            }
            return {
              ...state,
              filter_products: tempFilterProduct,
            };
      

            case "CLEAR_FILTERS":
              return {
                ...state,
                filters: {                  //reset all the filters to default i.e. category-> all, company-> all, color-> all, price-> maxPrice
                  ...state.filters,         //this clears the choices made by user
                  text: "",
                  category: "all",
                  company: "all",
                  color: "all",
                  maxPrice: state.filters.maxPrice,
                  price: state.filters.maxPrice,
                  minPrice: 0,
                },
              };
    

        //default case to return the state
      default:
        return state;
    }
  };
  
  export default filterReducer;