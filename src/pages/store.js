import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cardSlice from "./Slices/card/cardSlice";


const reducers = combineReducers({
    card: cardSlice,
})

const store = configureStore({
    reducer: reducers,
});

export default store;