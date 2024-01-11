import React, { useEffect, useState } from 'react';
import { Grid, Typography, List, ListItem, Paper } from '@mui/material';
import axios from "axios"
import { Link } from 'react-router-dom';



const Plats = () => {
    const [platsData, setPlatData] = useState([]);
    const [category, setaCategory] = useState([]);

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
                <Paper elevation={3} style={{
                    padding: '20px',
                    backgroundColor: '#8952e7ff',
                    color: 'white',
                    minHeight: "200px"
                }}>
                    <List>
                        {category.map(({ _id, name }) => (
                            <div key={_id}>
                                <Typography variant="h2" style={{ fontSize: '1.5rem' }}>
                                    -{name}
                                </Typography>
                                {platsData
                                    .filter(({ category }) => category.name === name)
                                    .map(({ _id, title }) => (
                                        <ListItem key={_id} ><a style={{textDecoration:'none', color:'white' , fontWeight:'200'  }} href={`/recipe/details/${_id}`} >{title}</a></ListItem>
                                    ))
                                }
                            </div>
                        ))}
                    </List>
                </Paper>
            </Grid>

            {/* Section droite avec la présentation de quelques plats */}
            <Grid item xs={12} md={8}>
                <Paper elevation={3} style={{
                    padding: '20px',
                    backgroundColor: 'whitesmoke',
                    color: 'black',
                    minHeight: "200px"
                }}>
                    <Typography variant="h2" style={{ fontSize: '1.5rem' }}>
                        Présentation de Quelques Plats
                    </Typography>
                    <Grid container spacing={2}>
                        {platsData.slice(0,6).map(({ _id, title, description,imageUrl}) => (
                            <Grid item key={_id} xs={6}
                            sx={{
                                position: 'relative',
                                '&:hover::after': {
                                  content: '"'+ title +'"', // Affiche le nom au survol
                                  position: 'absolute',
                                  top: '0',
                                  left: '0',
                                  right: '0',
                                  bottom: '0',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  background: 'rgba(0,0,0,0.7)',
                                  color: 'white',
                                  fontSize: '1.5rem',
                                },
                                '&:hover img': {
                                    filter: 'brightness(70%)', // Assombrit l'image au survol
                                  },
                            }}
                            >
                                <Typography style={{ fontSize: '1rem' }}>{description}</Typography>
                                <img src={imageUrl} alt={title} style={{ width: '70%', height: 'auto' }} />
                            </Grid>
                        ))}
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default Plats;
