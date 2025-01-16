import React, { useEffect, useState } from 'react'
import './List.css'
import { url, currency } from '../../assets/assets'
import axios from 'axios';
import { toast } from 'react-toastify';

const List = () => {
  const [list, setList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState('All');

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);

        // Extract unique categories for the filter
        const uniqueCategories = Array.from(new Set(response.data.data.map(item => item.category)));
        setCategories(['All', ...uniqueCategories]);
      } else {
        toast.error("Error fetching list");
      }
    } catch (error) {
      toast.error("Error fetching list");
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, {
        id: foodId,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList(); // Refresh list after removing item
      } else {
        toast.error("Error removing food item");
      }
    } catch (error) {
      toast.error("Error removing food item");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  // Filter the list based on the selected category
  const filteredList = filteredCategory === 'All' 
    ? list 
    : list.filter(item => item.category === filteredCategory);

  return (
    <div className='list add flex-col'>
      <h2>All Foods List</h2>
      <hr></hr>

      {/* Filter Dropdown */}
      <div className="filter-container">
      <p>Filters:</p>
        <label htmlFor="category-filter">Filter by Category:</label>
        <select 
          id="category-filter" 
          value={filteredCategory} 
          onChange={(e) => setFilteredCategory(e.target.value)}
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className='list-table'>
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
        </div>
        {filteredList.map((item, index) => (
          <div key={index} className='list-table-format'>
            <img src={`${url}/images/` + item.image} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{currency}{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
