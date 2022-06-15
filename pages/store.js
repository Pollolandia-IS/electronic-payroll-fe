import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cardSlice from "./Slices/card/cardSlice";
import userSlice from "./Slices/user/userSlice";


const reducers = combineReducers({
    card: cardSlice,
    user: userSlice,
})

const store = configureStore({
    reducer: reducers,
});

export default store;