import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';

const RestaurantMenu = ({ menuImages }) => {
  const [likedItems, setLikedItems] = useState([]);
  const history = useNavigate();  // Utilisez useHistory pour accéder à l'objet d'historique

  const handleLike = (_id) => {
    setLikedItems((prevLikedItems) =>
      prevLikedItems.includes(_id)
        ? prevLikedItems.filter((item) => item !== _id)
        : [...prevLikedItems, _id]
    );
  };

  const handleImageClick = (_id) => {
    history(`/recipe/details/${_id}`);
  };

  return (
    <Box>
      <Grid className='wrapper' container spacing={2}>
        {menuImages.map(({ _id, title, imageUrl }) => (
          <Grid item xs={12} sm={6} md={4} key={_id}>
            <div className="menu-item" style={{ position: 'relative' }}>
              <img
                src={`${imageUrl}`}
                alt={title}
                width={'100%'}
                className="menu-image"
                onClick={() => handleImageClick(_id)}  // Ajoutez le gestionnaire d'événements pour l'ID de l'image
                style={{ cursor: 'pointer' }}  // Ajoutez un style de curseur pour indiquer que l'image est cliquable
              />
              <div className="menu-overlay">
                <p>{title}</p>
                <IconButton
                  onClick={() => handleLike(_id)}
                  color={likedItems.includes(_id) ? 'secondary' : 'default'}
                  style={{ position: 'absolute', top: '5px', right: '5px' }}
                >
                  <FavoriteIcon />
                </IconButton>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

RestaurantMenu.propTypes = {
  menuImages: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default RestaurantMenu;
