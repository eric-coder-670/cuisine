import React, { useEffect, useState } from 'react';
import RestaurantMenu from '../../components/restaurantMenu';
import axios from "axios"
import ErrorComponent from '../../components/ErrorComponent';


const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [error, setError] = useState(null);

  const fetchMenu = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/list/recipes?limit=9`);
      const { recipes } = response.data;
      setMenu(recipes);
    } catch (error) {
      setError("Une erreur est survenue lors du chargement du menu. Veuillez vérifier votre connexion Internet et réessayer.");
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);
  
  return (
    <div>
    <h2>Menu du Restaurant</h2>
    {error ? (
      <div>
      <ErrorComponent message={error} /></div>
    ) : (
      <RestaurantMenu menuImages={menu} />
    )}
  </div>
  );  
};

export default Menu;
