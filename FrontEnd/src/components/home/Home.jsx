import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "../post/Post";
import "./Home.css";

function DataFetchingComponent({ setCart, cart }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No authentication token found.");

        const response = await axios.get("http://localhost:5000/user/allpost", {
          headers: { authorization: `Bearer ${token}` },
        });
        setData(response.data.allPost);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const addToCart = (item) => {
    const itemInCart = cart.find((cartItem) => cartItem.id === item.id);

    if (itemInCart) {
      // If the item is already in the cart, just increase the quantity
      const updatedCart = cart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      setCart(updatedCart);
    } else {
      // If the item is not in the cart, add it with a quantity of 1
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  return (
    <div className="data">
      {data.map((elem, index) => (
        <Post
          prop={elem}
          key={index}
          addToCart={addToCart}
          setData={setData}
          data={data}
        />
      ))}
    </div>
  );
}

export default DataFetchingComponent;
