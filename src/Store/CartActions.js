import { CartActions } from "./CartSlice";
import { CartItemsActions } from "./CartItemSlice";

export const fetchCartData = () => {
    return async (dispatch) => {
        dispatch(
            CartActions.responseNotification({
              status: "Pending",
              message: "Retrieving Cart Data...",
              title: "Recieving...",
            })
          );
        const fetchData = async () => {
          const response = await fetch(
            'https://expensetracker-69a6d-default-rtdb.firebaseio.com/cart.json'
          );
    
          if (!response.ok) {
            throw new Error('Could not fetch cart data!');
          }
    
          const data = await response.json();
    
          return data;
        };
    
        try {
          const cartData = await fetchData();
          dispatch(
            CartItemsActions.replaceCart({
              items: cartData.items || [],
              totalItems: cartData.totalItems,
            })
          );
          dispatch(
            CartActions.responseNotification({
              status: "success",
              message: "Recieved Cart Items",
              title: "Recieved",
            })
          );
        } catch (error) {
          dispatch(
            CartActions.responseNotification({
              status: 'error',
              title: 'Error!',
              message: 'Fetching cart data failed!',
            })
          );
        }
      };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      CartActions.responseNotification({
        status: "Pending",
        message: "Sending Cart Data",
        title: "sending",
      })
    );
    const sendRequest = async () => {
      const response = await fetch(
        "https://expensetracker-69a6d-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
    };
    try {
      await sendRequest();

      dispatch(
        CartActions.responseNotification({
          status: "success",
          message: "Items Added to Cart",
          title: "Sent",
        })
      );
    } catch (error) {
      dispatch(
        CartActions.responseNotification({
          status: "error",
          message: "Sending Cart Data Failed",
          title: "Sending Failed",
        })
      );
    }
  };
};
