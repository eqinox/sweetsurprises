import axiosInstance from "../../utils/axios-instance";
import {
    actionCreator,
    createRequestTypes,
} from "../../utils/helper";

export const GET_ALL_IMAGES = createRequestTypes("GET_ALL_IMAGES");;

export const getAllImages = () => async (dispatch) => {
    try {
        const response = await axiosInstance.get("/api/galleries?populate=*");
        dispatch(actionCreator.success(GET_ALL_IMAGES, response.data));
    } catch (error) { }
};
