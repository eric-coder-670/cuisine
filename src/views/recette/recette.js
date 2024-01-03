import React from "react";
import { Box, Grid, Typography, Paper } from "@mui/material";
import { Card, CardMedia } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarIcon from "@mui/icons-material/Star";
import PeopleIcon from "@mui/icons-material/People";

const RecipeDetails = () => {
    const title = "";
    const imageUrl = "";
    const ingredient = ['sel', 'huile', 'cube', 'ail']
    return (
        <Box sx={{
            zIndex:1
        }}>
            <Typography
                variant="h4"
                gutterBottom
                style={{ color: "#673ab7", marginBottom: "20px", marginLeft: "5px" }}
            >
                {title ? title : "Recette KoKi"}
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
                                {Array.from({ length: 3 }, (_, index) => (
                                    <StarIcon key={index} style={{ verticalAlign: "middle", margin: "0 2px" }} />
                                ))}
                            </div>
                            <Typography variant="h5">
                                4
                                <PeopleIcon style={{ verticalAlign: "middle", marginLeft: "5px" }} />
                            </Typography>
                        </div>
                    </Paper>
                </Grid>

                {/* Petite vidéo */}
                <Grid item xs={12}>
                    <Typography
                        variant="h4"
                        gutterBottom
                        style={{ color: "#673ab7", marginBottom: "20px", marginLeft: "5px" }}
                    >
                        {title ? title : "Recette en vidéo"}
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
                            {ingredient ? ingredient.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            )) : <li>tet1</li>
                            }
                        </ul>
                        <ul>
                            <li>500 g de feuilles de pistache (ou feuilles de manioc) bien lavées et hachées finement</li>
                            <li>2 à 3 tasses de pistaches décortiquées (ou de feuilles de manioc pilées)</li>
                            <li>500 g de viande (poulet, bœuf, poisson, porc, selon vos préférences), coupée en morceaux</li>
                            <li>2 à 3 tasses d'eau</li>
                            <li>2 oignons, hachés</li>
                            <li>2 à 3 tomates, hachées</li>
                            <li>2 à 3 poivrons, hachés</li>
                            <li>2 piments (ajustez selon votre préférence pour le piquant)</li>
                            <li>2 gousses d'ail, écrasées</li>
                            <li>Sel et poivre, selon le goût</li>
                            <li>Noix de palme (quantité selon votre préférence)</li>
                            <li>Huile rouge (ou huile de palme) pour la cuisson</li>
                            <li>Facultatif : épices locales selon votre goût</li>

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
                        {/* <ol>
                            {steps ? steps.map((step, index) => (
                                <li key={index}>{step}</li>
                            )) : <li>test</li>}
                
                            </ol> */
                        }
                        <ol>
                            <li>Dans une grande casserole, faites bouillir les pistaches décortiquées (ou les feuilles de manioc pilées) dans de l'eau pendant environ 10 à 15 minutes. Égouttez et réservez.</li>
                            <li>Dans une autre casserole, faites chauffer l'huile rouge ou l'huile de palme.</li>
                            <li>Ajoutez les oignons, l'ail, les tomates et les poivrons. Faites revenir jusqu'à ce qu'ils soient tendres.</li>
                            <li>Ajoutez la viande coupée en morceaux et faites-la dorer.</li>
                            <li>Ajoutez les feuilles de pistache hachées dans la casserole et mélangez bien.</li>
                            <li>Incorporez les pistaches décortiquées ou les feuilles de manioc pilées dans le mélange.</li>
                            <li>Versez l'eau et ajoutez les piments, le sel et le poivre selon votre goût. Mélangez bien.</li>
                            <li>Ajoutez les noix de palme dans le mélange. Si vous utilisez des noix de palme fraîches, vous pouvez les presser pour extraire l'huile.</li>
                            <li>Laissez cuire à feu moyen pendant environ 30 à 45 minutes, en remuant de temps en temps. Ajoutez de l'eau au besoin pour obtenir la consistance désirée.</li>
                            <li>Le Okok Beti est prêt lorsque les feuilles sont bien cuites et le mélange est onctueux.</li>
                            <li>Servez le Okok Beti chaud avec du plantain cuit à la vapeur, du riz ou d'autres accompagnements de votre choix.</li>
                        </ol>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default RecipeDetails;



