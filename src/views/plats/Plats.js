import React from 'react';
import { Grid, Typography, List, ListItem, Paper } from '@mui/material';
import RestaurantMenu from '../../components/restaurantMenu';

const Plats = () => {
    // Exemple de données pour les plats
    const platsData = [
        { id: 1, nom: 'Plat 1', description: 'Description du plat 1' },
        { id: 2, nom: 'Plat 2', description: 'Description du plat 2' },
    ];


    return (
        <Grid container spacing={1}>
            {/* Section gauche avec la liste des plats */}
            <Grid item xs={12} md={4}>
                <Paper elevation={3} style={{
                      padding: '20px',
                      backgroundColor:'#8952e7ff',
                      color:'white'
                }}>
                    <Typography variant="h2" style={{ fontSize: '1.5rem' }}>
                        Liste des Plats
                    </Typography>
                    <List>
                        {platsData.map((plat) => (
                            <ListItem key={plat.id}>{plat.nom}</ListItem>
                        ))}
                    </List>
                </Paper>
            </Grid>

            {/* Section droite avec la présentation de quelques plats */}
            <Grid item xs={12} md={8}>
                <Paper elevation={3} style={{
                    padding: '20px',
                    backgroundColor: 'whitesmoke',
                    color: 'black'
                }}>
                    <Typography variant="h2" style={{ fontSize: '1.5rem' }}>
                        Présentation de Quelques Plats
                    </Typography>
                    <Grid container spacing={2}>
                        {platsData.slice(0, 2).map((plat) => (
                            <Grid item key={plat.id} xs={12} >
                                <Typography variant="h3" style={{ fontSize: '1.2rem' }}>
                                    {plat.nom}
                                </Typography>
                                <Typography style={{ fontSize: '1rem' }}>{plat.description}</Typography>
                            </Grid>
                        ))}
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default Plats;
