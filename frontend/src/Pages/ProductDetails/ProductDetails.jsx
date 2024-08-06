import "./ProductDetails.css";
import GoBack from "./../../Components/GoBack/GoBack";
import CartIcon from "../../../public/cart.png";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { backendUrl } from "../../api/api";
import { useAuth } from "../../Context/AuthProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    fetch(`${backendUrl}/api/v1/products/getProductById/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const addToCart = () => {
    if (!token) {
      navigate("/login");
      retrun;
    }
    fetch(`${backendUrl}/api/v1/cart/addToCart`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId: id,
        quantity: quantity,
      }),
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then(
        toast.success("You successfully added this item to your cart!", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          // transition: Bounce,
        })
      )
      .catch((error) => console.log("Error adding item ", error));
  };

  return (
    <section className="productdetails-container">
      <GoBack title={"Back"} />
      <div className="details-top">
        <img
          src={`${backendUrl}/api/v1/uploads/product-images/${product?.image}`}
          alt="Product Image"
        />
        <p className="product-weight-btn">
          {quantity}
          {product?.unit}
        </p>
        <p className="product-price">
          ${(product?.price * quantity).toFixed(2)}
        </p>
        <h1 className="product-name">{product?.name}</h1>
        <div className="product-rating">
          <i className="fa-solid fa-star"></i>
          <p>{product?.rating.toFixed(1)}</p>
          <p>Reviews ({product?.ratingAmount})</p>
        </div>
      </div>
      <div className="balken"></div>
      <div className="details-bottom">
        <p>Quantity</p>
        <div className="details-amount">
          <i
            className={`fa-solid fa-square-minus ${
              quantity === 1 ? "disabled" : ""
            }`}
            onClick={handleDecrement}
          ></i>
          <p className="item-amount">{String(quantity).padStart(2, "0")}</p>
          <i className="fa-solid fa-square-plus" onClick={handleIncrement}></i>
        </div>
        <img src={CartIcon} alt="Cart Icon" />
      </div>
      <button className="btn-light" onClick={() => addToCart()}>
        Add to Cart
      </button>
    </section>
  );
};

export default ProductDetails;
