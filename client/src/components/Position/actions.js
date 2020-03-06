import { POSITION_SUCCESS, POSITION_ERROR } from "./types";
import { DOC_UPDATE_POSITION } from "../Doc/types";

export const positionError = error => {
  return {
    type: POSITION_ERROR,
    payload: error
  };
};

export const confirmBarcode = (barcode, isFullConfirmation) => (
  dispatch,
  getState
) => {
  console.log("action confirmBarcode", barcode);

  // let's find barcode in document
  // check if document selected
  const doc = getState().docStore.doc;
  if (Object.keys(doc).length === 0) {
    const errMsg = "Не определен текущий документ!";
    return dispatch(positionError(errMsg));
  }

  // find barcode
  const list = getState().docStore.list;
  const result = list.find(item => {
    return item.barcodes.includes(barcode);
  });

  if (result === undefined) {
    const errMsg = `Товар с штрих-кодом: ${barcode} не найден!`;
    return dispatch(positionError(errMsg));
  }

  let kolConfirmation = 1;
  if (isFullConfirmation) {
    kolConfirmation = result.kolend - result.kolnew;
  }
  const kolnew = result.kolnew + kolConfirmation;
  const position = { ...result, kolnew: kolnew };

  dispatch({
    type: POSITION_SUCCESS,
    payload: position
  });

  if (position.kolnew <= position.kolend) {
    dispatch({
      type: DOC_UPDATE_POSITION,
      payload: position
    });
  }
};
