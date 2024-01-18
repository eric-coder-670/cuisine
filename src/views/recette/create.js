import React, { useEffect, useState } from 'react';
import { Formik, Form, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import '../recette/style/style.css'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import {
  Card,
  CardBody,
  Button,
} from "reactstrap";
import RecipesService from '../../services/recipesServices';


const RecipeForm = () => {
  const API_URL = 'http://localhost:5000';
  const [categorys, setaCategorys] = useState([]);
  const [form, setForm] = useState({});
  const [next, setNext] = useState(0);
  const { id } = useParams();

  const Page = (type) => {
    if (type === 'next' && next <= 2) {
      setNext(() => next + 1)
    } else if (type === 'preview' && next >= 1) {
      setNext(() => next - 1)
    } else {
      setNext(0)
    }
  }

  const fetchCtaegory = async () => {
    const response = await axios.post(`${API_URL}/list/category`);
    const { categories } = response.data;
    setaCategorys(categories);
  }
  
  const fetchRecipeData = async () => {
    try {
      const response = await axios.post(`${API_URL}/list/recipes`);
      const { recipes } = response.data;
      const filteredData = recipes.filter(({ _id }) => _id === id);

      if (filteredData.length > 0) {
        setForm(filteredData[0])
      } else {
        return null; // Aucune correspondance trouvée, retournez null ou une valeur par défaut
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données de la recette :', error.message);
      return null;
    }
  };
 console.log('form',form);
  
  useEffect(  () => {
    fetchCtaegory();
    fetchRecipeData();
  }, []);

  const initialValues = {
    title: form.title || '',
    ingredients: form.ingredients || [''],
    instructions: form.instructions || '',
    description: form.description || '',
    level: form.level || 0,
    number_personne: form.number_personne || 0,
    imageUrl: form.imageUrl || '',
    videoUrl: form.videoUrl||'',
    category: form.category || '',
  }


  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Le titre est requis'),
    ingredients: Yup.array()
      .of(Yup.string().required('Champ requis'))
      .min(1, 'Au moins un ingrédient requis'),
    instructions: Yup.string().required('Les instructions sont requises'),
    description: Yup.string().required('La description est requise'),
    level: Yup.number().integer('Le niveau doit être un nombre entier'),
    number_persons: Yup.number().integer('Le nombre de personnes doit être un nombre entier'),
    imageUrl: Yup.string().url('L\'URL de l\'image n\'est pas valide'),
    videoUrl: Yup.string().url('L\'URL de la vidéo n\'est pas valide'),
    category: Yup.string().required('La catégorie est requise'),
  });

  const onSubmit = async (values,{resetForm}) => {
    console.log(values.title);
    // RecipesService.addRecipes(values);
    // setNext(0);
    // resetForm(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={
        onSubmit
       
      }
    >
      {(formik) => (
        <form onClick={formik.handleSubmit} >
          <Card>
            <CardBody>
              {next === 2 && (
                <div>
                  <FieldArray name="ingredients">
                    {({ push, remove }) => (
                      <div style={{ display: 'flex', flexDirection: 'column', padding: '50px' }}>
                        <label style={{ marginBottom: '10px' }}>
                          Ingrédients <span className="require">*</span>
                        </label>
                        {formik.values.ingredients.map((ingredient, index) => (
                          <div key={index} className="form-group" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <input
                              type="text"
                              name={`ingredients[${index}]`}
                              className="form-control"
                               value={ingredient}
                            />
                            <div style={{ marginLeft: '5px', marginRight: '5px' }}>
                              <Button onClick={() => remove(index)}>Supprimer</Button>
                            </div>
                          </div>
                        ))}
                        <div style={{ marginBottom: '20px' }}>
                          <Button onClick={() => push('')}>Ajouter un ingrédient</Button>
                        </div>
                      </div>
                    )}
                  </FieldArray>
                </div>
              )}
              <div>
                {next === 0 &&
                  <div>
                    <div className="form-group">
                      <label htmlFor="title">Titre <span className="require" >*</span></label>
                      <input
                      id='title'
                        type="text"
                        name="title"
                        className="form-control"
                        {...formik.getFieldProps("title")}
                      />
                      <ErrorMessage name="title" component="div" className="error-message" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="instructions">Instructions <span className="require">*</span></label>
                      <textarea
                      id='instructions'
                        name="instructions"
                        className="form-control"
                        rows={6}  // Nombre de lignes pour augmenter la taille
                        style={{ minHeight: '250px' }}  // Hauteur minimale en pixels
                        {...formik.getFieldProps("instructions")}
                      />
                      <ErrorMessage name="instructions" component="div" className="error-message" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="description">Description</label>
                      <textarea
                      id='description'
                        name="description"
                        className="form-control"
                        {...formik.getFieldProps("description")}
                      />
                      <ErrorMessage name="description" component="div" className="error-message" />
                    </div>
                  </div>
                }

                {next === 1 &&
                  <div>
                    <div className="form-group">
                      <label htmlFor="level">Niveau</label>
                      <input
                      id='level'
                        type="number"
                        name="level"
                        className="form-control"
                        {...formik.getFieldProps("level")}
                      />
                      <ErrorMessage name="level" component="div" className="error-message" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="number_personne">Nombre de personnes</label>
                      <input
                      id='number'
                        type="number"
                        name="number_personne"
                        className="form-control"
                        {...formik.getFieldProps("number_personne")}
                      />
                      <ErrorMessage name="number_personne" component="div" className="error-message" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="imageUrl">URL de l'image</label>
                      <input
                        type="url"
                        id='imageUrl'
                        name="imageUrl"
                        className="form-control"
                        {...formik.getFieldProps("imageUrl")}
                      />
                      <ErrorMessage name="imageUrl" component="div" className="error-message" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="videoUrl">URL de la vidéo</label>
                      <input
                        type="url"
                        id='videoUrl'
                        name="videoUrl"
                        className="form-control"
                        {...formik.getFieldProps("videoUrl")}
                      />
                      <ErrorMessage name="videoUrl" component="div" className="error-message" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="category">Catégorie de recette <span className="require" >*</span></label>
                      <select
                        id="category"
                        name="category"
                        className="form-control"
                        {...formik.getFieldProps("category")}
                      >
                        <option value="" disabled>Sélectionnez une catégorie</option>
                        {categorys.map(({ _id, name }) => (
                          <option key={_id} value={_id}>{name}</option>
                        ))}
                      </select>
                      <ErrorMessage name="category" component="div" className="error-message" />
                    </div>
                  </div>
                }

                {next === 2 &&
                  <div className="form-group">
                    <Button type='submit'> Soumettre</Button>
                  </div>
                }
              </div>
            </CardBody>
            <div style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              padding: '0 16px'
            }}>
              <div className="form-group">
                <Button type='button'
                  style={{
                    background: '#2962ff',
                    border: 'none'
                  }}
                  disabled={next <= 0}
                  onClick={() => Page('preview')}
                > preview</Button>
              </div>

              <div className="form-group">
                <Button type='button'
                  style={{
                    background: '#2962ff',
                    border: 'none'
                  }}
                  disabled={next >= 2}
                  onClick={() => Page('next')}
                > next</Button>
              </div>
            </div>
          </Card>
        </form>
      )}
    </Formik>
  );
};

export default RecipeForm;
