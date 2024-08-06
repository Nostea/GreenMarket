import { useContext, useEffect } from "react";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductsByCategory.css";
import { ProductContext } from "../../Context/Contexts";
import { backendUrl } from '../../api/api';

const ProductsByCategory = ({ activeCategory }) => {
  const { products, setProducts } = useContext(ProductContext);

  useEffect(() => {
    fetch(`${backendUrl}/api/v1/products/getProductByCategory/${activeCategory._id}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [activeCategory]);

  if (!products) return "Loading...";

  return (
    <section className="topdeals-container">
      <h1>{activeCategory.name}</h1>
      <div className="product-cards">
        {products?.map((item, index) => (
          <ProductCard
            key={index}
            imageUrl={item.image}
            productName={item.name}
            price={item.price}
            rating={item.rating}
            id={item._id}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductsByCategory;
