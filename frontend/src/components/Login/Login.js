import React, { useState } from 'react';
import {Grid, Paper, Avatar, TextField, Button, Typography} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link, useHistory } from 'react-router-dom';



const Login = ({userData, ActivateUser}) => {
    
    let history = useHistory();
    const [currentUserName, setCurrentUserName] = useState("");
    const [currentUserPassword, setCurrentUserPassword] = useState("");
    const [errorFlag, setErrorFlag] = useState(false);

    const paperStyle = {padding: "20px", height:"70vh", width:"280px", margin:"20px auto"}
    const avatarStyle = {backgroundColor:"#ad7feb"}
    const btnStyle = {margin:"8px 0"}
    const userNameStyle = {marginBottom:"5px"}
    const navstyle ={textDecoration:"none"}
    const errorContainer = {backgroundColor: "#fc0330", color:"white", fontWeight:"bold", textAlign:"center", marginTop:"60px", paddingTop:"10px", paddingBottom:"10px"}


    const preventDefaultSubmit = (e) => {
       e.preventDefault();
       const CurrentAccountHolder = userData.find(x => (x.email === currentUserName) && (x.password === currentUserPassword))
       if(CurrentAccountHolder){
        console.log("current login is")
        console.log(CurrentAccountHolder)
        ActivateUser(CurrentAccountHolder)
        history.push('/appview')
        setErrorFlag(false)
       }
       else{
        setErrorFlag(true)
       }
       setCurrentUserName("")
       setCurrentUserPassword("")
    }
   

    return (
        <Grid container>
            <Paper elevation={10} style={paperStyle}>
              <Grid align="center">
               <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
               <h2>Sign In</h2>
              </Grid>
              <form onSubmit={(e) => {preventDefaultSubmit(e)}}>
                <TextField required={true} label="Email" value={currentUserName} placeholder="Enter email" style={userNameStyle} id="standard-User" onChange={(e) =>{setCurrentUserName(e.target.value)}} fullWidth />
                <TextField required={true} label="Password" value={currentUserPassword} placeholder="Enter Password" id="standard-Password" type="password" onChange={(e) =>{setCurrentUserPassword(e.target.value)}} fullWidth />
                <Button type="submit"  variant="contained" color="primary" style={btnStyle} fullWidth>Sign in</Button>
              </form>
              <Typography>Not registered ? <Link to="/" style={navstyle}>Sign Up</Link></Typography>
              {errorFlag == true ?<div style={errorContainer}>The input credentials are Incorrect!!</div> : null}
            </Paper>
        </Grid>
    )
}

export default Login;