// import React from "react";
// import "./Post.css"; // Import the CSS file
// import axios from "axios";
// import { Navigate, NavLink } from "react-router-dom";

// const Post = (prop, addToCart) => {
//   const deleteHandler = async (e) => {
//     // e.preventDefault();
//     console.log("delete", prop.prop.id);
//     await axios.delete(`http://localhost:5000/user/delete/${prop.prop.id}`);
//   };

//   // console.log(prop.prop.email);
//   const { discription, price, path, id } = prop.prop;
//   // console.log(path);
//   return (
//     <div className="card">
//       <img src={path} alt="image" className="card-image" />
//       <div className="card-content">
//         <h2 className="name">price : ${price}</h2>
//         <p className="description">Discription : {discription}</p>
//       </div>
//       <form action="" className="buttons">
//         <div>
//           {" "}
//           <NavLink to={`/update/${id}`} className="updateBtn">
//             Update
//           </NavLink>
//         </div>
//         <div>
//           <button onClick={deleteHandler} className="DeleteBtn">
//             Delete
//           </button>
//         </div>
//         <div>
//           <button onClick={() => addToCart(prop)} className="AddToCartBtn">
//             Add to Cart
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Post;

import React, { useEffect } from "react";
import "./Post.css";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Post = ({ prop, addToCart, setData, data }) => {
  const deleteHandler = async () => {
    try {
      await axios.delete(`http://localhost:5000/user/delete/${prop.id}`);
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const { discription, price, path, id } = prop;

  return (
    <div className="Card-continar">
      <div className="card">
      <img src={path} alt="Post" className="card-image" />
      <div className="card-content">
        <h2 className="name">Price: ${price}</h2>
        <p className="description">name: {discription}</p>
      </div>
      <div className="buttons">
        <NavLink to={`/update/${id}`} className="updateBtn">
          Update
        </NavLink>
        <button onClick={deleteHandler} className="DeleteBtn">
          Delete
        </button>
        <button onClick={() => addToCart(prop)} className="AddToCartBtn">
          Add to Cart
        </button>
      </div>
      </div>
    </div>
  );
};

export default Post;
