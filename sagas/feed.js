import { call, delay, all, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  IMAGE_UPLOAD_REQUEST,
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_FAILURE,
  //
  FEED_CREATE_REQUEST,
  FEED_CREATE_SUCCESS,
  FEED_CREATE_FAILURE,
  //
  FEED_LIST_REQUEST,
  FEED_LIST_SUCCESS,
  FEED_LIST_FAILURE,
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

// ACTION AREA ///////////////////////////////////////////////////////////////
function feedCreateAPI(data) {
  return axios.post("/api/feed/create", data);
}

function* feedCreate(action) {
  try {
    const result = yield call(feedCreateAPI, action.data);

    yield put({
      type: FEED_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: FEED_CREATE_FAILURE,
      data: result.data,
    });
  }
}

/////////////////////////////////////////////////////////////////////////////

// ACTION AREA ///////////////////////////////////////////////////////////////
function feedListAPI() {
  return axios.get("/api/feed/list");
}

function* feedList() {
  try {
    const result = yield call(feedListAPI);

    yield put({
      type: FEED_LIST_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: FEED_LIST_FAILURE,
      data: result.data,
    });
  }
}

/////////////////////////////////////////////////////////////////////////////

// WATCH AREA
function* watchImageUpload() {
  yield takeLatest(IMAGE_UPLOAD_REQUEST, imageUpload);
}

function* watchFeedCreate() {
  yield takeLatest(FEED_CREATE_REQUEST, feedCreate);
}

function* watchFeedList() {
  yield takeLatest(FEED_LIST_REQUEST, feedList);
}

export default function* feedSaga() {
  yield all([
    fork(watchImageUpload),
    fork(watchFeedCreate),
    fork(watchFeedList),
    // ,
    // ,
  ]);
}
