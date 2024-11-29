import axios from "axios";
import React, { useEffect, useState } from "react";

const AddPost = () => {
  const [form, setForm] = useState({
    price: "",
    discription: "",
    file: null,
    categoryId: "",
    subcategoryId: "", 
  });

  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: files ? files[0] : value,
    }));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/user/getcategory");
      setCategories(res.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCategoryChange = async (e) => {
    const categoryId = e.target.value;
    setForm((prevForm) => ({ ...prevForm, categoryId, subcategoryId: "" }));

    try {
      const res = await axios.get(
        `http://localhost:5000/user/getsubcategories`
      );
      setSubcategories(res.data.subcategories);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData();
    formData.append("price", form.price);
    formData.append("discription", form.discription); // Updated spelling
    formData.append("image", form.file); // Use "file" from the state
    formData.append("categoryId", form.categoryId);
    formData.append("subcategoryId", form.subcategoryId);

    try {
      const response = await axios.post(
        "http://localhost:5000/user/addpost",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      window.location.href = "/home";
    } catch (err) {
      const errorMessage =
        err.response && err.response.data
          ? err.response.data.message
          : "Failed to add post. Please try again.";
      setError(errorMessage);
      console.error("Error:", err);
    }
  };

  return (
    <div>
      <h1>Add Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>price:</label>
          <input
            type="text"
            name="price"
            onChange={handleChange}
            value={form.price}
            required
          />
        </div>
        <div>
          <label>discription:</label>
          <input
            type="text"
            name="discription" // Corrected spelling here
            onChange={handleChange}
            value={form.discription}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <select
            name="categoryId"
            onChange={handleCategoryChange}
            value={form.categoryId}
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        {subcategories.length > 0 && (
          <div>
            <label>Subcategory:</label>
            <select
              name="subcategoryId"
              onChange={handleChange}
              value={form.subcategoryId}
              required
            >
              <option value="">Select Subcategory</option>
              {subcategories.map((subcategory) => (
                <option key={subcategory.id} value={subcategory.id}>
                  {subcategory.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <div>
          <label>Image:</label>
          <input type="file" name="file" onChange={handleChange} required />
        </div>

        {error && <p className="error-message">{error}</p>}
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
};

export default AddPost;
