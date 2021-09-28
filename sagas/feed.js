import { call, delay, all, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  IMAGE_UPLOAD_REQUEST,
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_FAILURE,
} from "../reducers/feed";

// ACTION AREA ///////////////////////////////////////////////////////////////
function imageUploadAPI(data) {
  return axios.post("/api/feed/image", data);
}

function* imageUpload(action) {
  try {
    const result = yield call(imageUploadAPI, action.data);

    yield put({
      type: IMAGE_UPLOAD_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: IMAGE_UPLOAD_FAILURE,
      data: result.data,
    });
  }
}

/////////////////////////////////////////////////////////////////////////////

// WATCH AREA
function* watchImageUpload() {
  yield takeLatest(IMAGE_UPLOAD_REQUEST, imageUpload);
}

export default function* feedSaga() {
  yield all([
    fork(watchImageUpload),
    // ,
    // ,
  ]);
}
