import { useState } from "react";
import "./SingleOrder.css";

const SingleOrder = ({ order }) => {
  const [toggle, setToggel] = useState(false);

  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const handleToggle = (orderId) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
    } else {
      setExpandedOrderId(orderId);
    }
  };

  return (
    <section className="singleorder-container">
      {order?.map((singleOrder) => (
        <div key={singleOrder?._id} className="singleorder-card">
          <div className="singleorder-left">
            <h1>{singleOrder?._id?.slice(-6)}</h1>
            <p>{singleOrder?.totalAmount}€</p>
          </div>
          <div className="singleorder-right">
            <div className="singleorder-right-top">
              <p className="singleorder-status">{singleOrder?.orderStatus}</p>
              <p className="singleorder-pay">{singleOrder?.paymentStatus}</p>
            </div>
            <p className="order-date">
              {new Date(singleOrder?.createdAt).toLocaleString()}
            </p>
          </div>
          <div>
            <div className="showmoreless">
              <p onClick={() => handleToggle(singleOrder?._id)}>
                {expandedOrderId === singleOrder?._id
                  ? "show less"
                  : "show more"}
              </p>
              <i
                className={
                  expandedOrderId === singleOrder?._id
                    ? "fa-solid fa-angle-up"
                    : "fa-solid fa-angle-down"
                }
                onClick={() => handleToggle(singleOrder?._id)}
              ></i>
            </div>

            <div
              className={
                expandedOrderId === singleOrder?._id
                  ? "order-products"
                  : "hide-order-products"
              }
            >
              <hr />
              {singleOrder?.products?.map((productItem) => (
                <div key={productItem?._id} className="order-product-item">
                  <h4>{productItem?.name}</h4>
                  <p>Price: {productItem?.price}€</p>
                  <p>Quantity: {productItem?.quantity}</p>
                  <p>
                    Total Product Price:{" "}
                    {productItem?.price * productItem?.quantity}€
                  </p>
                </div>
              ))}
              <hr />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default SingleOrder;
