import React from 'react'
import RecipeDetails from './recette'
import { useParams } from 'react-router-dom';

const DetailRecipes = () => {
    const { id } = useParams();
  return (
    <div>
         <RecipeDetails id={id} />
    </div>
  )
}

export default DetailRecipes