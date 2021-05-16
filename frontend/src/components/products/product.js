import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton} from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import useStyles from './productStyles';



let formatDate = (dateStr) => {
    let dateSeparatorValue = dateStr.indexOf('T')
    let nonFormatDate = new Date(dateStr.slice(0, dateSeparatorValue))
    if (!isNaN(nonFormatDate.getTime())) {
      return  (nonFormatDate.getDate() < 10 ? '0'+ nonFormatDate.getDate()  : nonFormatDate.getDate()) + '-' + ((nonFormatDate.getMonth() + 1) < 10 ? '0'+(nonFormatDate.getMonth() + 1) : (nonFormatDate.getMonth() + 1)) + '-' + (nonFormatDate.getFullYear());
  }
}


const Product = ({product, onAdd}) => {


    const classes = useStyles()


    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media} image={product.image} title={product.name} />
               <CardContent>
                  <div className={classes.cardContent}>
                      <Typography variant="h6" gutterBottom>
                         {product.name}
                      </Typography>
                      <Typography variant="h6" gutterBottom>
                         {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(parseFloat(product.price))}
                      </Typography>
                 </div>
                 <Typography variant="body1" color="textPrimary">Create Date : {formatDate(product.createdAt)}</Typography>
                 <Typography variant="body1" color="textPrimary">Stock : {product.stock}</Typography>
                 <Typography variant="body2" color="textSecondary">{product.material}</Typography>
               </CardContent>
               <CardActions disableSpacing className={classes.cardActions}>
                    <IconButton disabled={product.stock <= 0 ? true : false} onClick={() => {onAdd({name:product.name, image:product.image, price:product.price, stock:product.stock})}} aria-label="Add to cart">
                           <AddShoppingCart />
                    </IconButton>
               </CardActions>
       </Card>
    )
}

export default Product
