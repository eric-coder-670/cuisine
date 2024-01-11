
import axios from 'axios'

const API_URL = 'http://localhost:5000';

export default class RecipesService {

  static async addRecipes(values) {

    try {
        const response = await axios.post(`${API_URL}/create/recipes`, values, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        // Check if the request was successful
        if (response.status !== 200) {
          throw new Error('Erreur lors de la requête HTTP');
        }
        const data = response.data;
        console.log('Réponse JSON :', data);
  
        console.log('Recette créée avec succès :', data.savedRecipe);
      } catch (error) {
        console.error('Erreur lors de la création de la recette :', error.message);
        // Gérez les erreurs côté client
      }
  }
}
