import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const { id } = useParams();
  const Navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    discription: "",
    file: null,
    categoryId: "",
  });
  console.log("form", form);

  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  // console.log("categorie", categories);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    e.preventDefault();
    setError("");

    const formData = new FormData();
    formData.append("username", form.username);
    formData.append("discription", form.discription);
    formData.append("image", form.image); // Append file directly to formData
    formData.append("categoryId", form.categoryId);

    // formData.append("categoryId", form.categoryId); // Correct name for backend
    try {
      const response = await axios.put(
        `http://localhost:5000/user/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      //   const data = response.data;
      Navigate("/home");

      // console.log(data.data);
    } catch (err) {
      const errorMessage =
        err.response && err.response.data
          ? err.response.data.message
          : "Failed to add post. Please try again.";
      setError(errorMessage);
      console.error("Error:", err);
    }
  };
  useEffect(() => {
    const fatchCategories = async (e) => {
      try {
        const res = await axios.get(`http://localhost:5000/user/getcatogory`);
        // console.log(res.data.categories);
        setCategories(res.data.categories);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    const getData = async () => {
      try {
        console.log("gggggggggggggggggg");
        const res = await axios.get(`http://localhost:5000/user/edit/${id}`);
        console.log(res.data);
        setForm(res.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fatchCategories();
    getData();
  }, []);

  return (
    <div>
      <h1>Update Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>UserName:</label>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            value={form.username}
            
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="discription"
            onChange={handleChange}
            value={form.discription}
          />
        </div>
        <div>
          <label>catogoryId:</label>
          <select
            name="categoryId"
            onChange={handleChange}
            value={form.catogoryId}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Image:</label>
          <input type="file" name="image" onChange={handleChange} />
        </div>

        {error && <p className="error-message">{error}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Update;
