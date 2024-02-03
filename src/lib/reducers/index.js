import { combineReducers } from "redux";
import { galleryReducer } from "./gallery.reducer";

const appReducer = combineReducers({
    gallery: galleryReducer
});

export const rootReducer = (state, action) => {
    return appReducer(state, action);
};
