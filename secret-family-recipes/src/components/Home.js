import React from 'react';
import Nav from "./Nav.js"


const Home = props =>{
    return(
        <>
        <Nav title='Secret Family Recipes'/>
        <div className="outerContainer">
        <section>
            <p>Welcome to Secret Family Recipes!!</p>
            <img src={require("../common/food.jpg")} alt="table full of different foods"/>
            <p>Do you have favorite recipes that your gram wrote down that are fading? Are you afraid of losing those little receipe cards that hold your best creations?</p>
            <p>Come make an account and have no more fear of losing any precious dinner ideas!</p>
            <img src={require("../common/food2.jpg")} alt="different foods laid out in the shape of a heart"/>
            </section>
            </div>
            </>
    )
}

export default Home;