import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { Link } from "react-router-dom";
import CardPlacehoderSkeleton from "../components/Placeholders/CardPlacehoderSkeleton.jsx";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  console.log(products);

  const fetchProducts = async (selectedCategory) => {
    try {
      setLoading(true);
      let url = "/products";
      if (selectedCategory) {
        url = `/categories/${selectedCategory}/products`;
      }
      const res = await axiosInstance.get(url);
      setProducts(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get("/categories");
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts(selectedCategory);
    fetchCategories();
  }, [selectedCategory]);

  const handleCategoryChange = (e) => {
    console.log(e.target.value);
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="border border-slate-700 rounded-md p-2 m-1 lg:mt-2 border-b-2 shadow-lg sm:border-r-2 sm:w-full md:w-1/4 md:min-h-screen">
        <div className="p-3 flex items-center gap-2">     
        </div>
        <div className="flex flex-col items-center gap-3 mx-4">
          <label className="text-white font-bold font">Select Category</label>
          <select
            id="category"
            style={{ background: "#242424", color: "#ffffff" }}
            className="border text-center rounded-md p-1 w-full h-12"
            onChange={handleCategoryChange}
          >
            <option value="">All Categories</option>
            {categories.length === 0 ? (
              <option disabled>No categories available</option>
            ) : (
              categories.map((cate) => (
                <option key={cate.id} value={cate.id}>
                  {cate.name}
                </option>
              ))
            )}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap lg:w-3/4 md:w-3/4 px-0">
        {loading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="border w-80 m-2 rounded-lg border-slate-700 p-7 animate-pulse"
            >
              <CardPlacehoderSkeleton />
            </div>
          ))
        ) : products.length === 0 ? (
          <div className="text-white text-2xl overflow-auto font-bold shadow-lg p-4 border rounded-lg h-20 m-20">
            NO DATA AVAILABLE
          </div>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="border w-80 m-2 rounded-lg border-slate-600 p-5 h-[370px]  hover:border-white lg:items-center"
            >
              <Link to={`/products/${product.id}`} key={product.id}>
                <div className="relative flex flex-col transition duration-300 ease-in-out transform hover:scale-105 text-gray-700 bg-gray-100 shadow-md bg-clip-border rounded-xl">
                  <div className="relative mx-2 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-36">
                    <img
                      src={product.images[0]}
                      alt="card-image"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                        {product.title}
                      </p>
                      <p className="block font-sans font-bold text-base antialiased  leading-relaxed text-blue-gray-900">
                        ${product.price}
                      </p>
                    </div>
                    <p
                      className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75 overflow-hidden"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {product.description}
                    </p>
                  </div>
                  <div className="p-6 pt-0">
                    <button className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 border border-gray-300 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100">
                      Add to cart
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
