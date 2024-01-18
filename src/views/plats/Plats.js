import React, { useEffect, useState } from 'react';
import { Grid, Typography, List, ListItem, Paper, Button, Box } from '@mui/material';
import axios from "axios"
import './style/style.css'
import { useNavigate } from 'react-router-dom';

const Plats = () => {
    const [platsData, setPlatData] = useState([]);
    const [category, setaCategory] = useState([]);
    const history = useNavigate();  // Utilisez useHistory pour accéder à l'objet d'historique

    const detailsPlats = (name) => {
        history(`/details/list/${name}`);
    };
    const fetchPlats = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/list/recipes`);
            const { recipes } = response.data
            console.log(recipes);
            setPlatData(recipes);

        } catch (error) {
            console.error("Error fetching menu:", error.message);
        }

    },
        fetchCtaegory = async () => {
            const response = await axios.post(`http://localhost:5000/list/category`);
            const { categories } = response.data;
            setaCategory(categories);
        };

    useEffect(() => {
        fetchPlats();
        fetchCtaegory();
    }, [])

    return (
        <Grid container spacing={1}>
            {/* Section gauche avec la liste des plats */}
            <Grid item xs={12} md={4}>
                <Paper
                    elevation={3}
                    style={{
                        padding: '20px',
                        backgroundColor: '#8952e7ff',
                        color: 'white',
                        minHeight: "200px"
                    }}
                >
                    <List>
                        {category.map(({ _id, name }) => (
                            <Box key={_id}
                                onClick={() => detailsPlats(name)}
                            >
                                <Typography
                                    variant="h1"
                                    style={{
                                        fontSize: '2rem'
                                    }}

                                >

                                    {name}

                                </Typography>
                                {platsData
                                    .filter(({ category }) => category.name === name)
                                    .map(({ _id, title }) => (
                                        <ListItem key={_id} ><a className='platsItem' href={`/recipe/details/${_id}`} >{title}</a></ListItem>
                                    ))
                                }
                            </Box>
                        ))}
                    </List>
                </Paper>
            </Grid>

            {/* Section droite avec la présentation de quelques plats */}
            <Grid item xs={12} md={8}>
                <Paper
                    elevation={3}
                    className='image-box'

                >
                    <Typography variant="h2" style={{ fontSize: '1.5rem', paddingBottom: '8px' }}>
                        Présentation de Quelques Plats
                    </Typography>
                    <div className='image-container'>
                        <Grid container spacing={2}>
                            {platsData.slice(0, 6).map(({ _id, title, description, imageUrl }) => (
                                <Grid item key={_id} xs={6}

                                >
                                    <div>
                                        {/* <Typography variant='h5' style={{ fontSize: '1rem', color:'blue' }}>{description}</Typography> */}
                                        <img src={imageUrl} alt={title} className='items' />
                                    </div>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default Plats;
