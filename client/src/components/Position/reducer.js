import { POSITION_SUCCESS, POSITION_ERROR, POSITION_RESET } from "./types";

const initialState = {
  position: {},
  isPositionLoading: false,
  errorPosition: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case POSITION_RESET:
      return { position: {}, isPositionLoading: false, errorPosition: "" };

    case POSITION_SUCCESS:
      return {
        ...state,
        position: action.payload,
        isPositionLoading: false,
        errorPosition: ""
      };

    case POSITION_ERROR:
      return {
        ...state,
        isDocLoading: false,
        errorPosition: action.payload
      };

    default:
      return state;
  }
};
