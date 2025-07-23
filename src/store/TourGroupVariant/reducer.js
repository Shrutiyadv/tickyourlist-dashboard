import {
  GET_TOUR_GROUP_VARIANTS_SUCCESS,
  GET_TOUR_GROUP_VARIANTS_ERROR,
} from "./actionType";

const INIT_STATE = {
  tourGroupVariants: [],
  error: {},
};

const tourGroupVariantReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_TOUR_GROUP_VARIANTS_SUCCESS:
      const sortedVariants = (action.payload || []).sort((a, b) => {
        if (a.sortOrder !== undefined && b.sortOrder !== undefined) {
          return b.sortOrder - a.sortOrder;
        }
        return 0;
      });
      return {
        ...state,
        tourGroupVariants: sortedVariants,
      };

    case GET_TOUR_GROUP_VARIANTS_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default tourGroupVariantReducer;
