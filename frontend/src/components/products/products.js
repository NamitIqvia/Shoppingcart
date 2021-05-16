import React from 'react';
//import { Grid } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Product from './product';
import useStyles from './productsStyles';




const Products = ({ items, onAdd }) => {

    const classes = useStyles()

    

  return(
  <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justify="center" spacing = {4}>
            {
             items.map((item) => (
                  <Grid item key={item.name} xs={12} sm={6} md={4} lg={3}>
                      <Product product={item} onAdd={onAdd} />
                  </Grid>
             ))
            }  
      </Grid>
  </main>
  );
}

export default Products;
