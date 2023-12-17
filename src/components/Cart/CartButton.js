import { useDispatch } from 'react-redux';
import classes from './CartButton.module.css';
import { CartActions } from '../../Store/CartSlice';

const CartButton = (props) => {
  const dispatch= useDispatch()
  const showCart= ()=>{
dispatch(CartActions.showCartReducer())
  }
  return (
    <button className={classes.button} onClick={showCart}>
      <span>My Cart</span>
      <span className={classes.badge}>1</span>
    </button>
  );
};

export default CartButton;
