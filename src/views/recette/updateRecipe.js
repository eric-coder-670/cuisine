import React from 'react'
import { useParams } from 'react-router-dom';
import RecipeForm from './create';

const UpdateRecipes = () => {
  return (
    <div>
         <RecipeForm isEdit={true}/>
    </div>
  )
}

export default UpdateRecipes