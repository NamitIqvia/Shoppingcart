//import * as React from 'react';
import React, { useState, useEffect } from 'react';
import Products from './components/products/products';
import Navbar from './components/Navbar/Navbar';
import Cart from './components/Cart/Cart';
import { Link, useHistory } from 'react-router-dom';

function ApplicationView({userData, inActivateUser, updateUserBucket}) {

  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [cartItemNumber, setCartItemNumber] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [displayCart, setDisplayCart] = useState(false);

  const getItems = async () => {
    const response = await fetch('http://localhost:8000/api/robots')
    let robotData = await response.json();

    setItems(robotData.data)
    setFilteredItems(robotData.data)
    console.log("data below")
    console.log(robotData.data)
  }

  const reduceStock = (product) => {
     const productPresent = items.find(dispProduct => dispProduct.name === product.name)
     if(productPresent){
      productPresent.stock = productPresent.stock -1 
     }
  }

  const increaseStock = (product) => {
    const productPresent = items.find(dispProduct => dispProduct.name === product.name)
    if(productPresent){
     productPresent.stock = productPresent.stock +1 
    }
 }

  const cartNotification = () => {
    let totalNumber = 0
    cartItems.forEach((item) => {
      totalNumber = totalNumber + parseInt(item.qty)
    })
    return totalNumber
  }

  const onAdd = (product) => {
    let currentNumberOfItemsInCart = cartNotification()
    setShowAlert(false);
    if(currentNumberOfItemsInCart < 5){
    
     const {name, image, price, stock} = product
     const exists = cartItems.find(x => x.name === product.name)
     if(exists){
      setCartItems(cartItems.map(x => x.name === product.name ? {...exists, qty: exists.qty + 1, stock: product.stock -1 } : x))
     }
     else{
      //setCartItems([...cartItems, {name, image, price, qty:1}])
      setCartItems([...cartItems, {...product, qty:1, stock: product.stock -1 }])
     }
     reduceStock(product)
     setCartItemNumber(cartItemNumber + 1);
    }
    else{
      setShowAlert(true);
    }

     console.log("Cart array")
     console.log(cartItems)
  }

  const onRemove = (product) => {
    setShowAlert(false);
    const exists = cartItems.find(x => x.name === product.name)
    if(exists.qty === 1){
      setCartItems(cartItems.filter((x) => x.name !== product.name))
    }
    else{
      setCartItems(cartItems.map(x => x.name === product.name ? {...exists, qty: exists.qty - 1, stock: product.stock +1} : x))
    }
    increaseStock(product)
  }

  
  const filterUi = (event) => {
    setShowAlert(false);
    let filterResults = []
    let finalFilterArray = []
    console.log(event.target.value)
    let SelectedValue = event.target.value
    if(SelectedValue !== "Material"){
    filterResults = items.map((item) => {
       if(item.material === SelectedValue){
           return item
       }
    })
    finalFilterArray = filterResults.filter((item) => item !== undefined)
  }
  else{
      finalFilterArray = items
  }
    console.log("filtered results")
    console.log(finalFilterArray)

    setFilteredItems(finalFilterArray)
 }


 const showCart = () => {
  setShowAlert(false);
  setDisplayCart(!displayCart)
 }

 const hideCart = () => {
  setShowAlert(false);
  setDisplayCart(false)
 }

 

  useEffect(() => {
    getItems()
  }, [])

  //console.log(items)
  let numberVal = cartNotification()

  return (
    <div className="App">
       {showAlert === true ? alert("Cannot add more than 5 items") : null}
        <Navbar numberOfItems={numberVal} itemsList={items} filterItems={filterUi} showCart={showCart} userData={userData} inActivateUser={inActivateUser} />
       {displayCart === true ?<Cart cartItems={cartItems} onAdd={onAdd} hideCart={hideCart} onRemove={onRemove} userData={userData} updateUserBucket={updateUserBucket} /> : <Products items={filteredItems} onAdd={onAdd} />} 
    </div>
  );
}

export default ApplicationView;
