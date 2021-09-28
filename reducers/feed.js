import produce from "immer";

const initailState = {
  previewImage: null,
  //
  st_imageUploadLoading: false,
  st_imageUploadDone: false,
  st_imageUploadError: null,
  //
  st_feedCreateLoading: false,
  st_feedCreateDone: false,
  st_feedCreateError: null,
};

export const IMAGE_UPLOAD_REQUEST = "IMAGE_UPLOAD_REQUEST";
export const IMAGE_UPLOAD_SUCCESS = "IMAGE_UPLOAD_SUCCESS";
export const IMAGE_UPLOAD_FAILURE = "IMAGE_UPLOAD_FAILURE";

export const FEED_CREATE_REQUEST = "FEED_CREATE_REQUEST";
export const FEED_CREATE_SUCCESS = "FEED_CREATE_SUCCESS";
export const FEED_CREATE_FAILURE = "FEED_CREATE_FAILURE";

export const CLEAR_PREVIEW_IMAGE = "CLEAR_PREVIEW_IMAGE";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case IMAGE_UPLOAD_REQUEST: {
        draft.st_imageUploadLoading = true;
        draft.st_imageUploadDone = false;
        draft.st_imageUploadError = null;
        break;
      }
      case IMAGE_UPLOAD_SUCCESS: {
        // 서버에서 이미지 주소를 반환한다. => action.data   return res.status(200).json({ path : 진짜 이미지 주소 })
        draft.st_imageUploadLoading = false;
        draft.st_imageUploadDone = true;
        draft.st_imageUploadError = null;
        draft.previewImage = action.data.path;
        break;
      }
      case IMAGE_UPLOAD_FAILURE: {
        draft.st_imageUploadLoading = false;
        draft.st_imageUploadDone = false;
        draft.st_imageUploadError = action.data;
        break;
      }
      //////////////////////////////////////////////////////

      case FEED_CREATE_REQUEST: {
        draft.st_feedCreateLoading = true;
        draft.st_feedCreateDone = false;
        draft.st_feedCreateError = null;
        break;
      }
      case FEED_CREATE_SUCCESS: {
        draft.st_feedCreateLoading = false;
        draft.st_feedCreateDone = true;
        draft.st_feedCreateError = null;
        break;
      }
      case FEED_CREATE_FAILURE: {
        draft.st_feedCreateLoading = false;
        draft.st_feedCreateDone = false;
        draft.st_feedCreateError = action.data;
        break;
      }
      //////////////////////////////////////////////////////

      case CLEAR_PREVIEW_IMAGE: {
        draft.previewImage = null;
      }
      default:
        break;
    }
  });

export default reducer;
