import { GET_ALL_IMAGES } from "../actions/gallery.actions";

const initialState = {
    all: [],
};

export const galleryReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_IMAGES.SUCCESS: {
            return {
                ...state,
                all: action.payload,
            };
        }
        default: {
            return {
                ...state,
            };
        }
    }
};
