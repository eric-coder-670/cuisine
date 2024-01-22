import React, { useEffect, useState } from 'react';
import { Grid, Typography, List, ListItem, Paper, Pagination, Button, Box } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';


function ListPlats() {
    const [platsDetails, setPlatsDetails] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
     const [error, setError] = useState(null); // Nouvel état pour suivre les erreurs
    const itemsPerPage = 3;
    const { id } = useParams();


    console.log('namePlats', id);
    const fetchPlats = async (_id) => {
        try {
            const response = await axios.post(`http://localhost:5000/list/recipes`);
            const { recipes } = response.data;
            const filteredRecipes = _id ? recipes.filter(({ category }) => category.name === _id) : recipes;

            const recipeDetails = filteredRecipes.map(recipe => ({
                id: recipe._id,
                title: recipe.title,
                imageUrl: recipe.imageUrl,
                description: recipe.description
            }));

            setPlatsDetails(recipeDetails);
            setError(null); // Réinitialiser l'erreur en cas de succès
        } catch (error) {
            console.error("Error fetching menu:", error.message);
            setError("Une erreur est survenue lors du chargement des recettes. Veuillez réessayer plus tard.");
        }
    };

    useEffect(() => {
        fetchPlats(id);
    }, [id]);

    const sliderSettings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedPlats = platsDetails.slice(startIndex, endIndex);

    return (
        <div>
            <Grid container spacing={4}>
                {/* Section gauche avec la liste des plats */}
                <Grid item xs={12} md={12}>
                    <Paper
                        elevation={3}
                        style={{
                            backgroundColor: 'tranparant',
                            color: 'white',
                            height: '35vh',
                            maxWidth: '58rem',
                            margin: 'auto',
                            overflow: 'hidden',
                            display: 'flex'
                        }}
                    >
                    {displayedPlats.length>0&& <div style={{ width: '50%' }}>
                            <Slider {...sliderSettings}>
                                {platsDetails.map((plat, index) => (
                                    <div key={index}>
                                        <img
                                            src={plat.imageUrl}
                                            alt={`plat-${index}`}
                                            style={{
                                                width: '100%',
                                                height: '35vh',
                                                objectFit: 'cover',
                                            }}
                                        />
                                    </div>
                                ))}
                            </Slider>
                        </div>}
                        <div style={{ background: '#8952e7ff', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography variant='h5'>
                                {id}
                            </Typography>
                        </div>
                    </Paper>
                </Grid>

                {displayedPlats.length>0? <>
                   { displayedPlats.map((plat, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index} >
                        <Card>
                            <CardActionArea>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        paddingTop: 2,
                                        borderRadius: '5px'
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        src={plat.imageUrl}
                                        height="160"
                                        alt={`Image ${index + 1}`}
                                        sx={{ width: '85%', borderRadius: 5 }}
                                    />
                                </Box>

                                <CardContent>
                                    <div style={{ marginTop: '10px' }}>
                                        <Typography variant="h6" gutterBottom>
                                            {plat.title}
                                        </Typography>
                                        <Box
                                            sx={{
                                                padding: '0px 5px',
                                            }}>
                                            <Typography variant="body2" color="textSecondary" sx={{
                                                maxWidth: '800px',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }}>
                                                {plat.description}
                                            </Typography>
                                        </Box>
                                        <Box sx={{
                                            display: 'block',
                                            textAlign: 'center',
                                            verticalAlign: 'center',
                                            padding: "0px 5px"
                                        }}>
                                            <Link to={`/recipe/details/${plat.id}`}>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    style={{ marginTop: '10px' }}
                                                >
                                                    Voir la recette
                                                </Button>
                                            </Link>
                                        </Box>
                                    </div>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                )) }
                <Grid item xs={12} md={12} sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    verticalAlign: 'center'
                }}>
                    <Pagination
                        count={Math.ceil(platsDetails.length / itemsPerPage)}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                        style={{ marginTop: '20px' }}
                    />
                </Grid>
                </>
                :<Grid item   md={12}  >
                     <Box
                     sx={{
                        textAlign:'center'
                     }}>
                     <Typography variant="h5" gutterBottom>
                        Désolé aucune recette n'est disponible pour cette catégories! 
                        </Typography>
                     </Box>
                    </Grid>}
            </Grid>
        </div>
    );
}

export default ListPlats;
