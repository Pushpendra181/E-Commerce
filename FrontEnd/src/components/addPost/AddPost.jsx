import axios from "axios";
import React, { useEffect, useState } from "react";
import "./AddPost.css"

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
    <div className="add-post-containe">
      <h1 className="add-post-title">Add Post</h1>
      <form  onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">price:</label>
          <input className="form-input"
            type="text"
            name="price"
            onChange={handleChange}
            value={form.price}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">discription:</label>
          <input className="form-input"
            type="text"
            name="discription" 
            onChange={handleChange}
            value={form.discription}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Category:</label>
          <select className="form-select"
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
          <div className="form-group">
            <label className="form-label">Subcategory:</label>
            <select className="form-select"
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
        <div className="form-group">
          <label className="form-label">Image:</label>
          <input   className='form-select' type="file" name="file" onChange={handleChange} required />
        </div>

        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-button ">Add Post</button>
      </form>
    </div>
  );
};

export default AddPost;
