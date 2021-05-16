//import * as React from 'react';
import React, { useState, useEffect } from 'react';
import ApplicationView from './ApplicationView';
import Login from './components/Login/Login';
import Signup from './components/Register/Signup';
import Payment from './components/Payment/Payment';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {

  const [userData, updateUserData] = useState([]);
  const [signUpRouteCondition, setSignUpRouteCondition] = useState(false);

  const addUsers = (user) => {
       const userExists = userData.find(x => (x.username === user.username)  && (x.email === user.email) && (x.password === user.password) )
       console.log(userExists)
       if(userExists){
        console.log("userExists")
        console.log("Current status of the user data")
        console.log(userData)
        return false;
       }
       else{
        console.log("new user added")
        updateUserData([...userData, user])
        console.log("Current status of the user data")
        console.log(userData)
        return true;
       }
       
  }

  const inActivateUser = (userObject) => {
    updateUserData(userData.map(x => (x.username === userObject.username)  && (x.email === userObject.email) && (x.password === userObject.password) ? {...userObject, active:false } : x))
    console.log("Current inactive status of the user data")
    console.log(userData)
  }

  const ActivateUser = (userObject) => {
    updateUserData(userData.map(x => (x.email === userObject.email) && (x.password === userObject.password) ?  {...userObject, active:true }: x))
    console.log("Current active status of the user data")
    console.log(userData)
  }

  const updateUserBucket = (userObject, totalAmount, totalnumberOfItems) => {
    updateUserData(userData.map(x => (x.email === userObject.email) && (x.password === userObject.password) ?  {...userObject, cost:[...userObject.cost,totalAmount], Items:[...userObject.Items,totalnumberOfItems] }: x))
    console.log("Current active status of the user transactions")
    console.log(userData)
  }


  return (
    <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact render={() => <Signup addUsers={addUsers} />} />
            <Route path="/signin" render={() => <Login userData={userData} ActivateUser={ActivateUser} />} />
            <Route path="/appview" render={() => <ApplicationView userData={userData} inActivateUser={inActivateUser} updateUserBucket={updateUserBucket} />} />
            <Route path="/payment" render={() => <Payment userData={userData} />} />
          </Switch>
        </div>
    </Router>
  );
}

export default App;
