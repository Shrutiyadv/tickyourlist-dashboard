import { takeEvery, call, put } from "redux-saga/effects";
import {
  GET_TOUR_GROUP_VARIANTS,
} from "./actionType";

import {
  getTourGroupVariantsSuccess,
  getTourGroupVariantsError,
} from "./action";

import {
  getTourGroupVariants,
} from "helpers/TourGroupVariantAPI";

import { showToastError } from "helpers/toastBuilder";

function* onGetTourGroupVariants() {
  try {
    const response = yield call(getTourGroupVariants);
    yield put(getTourGroupVariantsSuccess(response?.data?.variants || []));
  } catch (error) {
    yield put(getTourGroupVariantsError(error));
    showToastError("Failed to fetch tour group variants.", "Error");
  }
}

function* tourGroupVariantSaga() {
  yield takeEvery(GET_TOUR_GROUP_VARIANTS, onGetTourGroupVariants);
}

export default tourGroupVariantSaga;
