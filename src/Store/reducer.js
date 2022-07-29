import {
    SET_GAME_NAME,
    SET_CURRENT_PAGE,
    SET_CUSTOMER,
    REMOVE_CUSTOMER,
    SET_CART_ITEMS,
    ADD_POST,
    REPLACE_CART_ITEMS,
} from "./Constants";

const initState = {
    GameName: "",
    customer: {
    
    },
    cartItems: [],
    update_profile: false
};

function reducer(state, action) {
    switch (action.type) {
        case SET_GAME_NAME:
            return {
                ...state,
                GameName: action.payload,
            };
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload,
            };
        case SET_CUSTOMER:
            return {
                ...state,
                customer: action.payload,
            };
        case SET_CART_ITEMS:
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload],
            };
        case REMOVE_CUSTOMER:
            return {
                ...state,
                customer: {
                status: "nonActive",
                avatar: "",
                name: "",
                posts: [],
                },
            };
        case REPLACE_CART_ITEMS:
            return {
                ...state,
                cartItems: action.payload,
            };
        case ADD_POST:
            return {
                ...state,
                customer: {
                    ...state.customer,
                    posts: [...state.customer.posts, action.payload],
                },
            };
        default:
            throw new Error("Invalid Action");
  }
}

export { initState };

export default reducer;
