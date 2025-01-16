import React, { useEffect, useState } from 'react';
import './Edit.css';
import { url, currency } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Edit = () => {
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [editingItem, setEditingItem] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    category: '',
    price: '',
    image: null, // Add image field
  });

  // Fetch list of items
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        const items = response.data.data;
        setList(items);
        setFilteredList(items);

        // Extract unique categories for the filter
        const uniqueCategories = Array.from(new Set(items.map(item => item.category)));
        setCategories(['All', ...uniqueCategories]);
      } else {
        toast.error('Error fetching the list');
      }
    } catch (error) {
      console.error('Fetch List Error:', error);
      toast.error('Failed to fetch list');
    }
  };

  const handleEditClick = (item) => {
    setEditingItem(item._id);
    setEditFormData({
      name: item.name,
      category: item.category,
      price: item.price,
      image: null, // Image field is reset for a new upload
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEditFormData((prevState) => ({ ...prevState, image: file }));
  };

  const handleEditSave = async (foodId) => {
    try {
      const formData = new FormData();
      formData.append('id', foodId);
      formData.append('name', editFormData.name);
      formData.append('category', editFormData.category);
      formData.append('price', editFormData.price);
      if (editFormData.image) {
        formData.append('image', editFormData.image); // Add the image to the formData
      }

      const response = await axios.post(`${url}/api/food/edit`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        toast.success('Item updated successfully');
        setEditingItem(null);
        fetchList();
      } else {
        toast.error('Error updating item');
      }
    } catch (error) {
      console.error('Edit Food Error:', error);
      toast.error('Failed to update item');
    }
  };

  const handleDelete = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      if (response.data.success) {
        toast.success('Item deleted successfully');
        fetchList();
      } else {
        toast.error('Error deleting item');
      }
    } catch (error) {
      console.error('Delete Food Error:', error);
      toast.error('Failed to delete item');
    }
  };

  const handleFilterChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);

    if (category === 'All') {
      setFilteredList(list);
    } else {
      const filtered = list.filter(item => item.category === category);
      setFilteredList(filtered);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <h2>Edit Foods List</h2>
      <hr></hr>

      {/* Filter Dropdown */}
      <div className="filter-container">
        <label htmlFor="category-filter">Filter by Category:</label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={handleFilterChange}
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="list-table">
        {/* Table Header */}
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Actions</b>
        </div>
        {/* Table Body */}
        {filteredList.map((item) => (
          <div key={item._id} className="list-table-format">
            <img src={`${url}/images/${item.image}`} alt="Food" />
            {editingItem === item._id ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={editFormData.name}
                  onChange={handleEditChange}
                />
                <select
                  name="category"
                  value={editFormData.category}
                  onChange={handleEditChange}
                >
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  name="price"
                  value={editFormData.price}
                  onChange={handleEditChange}
                />
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <div className="actions">
                  <button onClick={() => handleEditSave(item._id)}>Save</button>
                  <button onClick={() => setEditingItem(null)}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>{currency}{item.price}</p>
                <div className="actions">
                  <button className="cursor" onClick={() => handleEditClick(item)}>Edit</button>
                  <button className="cursor" onClick={() => handleDelete(item._id)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Edit;
