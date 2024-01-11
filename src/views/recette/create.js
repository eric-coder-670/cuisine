import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
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
  const [initialValues, setInitialValues] = useState({
    title: '',
    ingredients: [''],
    instructions: '',
    description: '',
    level: 0,
    number_personne:0,
    imageUrl: '',
    videoUrl: '',
    category: '',
  });
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
        return filteredData[0]; // Retournez le premier élément du tableau
      } else {
        return null; // Aucune correspondance trouvée, retournez null ou une valeur par défaut
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données de la recette :', error.message);
      return null;
    }
  };

  useEffect(() => {
    fetchCtaegory();
    const fetchData = async () => {
      const recipeData = await fetchRecipeData();
      console.log('recipe data', recipeData);
      if (recipeData) {
        setInitialValues({
          title: recipeData.title || '',
          ingredients: recipeData.ingredients || [''],
          instructions: recipeData.instructions || '',
          description: recipeData.description || '',
          level: recipeData.level || 0,
          number_personne: recipeData.number_personne || 0,
          imageUrl: recipeData.imageUrl || '',
          videoUrl: '',
          category: recipeData.category || '',
        });
      }
    };

    fetchData();
  }, []);

  console.log(initialValues);

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

  const onSubmit = async (values) => {
    RecipesService.addRecipes(values)
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        await onSubmit(values);
        resetForm(values);
      }}
    >
      {({ values, /* other props */ }) => (
        <Form >
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
                        {values.ingredients.map((ingredient, index) => (
                          <div key={index} className="form-group" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Field
                              type="text"
                              name={`ingredients[${index}]`}
                              className="form-control"
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
                      <Field type="text" name="title" className="form-control"

                      />
                      <ErrorMessage name="title" component="div" className="error-message" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="instructions">Instructions <span className="require">*</span></label>
                      <Field
                        as="textarea"
                        name="instructions"
                        className="form-control"
                        rows={6}  // Nombre de lignes pour augmenter la taille
                        style={{ minHeight: '250px' }}  // Hauteur minimale en pixels
                      />
                      <ErrorMessage name="instructions" component="div" className="error-message" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="description">Description</label>
                      <Field as="textarea"
                        name="description"
                        className="form-control"
                      />
                      <ErrorMessage name="description" component="div" className="error-message" />
                    </div>
                  </div>}

                {next === 1 &&
                  <div>
                    <div className="form-group">
                      <label htmlFor="level">Niveau</label>
                      <Field type="number"
                        name="level"
                        className="form-control"
                      />
                      <ErrorMessage name="level" component="div" className="error-message" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="number_personne">Nombre de personnes</label>
                      <Field type="number" name="number_personne" className="form-control" />
                      <ErrorMessage name="number_personne" component="div" className="error-message" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="imageUrl">URL de l'image</label>
                      <Field type="url"
                        name="imageUrl"
                        className="form-control"
                      />
                      <ErrorMessage name="imageUrl" component="div" className="error-message" />
                    </div>

                    <div className="form-group">

                      <label htmlFor="videoUrl">URL de la vidéo</label>
                      <Field type="url" name="videoUrl" className="form-control" />
                      <ErrorMessage name="videoUrl" component="div" className="error-message" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="category">Catégorie de recette <span className="require" >*</span></label>
                      <Field
                        as="select"
                        id="category"
                        name="category"
                        className="form-control"
                      >
                        <option value="" disabled>Sélectionnez une catégorie</option>
                        {categorys.map(({ _id, name }) => (
                          <option key={_id} value={_id}>{name}</option>
                        ))}
                      </Field>
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
        </Form>
      )}
    </Formik>
  );
};

export default RecipeForm;
