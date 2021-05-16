import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography, Button } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import useStyles from './styles';
import Filter from './Filter';
import { Link, useHistory} from 'react-router-dom';




const Navbar = ({numberOfItems, itemsList, filterItems, showCart, userData, inActivateUser}) => {
    
    const classes = useStyles();
    let history = useHistory();

    const logout = () => {
        const CurrentAccountHolder = userData.find(x => (x.active === true))
        if(CurrentAccountHolder){
          inActivateUser(CurrentAccountHolder)
          history.push('/signin')
        }
      
    }

  return(
    <>
        <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
            <Typography variant="h6" className={classes.title} color="inherit">
                {/*<img src={} alt="robot" height="25px" className={classes.image} />*/}
                <p height="25px" className={classes.image}>R</p>
                Robot Market
            </Typography>
            <div className={classes.grow} />
            <Filter items={itemsList} filterItems = {filterItems} />
            {/*<Link to="/signin" className={classes.navstyle}>Logout</Link>*/}
            <Button className={classes.navstyle} onClick={() => {logout()}}>Logout</Button>
            <div className={classes.button}>
            <IconButton aria-label="Show cart items" color="inherit">
              <Badge badgeContent={numberOfItems} onClick={showCart} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

    </>
  );
}

export default Navbar;
