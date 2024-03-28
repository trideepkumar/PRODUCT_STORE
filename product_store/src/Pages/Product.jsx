import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { useParams } from "react-router-dom";

export default function Product() {
  SwiperCore.use([Navigation]);
  const params = useParams();

  const [product, setProduct] = useState(null);

  console.log(product);

  const fetchProduct = async () => {
    try {
      const res = await axiosInstance.get(`/products/${params.id}`);
      setProduct(res.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      {product && (
        <div className="lg:flex md:flex sm:grid ">
          <Swiper
            navigation
            style={{
              width: window.innerWidth <= 768 ? "100vw" : "40vw",
              objectFit: "contain",
              marginTop: window.innerWidth <= 768 ? "0" : "30px",
              padding: "2px",
              borderRadius: "10px",
            }}
            className="sm:w-full lg:w-2/4 md:2/4"
          >
            {product.images.map((url, index) => (
              <SwiperSlide key={index} className="">
                <div className="h-[500px] relative ">
                  <img
                    src={url}
                    alt={`Image ${index}`}
                    className="w-full h-full  object-contain rounded-lg"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className=" flex flex-col my-1 mt-8 mx-6 lg:w-2/4  md:w-2/4 sm:w-full">
            <div
              className="border rounded-lg w-78 my-8 text-white p-1 shadow-lg"
              style={{ background: "#242424" }}
            >
              <div>
                <p
                  className="p-3 text-4xl font-bold text-white sm:text-thin md:text-4xl text-pretty"
                  style={{
                    fontStyle: window.innerWidth <= 768 ? "thin" : "normal",
                    color: "#fffff",
                  }}
                >
                  {product.title}
                </p>
              </div>
              <div>
                <p
                  className="p-3  text-white  text-pretty"
                  style={{
                    fontStyle: window.innerWidth <= 768 ? "thin" : "normal",
                    color: "#fffff",
                  }}
                >
                  Category : {product.category.name}
                </p>
              </div>
              <div>
                <p
                  className="p-3 text-4xl font-bold text-white sm:text-thin md:text-4xl text-pretty"
                  style={{
                    fontStyle: window.innerWidth <= 768 ? "thin" : "normal",
                    color: "#fffff",
                  }}
                >
                  ${product.price}
                </p>
              </div>
              <div>
                <p className="p-3 font-bold underline">DESCRIPTION</p>
                <p
                  className="p-3  text-white  text-pretty"
                  style={{
                    fontStyle: window.innerWidth <= 768 ? "thin" : "normal",
                    color: "#fffff",
                  }}
                >
                  {product.description}
                </p>
              </div>    
            </div>

            <div
              className="border rounded-lg w-78 my-3 text-white p-1 shadow-lg  hover:border-gray-500"
              style={{ background: "#242424" }}
            >
             <button className="w-full m-2  hover:text-gray-400">ADD TO CART</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
