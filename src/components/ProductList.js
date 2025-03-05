import React, { useState } from "react";
import { useFilterContext } from "../context/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  const { filter_products, grid_view } = useFilterContext();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filter_products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filter_products.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <div>
        {grid_view ? (
          <GridView products={currentProducts} />
        ) : (
          <ListView products={currentProducts} />
        )}
      </div>
      <Pagination
        totalPages={totalPages}
        paginate={paginate}
        currentPage={currentPage}
        nextPage={nextPage}
        prevPage={prevPage}
      />
    </div>
  );
};

const Pagination = ({
  totalPages,
  paginate,
  currentPage,
  nextPage,
  prevPage,
}) => {
  return (
    <div className="flex justify-center mt-6 fixed bottom-0 left-0 right-0 bg-white py-3 shadow-md">
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        className="mx-1 px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        Prev
      </button>
      {[...Array(totalPages).keys()].map((number) => (
        <button
          key={number + 1}
          onClick={() => paginate(number + 1)}
          className={`mx-1 px-4 py-2 rounded ${
            currentPage === number + 1
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          {number + 1}
        </button>
      ))}
      <button
        onClick={nextPage}
        disabled={currentPage === totalPages}
        className="mx-1 px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default ProductList;
