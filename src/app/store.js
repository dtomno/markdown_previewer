import { configureStore } from "@reduxjs/toolkit";
import textReducer from "../features/markdown/markdownSlice";

export const store = configureStore({
    reducer: {
        markdown: textReducer
    }
});