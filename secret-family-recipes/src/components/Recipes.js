import React, { useState, useEffect } from 'react';
import * as yup from 'yup'
import { connect } from 'react-redux';
import Nav from './Nav.js';
import AddRecipe from './AddRecipe'
import RecipeCard from './RecipeCard'
import { getRecipes, addRecipeHeader, addDirections, deleteRecipe, editRecipe } from '../actions/recipesActions.js'
import {axiosWithAuth} from '../utils/axiosWithAuth'



const initialRecipeValues = {
    recipeName: '',
    description: '',
    imageURL: '',
    prepTime: '',
    cookTime: '',
    yields: '',
    ingredients:[],
    directions:[]
}
const initialRecipeErrors = {
    recipeName: '',
    description: '',
    imageURL: '',
    prepTime: '',
    cookTime: '',
    yields: '',
}

const dummyData = [
    {
        recipeName: `Mama's Special Breakfast Burritos`,
        description: `Juicy filled egg, ham, cheese, sausage burritos. Big mamas burritos yummy yummy. Juicy filled egg, ham, cheese, sausage burritos. Big mamas burritos yummy yummy. Juicy filled egg, ham, cheese, sausage burritos. Big mamas burritos yummy yummy`,
        imageURL: 'https://skinnyms.com/wp-content/uploads/2016/10/Zucchini-and-Egg-Breakfast-Burrito-Recipe.jpg',
        prepTime: '10 minutes',
        cookTime: '20 minutes',
        yield: '5 burritos',
        ingredients: [{ingredientName:'Flour', amount:'3 cups'}, {ingredientName:'Flour', amount:'3 cups'}, {ingredientName:'Flour', amount:'3 cups'}, {ingredientName:'Flour', amount:'3 cups'}, {ingredientName:'Flour', amount:'3 cups'}, {ingredientName:'Flour', amount:'3 cups'}, {ingredientName:'Flour', amount:'3 cups'}, {ingredientName:'Flour', amount:'3 cups'}, {ingredientName:'Flour', amount:'3 cups'}, {ingredientName:'Flour', amount:'3 cups'}],
        directions: [{direction: 'stuff everything into a box and into the microwave stuff everything into a box and into the microwavestuff everything into a box and into the microwavestuff everything into a box and into the microwavestuff everything into a box and into the microwavestuff everything into a box and into the microwavestuff everything into a box and into the microwavestuff everything into a box and into the microwavestuff everything into a box and into the microwavestuff everything into a box and into the microwavestuff everything into a box and into the microwavestuff everything into a box and into the microwavestuff everything into a box and into the microwavestuff everything into a box and into the microwavestuff everything into a box and into the microwavestuff everything into a box and into the microwave'},{direction: 'EAT IT'}]
    },
    {
        recipeName: `Big Tyrones Steak Stew`,
        description: 'One swagalicious meal',
        imageURL: 'https://foremangrillrecipes.com/wp-content/uploads/2013/06/featured-ribeye-steak-foreman-grill.jpg',
        prepTime: '5 minutes',
        cookTime: '30 minutes',
        yield: '1 big ol steak',
        ingredients: [{ingredientName:'Flour', amount:'3 cups'}, {ingredientName:'Flour', amount:'3 cups'}, {ingredientName:'Flour', amount:'3 cups'}, {ingredientName:'Flour', amount:'3 cups'}, {ingredientName:'Flour', amount:'3 cups'}, {ingredientName:'Flour', amount:'3 cups'}, {ingredientName:'Flour', amount:'3 cups'}, {ingredientName:'Flour', amount:'3 cups'}, {ingredientName:'Flour', amount:'3 cups'}, {ingredientName:'Flour', amount:'3 cups'}, {ingredientName:'Flour', amount:'3 cups'}, {ingredientName:'Flour', amount:'3 cups'}],
        directions: [{direction: 'cook that stuff'},{direction: 'puddit in a pan and sauce that'},{direction: 'Sprinkle a bit of swagger'}]
    }
]
const formSchema = yup.object().shape({
    recipeName: yup
        .string()
        .required('This recipe needs a name!')
        .min(2, 'Recipe name needs atleast 2 characters!'),
    description: yup
        .string()
        .required('You need a description for your delicious recipe!')
        .min(6, 'Your description must be 6'),
    imageURL: yup
        .string()
        .required('You need a url for your image')
        .url('Please enter a valid url for your image.'),
    prepTime: yup
        .string()
        .required('You need to add the Recipe Preparation Time.'),
    cookTime: yup
        .string()
        .required('Cook Time cannot be blank'),
    yields: yup
        .string()
        .required('Please enter a number for the amount of servings this recipe provides.'),
    ingredients: yup
        .string(),
    directions: yup
        .string()
})

