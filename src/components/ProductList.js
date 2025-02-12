import React from "react";
import { useFilterContext } from "../context/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  const { filter_products, grid_view } = useFilterContext();

  if (grid_view === true) {         //if grid_view is true then return the grid view
    return <GridView products={filter_products} />;
  }

  if (grid_view === false ) {        //if grid_view is false then return the list view
    return <ListView products={filter_products} />;
  }
};

export default ProductList;