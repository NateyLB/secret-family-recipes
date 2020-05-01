import React, {useState} from "react"

import {axiosWithAuth} from '../utils/axiosWithAuth'

export default function RecipeCard(props){
    let recipe=props.recipe

    //state for our editted Recipe
    const [editRecipe, setEditRecipe] = useState(recipe)
    //state for out edit, false is not editing true is editing
    const [edit, setEdit] = useState(false)
    //handle form changes
    const handleChange = event => {
        setEditRecipe({ ...editRecipe, [event.target.name]: event.target.value })
        console.log({editRecipe})
        console.log({recipe})
    };
    const changeIngredient = function (event) {
        editRecipe.ingredients[event.target.id] = { ...editRecipe.ingredients[event.target.id], [event.target.name]: event.target.value }
    }
    const directionsChange = function (event) {
        editRecipe.directions[event.target.id] = { direction: event.target.value }
    }

    const submitEdit = event =>{
        event.preventDefault();
        axiosWithAuth()
            .put(`https://secret-family-recipes-bw.herokuapp.com/api/users/:userId/recipes/:recipeId${recipe.id}`, editRecipe)
            .then(res => {
                setEdit(false);
                props.setRecipes(res.data)
            })
            .catch(err =>console.log(err))

    }
    return(
        edit === false ?
        <div className="cardContainer">
            <h1>{recipe.recipeName}</h1>
            
            <img src={recipe.imageURL} />
            <div className="infoContainer">
                <p>Preparation Time: {recipe.prepTime}</p>
                <p>Cook Time: {recipe.cookTime}</p>
                <p>Yields: {recipe.yields}</p>
            </div>
            <h4>{recipe.description}</h4>
            
                <h3>Ingredients:</h3>
                <ul className="ingredientsList">
                    {/* {
                        recipe.ingredients.map(function(ingredient){
                            return(
                                    <li>{ingredient.amount} - {ingredient.ingredientName}</li>
                            )
                    
                        })
                    } */}
                </ul>
                
                <h3>Directions:</h3>
                <ol className="directionsList">
                    {/* {
                        recipe.directions.map(function(direction){
                            return(
                                    <li>{direction.direction}</li>
                            )
                    
                        })
                    } */}
                </ol>
                
            
            <div>
                <button onClick={() => props.deleteRecipe(props.userID, recipe.id)}> Delete</button>
                <button onClick={() => setEdit(!edit)}> Edit</button>
            </div>
        </div>:
        <form className="cardContainer">
            <div><input type='text' name='recipeName'value={editRecipe.recipeName} onChange={handleChange} /></div>
            
            <img src={recipe.imageURL} />
            <div><input type='text' name='imageURL' value={editRecipe.imageURL} onChange={handleChange} /></div>
            <div className="infoContainer">
                <p>Preparation Time: <input type='text' name='prepTime' value={editRecipe.prepTime} onChange={handleChange}/></p>
                <p>Cook Time: <input type='text' name='cookTime' value={editRecipe.cookTime} onChange={handleChange}/></p>
                <p>Yields: <input type='text' name='yields' value={editRecipe.yields} onChange={handleChange}/></p>
            </div>
            <h4><input type='text' name='description' value={editRecipe.description} onChange={handleChange}/></h4>
            
                <h3>Ingredients:</h3>
                <ul className="ingredientsList">
                    {/* {
                        recipe.ingredients.map(function(ingredient, id){
                            return(
                                    <li><input type='text' name='ingredientName' id={id} value={ingredient.ingredientName} onChange={changeIngredient}/>
                                      - 
                                     <input type='text' name='amount' id={id} value={ingredient.amount} onChange={changeIngredient}/>
                                    </li>
                            )
                    
                        })
                    } */}
                </ul>
                
                <h3>Directions:</h3>
                <ol className="directionsList">
                    {/* {
                        recipe.directions.map(function(direction,id){
                            return(
                                    <li><textarea type='text' name='direction' id={id} value={direction.direction} onChange={directionsChange}/></li>
                            )
                    
                        })
                    } */}
                </ol>
                
            
            <div>
                <button onClick={event => {
                    event.preventDefault()
                    props.editRecipe(props.userID, recipe.id, editRecipe)
                    setEdit(!edit)
                    }}>Save</button>
                <button onClick={event => {
                    event.preventDefault()
                    setEdit(!edit)
                    }}>Cancel</button>
            </div>
        </form>
    )
}