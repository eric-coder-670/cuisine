import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

const RestaurantMenu = ({ menuImages }) => {
  const [likedItems, setLikedItems] = useState([]);

  const handleLike = (_id) => {
    setLikedItems((prevLikedItems) =>
      prevLikedItems.includes(_id)
        ? prevLikedItems.filter((item) => item !== _id)
        : [...prevLikedItems, _id]
    );
  };

  return (
    <Box>
      <Grid className='wrapper' container spacing={2}>
        {menuImages.map(({ _id, title, image }) => (
          <Grid item xs={12} sm={6} md={4} key={_id}>
            <div className="menu-item" style={{ position: 'relative' }}>
              <img
                src={image}
                alt={title}
                width={'100%'}
                className="menu-image"
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
