import axios from "axios";

import history from "../../history";
import { getAuthData } from "../../utils/Utils";

import {
  DOC_RESET,
  DOC_GET_STARTED,
  DOC_GET_FINISHED,
  DOC_GET_ERROR,
  DOC_SAVE_STARTED,
  DOC_SAVE_FINISHED,
  DOC_SAVE_ERROR
} from "./types";
import { POSITION_RESET } from "../Position/types";
import { EMPLOYEE_RESET } from "../Employee/types";

export const docError = error => {
  return {
    type: DOC_GET_ERROR,
    payload: error
  };
};

export const resetDoc = () => dispatch => {
  dispatch({ type: POSITION_RESET });
  dispatch({ type: EMPLOYEE_RESET });
  dispatch({ type: DOC_RESET });
  history.push("/");
};

export const getDoc = docId => dispatch => {
  console.log("getDoc ID: ", docId);
  if (docId.length < 39) {
    const errMsg = `Считан неверный штрих-код: ${docId}`;
    return dispatch(docError(errMsg));
  }

  dispatch({ type: DOC_GET_STARTED });
  dispatch({ type: POSITION_RESET });

  return axios
    .get(`/ut_pir/hs/warehouse/${docId}`, { headers: getAuthData() })
    .then(response => {
      const doc = response.data;
      const list = doc.list.slice();
      delete doc.list;
      doc.status = "new";

      dispatch({
        type: DOC_GET_FINISHED,
        payload: { doc, list }
      });
      history.push(`/doc/${docId}`);
    })
    .catch(error => {
      console.log(error);
      console.log(error.response);

      if (error.response && error.response.status === 400) {
        return dispatch(docError(error.response.data.result));
      }
      if (error.response && error.response.status === 401) {
        return dispatch(docError("Ошибка авторизации в 1С"));
      }
      return dispatch(docError("Внутренняя ошибка сервера!"));
    });
};

export const saveDoc = (docId, list) => (dispatch, getState) => {
  console.log("save Doc: ", docId);

  // проверим, что документ вообще модифицировался
  const doc = getState().docStore.doc;
  if (doc.status === "new") {
    const errMsg = "В документе не было зафиксировано никакой выдачи.";
    return dispatch({ type: DOC_SAVE_ERROR, payload: errMsg });
  }

  dispatch({ type: DOC_SAVE_STARTED });

  const employee_code = getState().employeeStore.employee.code;
  const data = { code: docId, employee_code: employee_code, list };
  console.log("data: ", data);

  return axios
    .post("/ut_pir/hs/warehouse/", data, { headers: getAuthData() })
    .then(response => {
      console.log("Updated doc: ", response);
      dispatch({ type: DOC_SAVE_FINISHED });
      dispatch(resetDoc());
    })
    .catch(error => {
      console.log("Error update doc: ", error);
      console.log("Error update doc: ", error.response);
    });
};
