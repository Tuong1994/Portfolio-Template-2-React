import { configureStore } from "@reduxjs/toolkit";
import langSlice from "./slices/LangSlice";

const rootReducer = {
    langs: langSlice
};

export const store = configureStore({ reducer: rootReducer });

export type ReducerState = ReturnType<typeof store.getState>;
