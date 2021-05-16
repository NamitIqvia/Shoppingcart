import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, Button} from '@material-ui/core';
import useStyles from './styles';

const CartItem = ({ item, onAdd, onRemove }) => {
    const classes = useStyles()

    return (
        <Card>
            <CardMedia image={item.image} alt={item.name} className={classes.media} />
            <CardContent>
                <div className={classes.cardContent}>
                 <Typography variant="h4">{item.name}</Typography>
                 <Typography variant="h5">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(item.price)}</Typography>
                </div>
                <div>
                  <Typography variant="body1">Stock :{item.stock}</Typography>  
                </div>
            </CardContent>

            <CardActions className={classes.cartActions}>
                 <div className={classes.buttons}>
                     <Button type="button" size="small" onClick={() => {onRemove({name:item.name, image:item.image, price:item.price, stock:item.stock})}}>-</Button>
                     <Typography>{item.qty}</Typography>
                     <Button type="button" size="small" disabled={item.stock <= 0 ? true : false} onClick={() => {onAdd({name:item.name, image:item.image, price:item.price, stock:item.stock})}}>+</Button>
                 </div>
            </CardActions>
        </Card>
    )
}

export default CartItem
