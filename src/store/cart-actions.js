import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";
export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending",
        message: "Sending cart data to server...",
      })
    );
    const sendRequest = async () => {
      const response = await fetch(
        "https://react-http-req-6103c-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Sending cart data failed");
      }

      const data = await response.json();
      return data
    };
    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success...",
          message: "Sent cart data to server!",
        })
      );
    } catch (e) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error...",
          message: e.message,
        })
      );
    }
  };
};

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch("https://react-http-req-6103c-default-rtdb.europe-west1.firebasedatabase.app/cart.json")
            if(!response.ok) {
                throw new Error("Fetching cart data failed")
            }
            const data = await response.json()
            return data
        }
        try {
            const cartData = await fetchData()
            dispatch(cartActions.replaceCart({
                ...cartData,
                cartItems: cartData.cartItems || []
            }))
        } catch (e) {
            dispatch(
                uiActions.showNotification({
                  status: "error",
                  title: "Error...",
                  message: e.message,
                })
              );
        }
    }
}