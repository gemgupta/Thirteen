import { useDispatch } from "react-redux";
import classes from "./CartButton.module.css";
import { CartActions } from "../../Store/CartSlice";
import { useSelector } from "react-redux";
const CartButton = () => {
  const dispatch = useDispatch();
  const quantity= useSelector((state)=>state.CartItems.totalItems)
  const showCart = () => {
    dispatch(CartActions.showCartReducer());
  };
  return (
    <button className={classes.button} onClick={showCart}>
      <span>My Cart</span>
      <span className={classes.badge}>{quantity}</span>
    </button>
  );
};

export default CartButton;
