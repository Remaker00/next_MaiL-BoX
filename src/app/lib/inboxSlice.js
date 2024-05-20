// emailSlice.js

import { createSlice } from "@reduxjs/toolkit";

export const inboxSlice = createSlice({
    name: "inbox",
    initialState: [],
    reducers: {
        setEmails: (state, action) => {
            return action.payload;
        },
        // addEmail: (state, action) => {
        //     state.push(action.payload);
        // },
        // Add more reducers as needed
    },
});

export const { setEmails, addEmail } = inboxSlice.actions;
