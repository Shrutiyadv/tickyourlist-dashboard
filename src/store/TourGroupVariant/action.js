import {
  GET_TOUR_GROUP_VARIANTS,
  GET_TOUR_GROUP_VARIANTS_SUCCESS,
  GET_TOUR_GROUP_VARIANTS_ERROR,
} from "./actionType";

export const getTourGroupVariants = () => ({
  type: GET_TOUR_GROUP_VARIANTS,
});

export const getTourGroupVariantsSuccess = data => ({
  type: GET_TOUR_GROUP_VARIANTS_SUCCESS,
  payload: data,
});

export const getTourGroupVariantsError = error => ({
  type: GET_TOUR_GROUP_VARIANTS_ERROR,
  payload: error,
});
