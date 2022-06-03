import classes from './CartButton.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
const CartButton = (props) => {
  const cartQ = useSelector(state => state.cart.totalQ);
  const dispatch = useDispatch();
  const cartShowHandler = () => {
    dispatch(uiActions.toggle());
  }

  return (
    <button className={classes.button} onClick={cartShowHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQ}</span>
    </button>
  );
};

export default CartButton;
