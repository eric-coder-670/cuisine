import React from 'react';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import '../recette/style/style.css'
import axios from 'axios'
const RecipeForm = () => {

  const initialValues = {
    title: '',
    ingredients: [''],
    instructions: '',
    description: '',
    level: 0,
    personne: 0,
    imageUrl: '',
    videoUrl: '',
    user: '', // Pré-remplissez cet ID en fonction de l'utilisateur connecté
  };


  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Le titre est requis'),
    ingredients: Yup.array()
      .of(Yup.string().required('Champ requis'))
      .min(1, 'Au moins un ingrédient requis'),
    instructions: Yup.string().required('Les instructions sont requises'),
    level: Yup.number().integer('Le niveau doit être un nombre entier'),
    personne: Yup.number().integer('Le nombre de personnes doit être un nombre entier'),
    imageUrl: Yup.string().url('L\'URL de l\'image n\'est pas valide'),
    videoUrl: Yup.string().url('L\'URL de la vidéo n\'est pas valide'),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      console.log(values);
      const response = await axios.post(' http://localhost:5000/create', values, {
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

    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, /* other props */ }) => (
        <Form className="recipe-form">
          <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            color:"white"
          }}>
            <div>
              <FieldArray name="ingredients">
                {({ push, remove }) => (
                  <div>
                    <label>Ingrédients</label>
                    {values.ingredients.map((ingredient, index) => (
                      <div key={index} className="form-group">
                        <Field
                          type="text"
                          name={`ingredients[${index}]`}
                          className="form-control"
                        />
                        <button type="button" onClick={() => remove(index)}>
                          Supprimer
                        </button>
                        <ErrorMessage name={`ingredients[${index}]`} component="div" className="error-message" />
                      </div>
                    ))}
                    <button type="button" onClick={() => push('')}>
                      Ajouter un ingrédient
                    </button>
                  </div>
                )}
              </FieldArray>
            </div>
            <div>
              <div className="form-group">
                <label htmlFor="title">Titre</label>
                <Field type="text" name="title" className="form-control" />
                <ErrorMessage name="title" component="div" className="error-message" />
              </div>
              <div className="form-group">
                <label htmlFor="instructions">Instructions</label>
                <Field as="textarea" name="instructions" className="form-control" />
                <ErrorMessage name="instructions" component="div" className="error-message" />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <Field as="textarea" name="description" className="form-control" />
                <ErrorMessage name="description" component="div" className="error-message" />
              </div>

              <div className="form-group">
                <label htmlFor="level">Niveau</label>
                <Field type="number" name="level" className="form-control" />
                <ErrorMessage name="level" component="div" className="error-message" />
              </div>

              <div className="form-group">
                <label htmlFor="personne">Nombre de personnes</label>
                <Field type="number" name="personne" className="form-control" />
                <ErrorMessage name="personne" component="div" className="error-message" />
              </div>

              <div className="form-group">
                <label htmlFor="imageUrl">URL de l'image</label>
                <Field type="url" name="imageUrl" className="form-control" />
                <ErrorMessage name="imageUrl" component="div" className="error-message" />
              </div>

              <div className="form-group">
                <label htmlFor="videoUrl">URL de la vidéo</label>
                <Field type="url" name="videoUrl" className="form-control" />
                <ErrorMessage name="videoUrl" component="div" className="error-message" />
              </div>

              <div className="form-group">
                <button type="submit" className="btn btn-primary">Soumettre</button>
              </div>
            </div>
          </div>

        </Form>)}
    </Formik>
  );
};

export default RecipeForm;
