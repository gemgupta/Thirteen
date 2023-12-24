import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { CartActions } from "./Store/CartSlice";
let isInitial = true;
function App() {
  const cart = useSelector((state) => state.CartItems);
  const responseNotification = useSelector((state) => state.Cart.responses);
  const dispatch = useDispatch();
  useEffect(() => {
    const sendingReq = async () => {
      dispatch(
        CartActions.responseNotification({
          status: "Pending",
          message: "Sending Cart Data",
          title: "sending",
        })
      );
      const response = await fetch(
        "https://expensetracker-69a6d-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        dispatch(
          CartActions.responseNotification({
            status: "error",
            message: "Sending Cart Data Failed",
            title: "Sending Failed",
          })
        );
      } else {
        dispatch(
          CartActions.responseNotification({
            status: "success",
            message: "Items Added to Cart",
            title: "Sent",
          })
        );
      }
    };
    if (isInitial) {
      isInitial = false;
      return;
    }
    sendingReq().catch((error) => {
      dispatch(
        CartActions.responseNotification({
          status: "error",
          message: "Sending Cart Data Failed",
          title: "Sending Failed",
        })
      );
    });
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