const Recipes = (props) => {
    const [recipes, setRecipes] =useState() //This is for recieving and displaying the backend recipes
    const [newRecipe, setNewRecipe] = useState({
        recipeName: '',
        description: '',
        imageURL: '',
        prepTime: '',
        cookTime: '',
        yields: '',
        ingredients:[],
        directions:[]
    })
    const [ingredients, setIngredients] = useState([])
    const [directions, setDirections] = useState([])

    const [addRecipe, setAddRecipe] = useState( false)
    
    const [recipeErrors, setRecipeErrors] = useState(initialRecipeErrors)
    const [submitDisabled, setSubmitDisabled] = useState(true)

    const deleteRecipe = id =>{  //For you. Deleting recipes. And updating the rendered list.
        axiosWithAuth()
        .delete(`/api/users/:userId/recipes/:recipeId${id}`)
        .then(res => setRecipes(res.data))
        .catch(err => console.log(err))
    }
    useEffect(function () {
        props.getRecipes(props.loginData.user_id)
        formSchema.isValid(newRecipe)
            .then(valid => { // either true or false
                setSubmitDisabled(!valid)
            })
    }, [newRecipe])

    const onSubmit = async function (event) {
        event.preventDefault()
        props.addRecipeHeader(props.loginData.user_id, newRecipe) 
        directions.forEach(element =>{
            props.addDirections(element) 
        })
        setNewRecipe(initialRecipeValues)
        setIngredients([])
        setDirections([])
        setAddRecipe(false)
    }
  
    console.log(props.loginData,"after")
    const changeHandler = function (event) {
        const name = event.target.name
        const value = event.target.value
        yup
            .reach(formSchema, name)
            .validate(value)
            .then(valid => {
                // CLEAR ERROR
                setRecipeErrors({
                    ...recipeErrors,
                    [name]: '',
                })
            })
            .catch(error => {
                setRecipeErrors({
                    ...recipeErrors,
                    [name]: error.errors[0]
                })
            })

        setNewRecipe({
            ...newRecipe,
            [name]: value,
        })
    }

    const addIngredient = function (event) {
        event.preventDefault()
        setIngredients([
            ...ingredients,
            { ingredient: "" }
        ])
    }
    // const removeIngredient = function(event){
    //     event.preventDefault()
    //     arrayRemove(ingredients, 1)
    //     console.log(ingredients)
    // }
    const ingredientsChange = function (event) {
   
        ingredients[event.target.id] = { ingredient: event.target.value }
    }

    const addStep = function (event) {
        event.preventDefault()
        setDirections([
            ...directions,
            { step: "" }
        ])
    }
    // const removeStep =function(event){
    //     event.preventDefault()

    // }
    const directionsChange = function (event) {
        directions[event.target.id] = { 
            stepNum: directions.length,
            stepInstruction: event.target.value 
        }
    }
    console.log(props.recipesData.recipes)
    return (
        <>
       <Nav title='Secret Family Recipes'/>
        <div className="recipesContainer">
           { addRecipe == false ? <button onClick={()=>setAddRecipe(true)}>Add a recipe</button>:
            <AddRecipe
                newRecipe={newRecipe} 
                ingredients={ingredients}
                directions={directions}
                addIngredient={addIngredient}
                addStep={addStep}
                changeHandler={changeHandler} 
                ingredientsChange={ingredientsChange}
                directionsChange={directionsChange}
                onSubmit={onSubmit}
                submitDisabled={submitDisabled}
                recipeErrors={recipeErrors}
                setAddRecipe={setAddRecipe}
            />
    }
            {
                props.recipesData.recipes.map(function(recipe){
                    return(
                        <RecipeCard 
                            recipe={recipe}
                            deleteRecipe={props.deleteRecipe}
                            userID={props.loginData.user_id}
                            editRecipe={props.editRecipe}
                        />
                    )
                })
            }
            
        </div>
        </>
    )
}

//data from reducer
const mapStateToProps = state => {
    return {

        loginData: state.recipesAndLoginReducer.recipeShape,
        recipesData: state.recipesAndLoginReducer,
    };
};

export default connect(
    mapStateToProps,
    {
        getRecipes,
        addRecipeHeader,
        addDirections,
        deleteRecipe,
        editRecipe
    }
)(Recipes)