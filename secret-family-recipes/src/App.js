import React from 'react';
import { Route } from "react-router-dom";

import './App.css';
import './styles.css'
import Home from './components/Home.js'
import About from "./components/About"
import Form from "./components/Form.js"
import Login from "./components/Login.js"
import PrivateRoute from "./components/PrivateRoute.js"
import Recipes from './components/Recipes.js';
function App() {
  // const match = useHistory();
  // useEffect(()=>{
  //   if (localStorage.getItem("token")){
  //     match.push('/recipes/userID')
  //   }
  // },[])
  return (
    <div className="App"> 
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Akronim&family=Dawning+of+a+New+Day&family=Hanalei&display=swap" rel="stylesheet"></link>
      <Route exact path='/'>
        <Home/>
      </Route>
      <Route path='/about'>
        <About />
      </Route>
      <Route path='/login'>
        <Login />
      </Route>
      <Route path='/register'>
        <Form/>
      </Route>
      <PrivateRoute path='/recipes' component={Recipes} />
  
    </div>
    
  );
}

export default App;
