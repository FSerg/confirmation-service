import {
  EMPLOYEE_GET_STARTED,
  EMPLOYEE_GET_FINISHED,
  EMPLOYEE_GET_ERROR,
  EMPLOYEE_RESET
} from "./types";

const initialState = {
  employee: null,
  isEmployeeLoading: false,
  errorEmployee: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case EMPLOYEE_GET_STARTED:
      return {
        ...state,
        employee: null,
        isEmployeeLoading: true,
        errorEmployee: ""
      };

    case EMPLOYEE_GET_FINISHED:
      return {
        ...state,
        employee: action.payload,
        isEmployeeLoading: false
      };

    case EMPLOYEE_GET_ERROR:
      return {
        employee: null,
        isEmployeeLoading: false,
        errorEmployee: action.payload
      };

    case EMPLOYEE_RESET:
      return {
        ...state,
        employee: null,
        isEmployeeLoading: false,
        errorEmployee: ""
      };

    default:
      return state;
  }
};
