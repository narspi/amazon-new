import React from "react";
import Header from "../src/components/Header";
import CheckoutProduct from "../src/components/CheckoutProduct";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectItems,selectTotal } from "../src/slices/basketSlice";
import { useSession } from "next-auth/react";
import { loadStripe } from '@stripe/stripe-js';
import axios from "axios";
import checkoutBanner from '../src/images/prime-day-banner.png';
const stripePromise = loadStripe(process.env.stripe_public_key);

const Checkout = () => {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const { data: session } = useSession();

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;
    const checkoutSession = await axios.post('/api/create-checkout-session',{
      items: items,
      email: session.user.email
    });

    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id
    })

    if (result.error) {
      alert(result.error.message)
    }
  }
  return (
    <div className="bg-gray-100">
      <Header />
      <main className="lg:flex max-w-screen-2xl mx-auto">
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src={checkoutBanner}
            alt="prime day banner"
            width={1020}
            height={250}
            objectFit="contain"
          />
          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">Your Shopping basket</h1>
            {items.length === 0 ? (
              <div>Basket is empty</div>
            ) : (
              items.map((item, i) => (
                <CheckoutProduct key={`key${i}`} item={item} />
              ))
            )}
          </div>
        </div>
        <div className="flex flex-col bg-white p-10 shadow-md">
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({items.length} items:)
                <span className="font-bold"> ${total}</span>
              </h2>
              <button
                role="link"
                onClick={createCheckoutSession}
                disabled={!session}
                className={`button mt-2 ${
                  !session &&
                  `from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed 
                  active:from-gray-300`
                }`}
              >
                {!session ? "Sign in to checkout" : "Procced to checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Checkout;
