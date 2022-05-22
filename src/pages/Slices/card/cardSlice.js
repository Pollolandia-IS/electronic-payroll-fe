import { createSlice } from "@reduxjs/toolkit";

const cardSlice = createSlice({
    name: 'card',
    initialState: {
        cardObject: {},
        itemsCount: 0,
        card: [],
    },
    reducers: {
        setCardName: (state, action) => {
            state.cardObject = action.payload;
            // console.log(state.cardObject);
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
