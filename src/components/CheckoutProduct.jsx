import React from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import { useDispatch } from 'react-redux';
import {addToBasket as addToBasketAction,removeFromBasket as removeFromBasketAction } from '../slices/basketSlice';
import hasPrimeImg from '../images/has-prime.png';

const CheckoutProduct = ({ item }) => {
  const { id, title, image, category, description, price, rating, hasPrime } = item;
  const dispatch = useDispatch();
  const addItemToBasket = () => {
    dispatch(addToBasketAction(item));
  }
  const removeItemFromBasket = ()=> {
    dispatch(removeFromBasketAction(id));
  }
  return (
    <div className="grid grid-cols-5">
      <Image src={image} height={200} width={200} objectFit="contain" />
      <div className="col-span-3 mx-5">
        <p>{title}</p>
        <div className="flex text-yellow-500">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5" />
            ))}
        </div>
        <p className="text-xs my-2 line-clamp-3">{description}</p>
        <div className="mb-5">
          ${price}
        </div>
        {hasPrime && (
          <div className="flex items-center space-x-2">
            <img
              loading="lazy"
              className="w-12"
              src={hasPrimeImg.src}
              alt="prime"
            />
            <p className="text-xs text-gray-500">FREE Next-day delivery</p>
          </div>
        )}
      </div>
      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <button className="button" onClick={addItemToBasket}>Add to Basket</button>
        <button className="button" onClick={removeItemFromBasket}>Remove from Basket</button>
      </div>
    </div>
  );
};

export default CheckoutProduct;
