import React, { useState } from 'react';
import {Grid, Paper, Avatar, TextField, Button, Typography} from '@material-ui/core';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router-dom';



const Payment = ({userData}) => {
    
    let history = useHistory();
    const [cardNumber, setCardNumber] = useState("");
    const [cvv, setcvv] = useState("");
    const [activeAccount, setActiveAccount] = useState({});
    const [cost, setCost] = useState([]);
    const [items, setItems] = useState([]);
    const [showTransactions, setshowTransactions] = useState(false);
    const btnStyle = {margin:"8px 0"}
    const backbtnStyle ={margin:"12px 0"}
    const cardFieldStyle = {marginBottom:"5px"}
    const paperStyle = {padding: "20px", height:"70vh", width:"280px", margin:"20px auto"}
    const avatarStyle = {backgroundColor:"#ad7feb"}

    const moveToMainPage = () => {
        history.push('/appview')
      }

    const preventDefaultSubmit = (e) => {
        e.preventDefault();
        const CurrentAccountHolder = userData.find(x => (x.active === true))
        console.log("The current object is")
        setCost(CurrentAccountHolder.cost)
        console.log("cost is")
        console.log(cost)
        setItems(CurrentAccountHolder.Items)
        console.log("Items are")
        console.log(items)
        setshowTransactions(true)
    }

    

     return (
        <Grid container>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
           <Avatar style={avatarStyle}><MonetizationOnOutlinedIcon /></Avatar>
           <h2>Enter Card Details</h2>
          </Grid>
          <form onSubmit={(e) => {preventDefaultSubmit(e)}}>
            <TextField required={true} label="Card number" value={cardNumber} placeholder="Enter your debit card number" style={cardFieldStyle} id="standard-card" onChange={(e) =>{setCardNumber(e.target.value)}} fullWidth />
            <TextField required={true} label="CVV" value={cvv} placeholder="Enter your cvv" id="standard-cvv" type="password" onChange={(e) =>{setcvv(e.target.value)}} fullWidth />
            <Button type="submit" onClick={(e) => {preventDefaultSubmit(e)}}  variant="contained" color="primary" style={btnStyle} fullWidth>Pay</Button>
            
          </form>
          <Button onClick={() => {moveToMainPage()}}  variant="contained" color="primary" style={backbtnStyle} fullWidth><ArrowBackIcon /> Back To MainPage</Button>
        </Paper>
        
        {showTransactions === true ?(<Paper elevation={10} style={paperStyle}>
           <h2 style={{textAlign:'center'}}>Transactions</h2>
           {
           cost.map((item,index) => (
               <div>
                  <h6>Total price : {item}</h6>
                  <h6>Total Quantity : {items[index]}</h6>
                  <hr />
               </div>

           ))
           }
        </Paper>): null}
        </Grid>
     )
}


export default Payment;