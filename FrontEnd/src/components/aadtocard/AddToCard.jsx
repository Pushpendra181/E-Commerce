import React, { useState, useEffect } from "react";
import "./AddToCard.css";

const AddToCart = ({ cart, setCart }) => {
  const [totalPrice, setTotalPrice] = useState(0);

  // Update total price whenever the cart changes
  useEffect(() => {
    const total = cart.reduce(
      (acc, item) => acc + (item.price * (item.quantity || 1)), // Ensure quantity is a valid number
      0
    );
    setTotalPrice(total);
  }, [cart]);

  const removeFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  const increaseQuantity = (index) => {
    const updatedCart = cart.map((item, i) =>
      i === index
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCart(updatedCart);
  };

  const decreaseQuantity = (index) => {
    const updatedCart = cart.map((item, i) => {
      if (i === index && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(updatedCart);
  };

  return (
    <div className="addToCart">
      <h1 className="cart-title">Your Cart</h1>

      {cart.length > 0 ? (
        <>
          {cart.map((item, index) => (
            <div key={index} >
              <img className="cart-item-image" src={item.path} alt={item.description} />
              <h2 className="discription">{item.discription}</h2>
              <p className="cart-item-price">Price: ${item.price}</p>
              <div className="quantity-controls">
                <button className="btn" onClick={() => decreaseQuantity(index)}>-</button>
                <span className="item-quantiy">{item.quantity}</span>
                <button className="inc-btn" onClick={() => increaseQuantity(index)}>+</button>
              </div>

              <button   className="remove-btn"
                onClick={() => removeFromCart(index)}
               > Remove from Cart
              </button>
            </div>
          ))}
          <div className="total-price">
            <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
          </div>
        </>
      ) : (
        <p className="empty">Your cart is empty.</p>
      )}
    </div>
  );
};

export default AddToCart;
