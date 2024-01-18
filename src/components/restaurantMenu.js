import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const RestaurantMenu = ({ menuImages }) => {
  const history = useNavigate();  // Utilisez useHistory pour accéder à l'objet d'historique

  const handleImageClick = (_id) => {
    history(`/recipe/details/${_id}`);
  };

  return (
    <Box>
      <Grid className='wrapper' container spacing={2}>
        {menuImages.map(({ _id, title, imageUrl, description }) => (
          <Grid item xs={12} sm={6} md={4} key={_id}  >
            <Card sx={{
              maxWidth: 345,
              minHeight: 270,
            }}
              onClick={() => handleImageClick(_id)}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="160"
                  image={`${imageUrl}`}
                  alt={title}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{
                      color: "#673ab7",
                      fontSize:'800'
                    }}
                  >
                    {title}
                  </Typography>
                  <Typography variant="body2"
                    color="text.secondary"
                    sx={{
                      maxWidth: '800px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
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
