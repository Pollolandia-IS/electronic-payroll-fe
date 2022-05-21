import { createSlice } from "@reduxjs/toolkit";

const cardSlice = createSlice({
    name: 'card',
    initialState: {
        cardName: 'Firts Name',
        cardNumber: '',
        theme: "light",
        itemsCount: 0,
        card: [],
    },
    reducers: {
        setCardName: (state, action) => {
            state.cardName = action.payload.nameOfCard;
            console.log(state.cardName);
        },
        setCardNumber: (state, action) => {
            state.cardNumber = action.payload.number;
        },
        emptyCar: (state) => {
            state.itemsCount = 0;
            state.card = [];
        }
    }
});

export const { setCardName, setCardNumber,  emptyCar} = cardSlice.actions;

export default cardSlice.reducer;
