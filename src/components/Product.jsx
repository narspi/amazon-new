import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from 'next/router';
import { StarIcon } from "@heroicons/react/solid";
// import Currency from "react-currency-formatter";
import { useDispatch } from 'react-redux';
import {addToBasket as addToBasketAction } from '../slices/basketSlice';
import hasPrimeImg from '../images/has-prime.png';



const MIN_RATING = 3;
const MAX_RATING = 5;

function Product({item}) {
  const { title, image, category, description, price, rating } = item;
  const ratingCountStar = Math.round(rating.rate);
  const [hasPrime] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();

  
  console.log(router.basePath)
 

  const addToBasket = () => {
    dispatch(addToBasketAction(item));
  }
  
  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>
      {/* <Image src={image} height={200} width={200} objectFit="contain" /> */}
      <h3 className="my-3">{title}</h3>
      <div className="flex text-yellow-500">
        {Array(ratingCountStar)
          .fill(1)
          .map((_, i) => (
            <StarIcon key={i} className="h-5" />
          ))}
      </div>
      <p className="text-xs my-2 line-clamp-2">{description}</p>
      <div className="mb-5">
        {/* <Currency quantity={price}/> */}
      </div>
      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <img
            className="w-12"
            src={hasPrimeImg.src}
            alt="prime"
          />
          <p className="text-xs text-gray-500">FREE Next-day delivery</p>
        </div>
      )}
      <button onClick={addToBasket} className="mt-auto button">Add to Basket</button>
    </div>
  );
}

export default Product;
