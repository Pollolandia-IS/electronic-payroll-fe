import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userName: 'Firts Name',
        userEmail: '',
        isLogged: false,
        nameOfBusiness: 'PL Solutions',
        userProjects: [],
    },
    reducers: {
        setUserName: (state, action) => {
            state.userName = action.payload.userName;
            console.log(state.userName);
        },
        emptyUserProjects: (state) => {
            state.userProjects = [];
        }
    }
});

export const { setUserName, emptyUserProjects} = userSlice.actions;

export default userSlice.reducer;