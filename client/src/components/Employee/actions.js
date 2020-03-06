import axios from "axios";

import { getAuthData } from "../../utils/Utils";

import {
  EMPLOYEE_GET_STARTED,
  EMPLOYEE_GET_FINISHED,
  EMPLOYEE_GET_ERROR
} from "./types";

export const employeeError = error => {
  return {
    type: EMPLOYEE_GET_ERROR,
    payload: error
  };
};

export const getEmployee = barcode => dispatch => {
  console.log("getEmployee barcode: ", barcode);

  dispatch({ type: EMPLOYEE_GET_STARTED });

  return axios
    .get(`${process.env.REACT_APP_APIURL}/employee/${barcode}`, {
      headers: { Authorization: getAuthData() }
    })
    .then(response => {
      return dispatch({
        type: EMPLOYEE_GET_FINISHED,
        payload: response.data
      });
    })
    .catch(error => {
      console.log(error);
      console.log(error.response);

      if (error.response && error.response.status === 400) {
        return dispatch(employeeError(error.response.data.result));
      }
      if (error.response && error.response.status === 401) {
        return dispatch(employeeError("Ошибка авторизации в 1С"));
      }
      return dispatch(employeeError("Внутренняя ошибка сервера!"));
    });
};
