import React, { useEffect, useState } from 'react';
import RestaurantMenu from '../../components/restaurantMenu';
import axios from "axios"


const Menu = () => {
  const [menu, setMenu] = useState([]);
  const apiKey = 'c52bff4eb082421eab6ce3aab455ab3e'; // Use environment variable for API key
  const apiUrl = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=8`;

  const fetchMenu = async () => {
    try {
      //uncomment
      const response = await axios.post(`http://localhost:5000/list/recipes?limit`);
      const { recipes } = response.data
      console.log(recipes);
      setMenu(recipes);
    } catch (error) {
      console.error("Error fetching menu:", error.message);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);



  return (
    <div>
      <h2>Menu du Restaurant</h2>
      {menu.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <RestaurantMenu menuImages={menu} />
      )}
    </div>
  );
};

export default Menu;
