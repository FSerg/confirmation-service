import {
  DOC_RESET,
  DOC_GET_STARTED,
  DOC_GET_FINISHED,
  DOC_GET_ERROR,
  DOC_SAVE_STARTED,
  DOC_SAVE_FINISHED,
  DOC_SAVE_ERROR,
  DOC_UPDATE_POSITION
} from "./types";

const initialState = {
  employee: null,
  doc: {},
  list: [],
  isDocLoading: false,
  errorDoc: "",
  errorSaveDoc: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DOC_RESET:
      return {
        ...state,
        doc: {},
        list: [],
        isDocLoading: false,
        errorDoc: "",
        errorSaveDoc: ""
      };

    case DOC_GET_STARTED:
      return {
        ...state,
        doc: {},
        list: [],
        isDocLoading: true,
        errorDoc: "",
        errorSaveDoc: ""
      };

    case DOC_GET_FINISHED:
      return {
        ...state,
        doc: action.payload.doc,
        list: action.payload.list,
        isDocLoading: false
      };

    case DOC_GET_ERROR:
      return {
        ...state,
        isDocLoading: false,
        errorDoc: action.payload
      };

    case DOC_SAVE_STARTED:
      return {
        ...state,
        isDocLoading: true
      };

    case DOC_SAVE_FINISHED:
      return {
        ...state,
        isDocLoading: false
      };

    case DOC_SAVE_ERROR:
      return {
        ...state,
        errorSaveDoc: action.payload
      };

    case DOC_UPDATE_POSITION:
      const currentPosition = action.payload;
      const newList = state.list.map(item => {
        if (item.code === currentPosition.code) {
          return currentPosition;
        }
        return item;
      });
      return {
        ...state,
        doc: { ...state.doc, status: "modified" },
        list: newList
      };

    default:
      return state;
  }
};
