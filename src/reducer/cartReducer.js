const cartReducer = (state, action) => {
  if (action.type === "ADD_TO_CART") {
    let { id, color, amount, product } = action.payload;

    // tackle the existing product means if the product is already in the cart
    //then it will not add the product again but it will increase the amount of
    //the product if user choose a diffrent color product

    let existingProduct = state.cart.find(
      //in your local storage cart find it the product is already added
      (curItem) => curItem.id === id + color //if the product is already added then it will not add the product again but it will increase the amount of the product if user choose a diffrent color product
    );

    if (existingProduct) {
      let updatedProduct = state.cart.map((curElem) => {
        //using map one by one check all the products in our cart
        if (curElem.id === id + color) {
          //if the product is already added then it will not add the product again
          let newAmount = curElem.amount + amount; //but it will increase the amount of the product if user choose a diffrent color product

          if (newAmount >= curElem.max) {
            //if the amount of total product is greater than the stock then it will not increase the amount
            newAmount = curElem.max; //it will remain the same amount
          }
          return {
            ...curElem,
            amount: newAmount,
          };
        } else {
          return curElem; //if the product is not added then it will add the product
        }
      });
      return {
        ...state,
        cart: updatedProduct, //return the updated product
      };
    } else {
      let cartProduct = {
        id: id + color, //id is combination of id+color
        name: product.name,
        color,
        amount,
        image: product.image,
        price: product.price,
        max: product.stock,
      };

      return {
        ...state,
        cart: [...state.cart, cartProduct],
      };
    }
  }

  // to set the increment and decrement
  if (action.type === "SET_DECREMENT") {
    let updatedProduct = state.cart.map((curElem) => {
      //using map one by one check all the products in our cart
      if (curElem.id === action.payload) {
        //if the product matches with the id
        let decAmount = curElem.amount - 1; //then decrement the amount of the product if user chooses minus click button by 1

        if (decAmount <= 1) {
          //if the amount of total product is less than 1 then it will not decrease the amount it will stay 1
          decAmount = 1;
        }
        return {
          ...curElem,
          amount: decAmount,
        };
      } else {
        return curElem;
      }
    });
    return { ...state, cart: updatedProduct };
  }

  if (action.type === "SET_INCREMENT") {
    let updatedProduct = state.cart.map((curElem) => {
      //using map one by one check all the products in our cart
      if (curElem.id === action.payload) {
        //if the product matches with the id
        let incAmount = curElem.amount + 1; //then increment the amount of the product if user chooses plus click button by 1

        if (incAmount >= curElem.max) {
          //if the amount of total product is greater than the stock then it will not increase the amount
          incAmount = curElem.max; //it will remain the same amount
        }
        return {
          ...curElem,
          amount: incAmount,
        };
      } else {
        return curElem;
      }
    });
    return { ...state, cart: updatedProduct };
  }

  if (action.type === "REMOVE_ITEM") {
    //to remove individual item from cart
    let updatedCart = state.cart.filter(
      (curItem) => curItem.id !== action.payload //if the product matches with the id then it will remove the product
    ); //and we return/display those products in cart which does not matches with the id
    return {
      ...state,
      cart: updatedCart,
    };
  }

  // to empty or to clear to cart
  if (action.type === "CLEAR_CART") {
    //simply clear the whole cart and set cart to empty[]
    return {
      ...state,
      cart: [],
    };
  }

  if (action.type === "CART_TOTAL_ITEM") {
    let updatedItemVal = state.cart.reduce((initialVal, curElem) => {
      let { amount } = curElem;

      initialVal = initialVal + amount;
      return initialVal;
    }, 0);

    return {
      ...state,
      total_item: updatedItemVal,
    };
  }

  if (action.type === "CART_TOTAL_PRICE") {
    let total_price = state.cart.reduce((initialVal, curElem) => {
      let { price, amount } = curElem;

      initialVal = initialVal + price * amount; //total price of all the products in cart which we get by multiplying price and amount
      // eg. 25000 + 0 = 25000      -1st product price * amount
      // 10199 + 25000 = 35199  -2nd product price * amount

      return initialVal;
    }, 0);

    return {
      ...state,
      total_price: total_price,
    };
  }

  return state;
};

export default cartReducer;
