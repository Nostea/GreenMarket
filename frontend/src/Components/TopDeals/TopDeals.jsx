import { useContext, useEffect } from "react";
import ProductCard from "../ProductCard/ProductCard";
import "./TopDeals.css";
import { ProductContext } from "../../Context/Contexts";
import { backendUrl } from "./../../api/api";

const TopDeals = () => {
  const { products, setProducts } = useContext(ProductContext);

  useEffect(() => {
    fetch(`${backendUrl}/api/v1/products/getAllProducts`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!products) return "Loading...";

  return (
    <section className="topdeals-container">
      <h1>All Products</h1>
      <div className="topdeals-feed">
        {products?.map((item, index) => (
          <ProductCard key={index} imageUrl={item.image} productName={item.name} price={item.price} rating={item.rating} id={item._id} />
        ))}
      </div>
    </section>
  );
};

export default TopDeals;
