import React, { useState } from 'react';
import { Container, Typography, Button, Grid} from '@material-ui/core';
import useStyles from './styles';
import CartItem from './CartItem/CartItem';
import { useHistory } from 'react-router-dom';




const Cart = ({cartItems, onAdd, hideCart, onRemove, userData, updateUserBucket}) => {

  let history = useHistory();
  const [numOfRobots, setNumOfRobots] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);


  const totalNumberOfItems = () => {
    let totalNumber = 0
    cartItems.forEach((item) => {
      totalNumber = totalNumber + parseInt(item.qty)
    })

    return totalNumber
  }


  const totalSum = () => {
    let totalAmount = 0
    cartItems.forEach((item) => {
      totalAmount = totalAmount + (parseFloat(item.price) * parseInt(item.qty))
    })
    return totalAmount
  }

  let totalSumNew = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(totalSum())
  let totalItemsNew = totalNumberOfItems()

  const moveToPayment = (totalAmount, totalnumberOfItems) => {
    const CurrentAccountHolder = userData.find(x => (x.active === true))
    console.log("Here user data is iteratable")
    console.log(userData)
    if(CurrentAccountHolder){
       updateUserBucket(CurrentAccountHolder, totalAmount, totalnumberOfItems)
       history.push('/payment')
    }
}

  const classes = useStyles()
  const EmptyCart = () => (
     <Typography variant="subtitle1">No Item in the cart</Typography>
  )

  const FilledCart = () => (
      <>
        <div className={classes.cardDetails}>
           <div>
             <Typography variant="h4">
                 Subtotal: {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(totalSum())}
             </Typography>
          </div>
          <div>
             <Typography variant="h4" className={classes.cartNumberPlacement}>
                 Number of Robots: {totalNumberOfItems()}
             </Typography>
          </div>
          <Button onClick={() => {moveToPayment(totalSumNew, totalItemsNew)}} variant="contained" color="primary">Proceed To Pay</Button>
       </div>
       <Grid container spacing={3}>
           {
             cartItems.map((item) => (
                 <Grid item xs={12} sm={4}>
                    <CartItem item={item} onAdd={onAdd} onRemove={onRemove} />
                 </Grid>
             ))
           }
       </Grid>
      </>
  )
    
  if(!cartItems) return 'Still Loading......';


  return(
    <Container>
         <div className={classes.toolbar}  />
         <button style={{align:'center', backgroundColor:'black', color:'white', borderRadius:'5px', marginTop:'30px'}} onClick={hideCart}>Close Cart</button>
         <Typography className={classes.title} variant="h3" gutterBottom>Shopping Cart</Typography>
         {cartItems.length === 0 ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
}

export default Cart;
