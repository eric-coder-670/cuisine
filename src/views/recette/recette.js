import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Paper, Button } from "@mui/material";
import { Card, CardMedia } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarIcon from "@mui/icons-material/Star";
import PeopleIcon from "@mui/icons-material/People";
import UpdateIcon from '@mui/icons-material/Update';
import { useNavigate } from 'react-router-dom';
import axios from "axios";


const RecipeDetails = (props) => {
    const [recipeData, setRecipeData] = useState({});
    const { id } = props;
    const history = useNavigate();

    useEffect(() => {
        const fetchRecipeData = async () => {
            try {
                const response = await axios.post(`http://localhost:5000/list/recipes`);
                const { recipes } = response.data;
                const filteredData = recipes.filter(({ _id }) => _id === id);

                if (filteredData.length > 0) {
                    setRecipeData(filteredData[0]); // Récupérez le premier élément du tableau
                } else {
                    setRecipeData(null); // Aucune correspondance trouvée, définissez le state sur null ou une valeur par défaut
                } console.log("rectte", filteredData);
            } catch (error) {
                console.error('Erreur lors de la récupération des données de la recette :', error.message);
            }
        };

        fetchRecipeData();
    }, [id]);

    const { _id, title, imageUrl, ingredients, instructions, description, level } = recipeData;

    const updateRecipes = (_id) => {
        history(`/update/recipes/${_id}`)
    };
    // const etapes = instructions.split(/Etape \d+/).filter((etape) => etape.trim() !== '');
    // console.log(etapes);


    return (
        <Box sx={{
            zIndex: 1
        }}>
            <Typography
                variant="h4"
                gutterBottom
                style={{ color: "#673ab7", marginBottom: "20px", marginLeft: "5px" }}
            >
                {title}
            </Typography>

            <Grid container spacing={2}>
                {/* Photo du menu */}
                <Grid item xs={12}>
                    <Paper
                        elevation={3}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            padding: "10px 8px",
                            textAlign: 'center',
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            backgroundColor: 'rgba(255, 255, 255, 0.8)'

                        }}
                        className="recipe-section"
                    >
                        <div
                            style={{
                                display: 'flex',
                            }}
                        >
                            <img
                                src={imageUrl ? imageUrl : "https://www.editions2015.com/cameroun/images/koki.jpg"}
                                alt={title ? title : ""}
                                style={{
                                    width: "30%",
                                    flex: 1,
                                    maxHeight: '700px',
                                    borderRadius: "8px",
                                }}
                            />
                            <div
                                style={{
                                    width: '70%',
                                    marginLeft: '10px',
                                    padding: '5px 40px',
                                    textAlign: 'justify'
                                }}
                            >
                                <p>
                                    Le Koki est une préparation épicée à base de haricots et d'huile de palme, cuite à la vapeur dans une feuille de bananier fermée. Il est issu des cultures Camerounaises dans les régions de l'Ouest et du Littoral.
                                </p>
                            </div>
                        </div>
                        <div
                            style={{
                                marginTop: "10px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-evenly",
                                margin: '0 100px',
                                padding: '4rem 10rem'
                            }}
                        >
                            <Typography variant="h5">
                                <AccessTimeIcon style={{ verticalAlign: "middle", marginRight: "5px" }} />
                                1h15min
                            </Typography>
                            <div style={{ color: "gold", display: "flex", alignItems: "center" }}>
                                {Array.from({ length: level }, (_, index) => (
                                    <StarIcon key={index} style={{ verticalAlign: "middle", margin: "0 2px" }} />
                                ))}
                            </div>
                            <Typography variant="h5">
                                4
                                <PeopleIcon style={{ verticalAlign: "middle", marginLeft: "5px" }} />
                            </Typography>
                        </div>
                        {/* ... Existing code ... */}
                        <Button variant="contained" sx={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            minWidth: 'unset',
                        }}
                            onClick={() => updateRecipes(_id)}
                        >
                            <UpdateIcon />
                        </Button>
                    </Paper>
                </Grid>

                {/* Petite vidéo */}
                <Grid item xs={12}>
                    <Typography
                        variant="h4"
                        gutterBottom
                        style={{ color: "#673ab7", marginBottom: "20px", marginLeft: "5px" }}
                    >
                        Recette en vidéo
                    </Typography>
                    <Paper elevation={3} className="recipe-section">
                        <Card>
                            <CardMedia
                                component="div"
                                title="Titre de la vidéo"
                                style={{
                                    position: "relative",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: "10px 8px",
                                    backgroundColor: 'rgba(255, 255, 255, 0.8)'
                                }}
                            >
                                {/* Utilisez une vidéo de démonstration à la place de la vidéo externe */}
                                <video
                                    autoPlay
                                    loop
                                    muted
                                    controls
                                    style={{
                                        width: "80%",
                                        height: "50%",
                                        objectFit: "cover",
                                        borderRadius: "8px",
                                    }}
                                >
                                    <source src="https://assets.codepen.io/6093409/river.mp4" type="video/mp4" />
                                    {/* <iframe src="https://www.youtube.com/watch?v=6BFIrr0OuU4" width="500" height="281" frameborder="0" allowfullscreen="true"></iframe> */}
                                </video>
                            </CardMedia>
                        </Card>
                    </Paper>
                </Grid>

                {/* Ingrédients */}
                <Grid item xs={12} md={5}>
                    <Paper
                        elevation={3}
                        sx={{
                            padding: "10px 8px",
                            backgroundColor: 'rgba(255, 255, 255, 0.8)'
                        }}
                        className="recipe-section"
                    >
                        <Typography
                            gutterBottom
                            style={{ color: "#673ab7", marginBottom: "20px", marginLeft: "5px" }}
                            variant="h6">Ingrédients :</Typography>
                        <ul>
                            {ingredients ? ingredients.map((ingredients, index) => (
                                <li key={index}>{ingredients}</li>
                            )) : <li>Aucun ingrdient n'est fournis</li>
                            }
                        </ul>
                    </Paper>
                </Grid>

                {/* Étapes de préparation */}
                <Grid item xs={12} md={7}>
                    <Paper
                        elevation={3}
                        sx={{
                            padding: "10px 8px",
                            backgroundColor: 'rgba(255, 255, 255, 0.8)'
                        }}
                        className="recipe-section"
                    >
                        <Typography
                            gutterBottom
                            style={{ color: "#673ab7", marginBottom: "20px", marginLeft: "5px" }}
                            variant="h6">Étapes de préparation :</Typography>
                        <p>{instructions}</p>
                        {/* {etapes ? etapes.map((step, index) => (
                            <div key={index}>
                                {step.includes('1') || step.includes('2') ? (
                                    <p>{step}</p>
                                ) : (
                                    <ol>
                                        <li>{step}</li>
                                    </ol>
                                )}
                            </div>
                        )) : <p>test</p>} */}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default RecipeDetails;



