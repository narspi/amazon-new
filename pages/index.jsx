import Head from "next/head";
import Header from "../src/components/Header";
import Banner from "../src/components/Banner";
import ProductFeed from "../src/components/ProductFeed";

export default function Home({products}) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon 2.0</title>
      </Head>
      <Header />
      <main className="max-w-screen-2xl mx-auto">
        <Banner />
        <ProductFeed products={products} />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { getSession } = require("next-auth/react");
  const fs = require("fs");
  const session = await getSession(context);
  const data = await fs.readFileSync("./src/data-products/products.json");
  const products = JSON.parse(data);

  return {
    props: {
      session,
      products,
    },
  };
}

