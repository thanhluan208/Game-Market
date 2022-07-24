import {
    SET_GAME_NAME,
    SET_CURRENT_PAGE,
    SET_CUSTOMER,
    REMOVE_CUSTOMER,
    SET_CART_ITEMS,
    REPLACE_CART_ITEMS,
    ADD_POST,
} from "./Constants";

export const setGameName = (payload) => ({
  type: SET_GAME_NAME,
  payload,
});
export const setCurrentPage = (payload) => ({
  type: SET_CURRENT_PAGE,
  payload,
});
export const setCustomer = (payload) => ({
  type: SET_CUSTOMER,
  payload,
});

export const removeCustomer = (payload) => ({
  type: REMOVE_CUSTOMER,
  payload,
});
export const setCartItems = (payload) => ({
  type: SET_CART_ITEMS,
  payload,
});
export const replaceCartItems = (payload) => ({
  type: REPLACE_CART_ITEMS,
  payload,
});
export const addPost = (payload) => ({
    type: ADD_POST,
    payload,
});

  
