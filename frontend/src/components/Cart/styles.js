import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  title: {
    marginTop: '5%',
  },
  link: {
    textDecoration: 'none',
  },
  cardDetails: {
    textAlign: 'left',
    marginBottom: '20px'
  },
  cartNumberPlacement: {
    marginBottom:"10px"
  }
}));
