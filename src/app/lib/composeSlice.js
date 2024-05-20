import { createSlice } from "@reduxjs/toolkit";

export const composeSlice = createSlice({
    name: "compose",
    initialState: {
        sentMails: [],
    },
    reducers: {
        composeMailSuccess: (state, action) => {
            state.sentMails.push(action.payload);
        },
        composeMailFailure: (state, action) => {
            state.error = action.payload; 
        },
    },
});

export const { composeMailSuccess, composeMailFailure } = composeSlice.actions;