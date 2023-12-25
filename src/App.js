import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { sendCartData, fetchCartData } from "./Store/CartActions";
let isInitial = true;
function App() {
  const cart = useSelector((state) => state.CartItems);
  const responseNotification = useSelector((state) => state.Cart.responses);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);
  return (
    <>
      {responseNotification && (
        <Notification
          status={responseNotification.status}
          message={responseNotification.message}
          title={responseNotification.title}
        />
      )}
      <Layout>
        <Cart />
        <Products />
      </Layout>
    </>
  );
}

export default App;
