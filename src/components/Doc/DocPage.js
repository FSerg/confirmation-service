import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Message,
  Loader,
  Grid,
  Segment,
  Header,
  Icon
} from "semantic-ui-react";
import BarcodeReader from "react-barcode-reader";

import DocInfo from "./DocInfo";
import Position from "../Position/Position";
import DocOperations from "./DocOperations";
import { resetDoc, getDoc, saveDoc } from "./actions";
import { confirmBarcode } from "../Position/actions";

const DocPage = props => {
  const docId = props.match.params.id;

  const { isDocLoading, errorDoc, errorSaveDoc, doc, list } = useSelector(
    state => state.docStore
  );

  const { position } = useSelector(state => state.positionStore);

  const dispatch = useDispatch();
  useEffect(() => {
    console.log("useEffect:  Get doc");
    if (Object.keys(doc).length === 0) {
      dispatch(getDoc(docId));
    }
  }, [docId]);

  const handleScan = data => {
    console.log("DocPage handleScan:", data);

    // сохранить
    if (data === "000001") {
      return dispatch(saveDoc(docId, list));
    }

    // выход без сохранения
    if (data === "000002") {
      return dispatch(resetDoc());
    }

    if (!Object.keys(position).length) {
      // текущего товара нет, обрабатываем как новый ШК
      return dispatch(confirmBarcode(data));
    }

    // проверяем что не считан ли ШК полного подтверждение текущей позиции
    if (position.uid === data) {
      // говорим что считан ШК с полным подтвержденеим выдачи
      return dispatch(confirmBarcode(position.barcodes[0], true));
    }

    // считан просто друго ШК товара
    return dispatch(confirmBarcode(data));
  };

  const renderDoc = () => {
    if (!Object.keys(doc).length) {
      return null;
    }
    return (
      <Grid columns="2" divided>
        <Grid.Row>
          <Grid.Column width={8}>
            <Position />

            <DocOperations />
          </Grid.Column>
          <Grid.Column width={8}>
            <DocInfo error={errorSaveDoc} doc={doc} list={list} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  };

  return (
    <>
      <BarcodeReader timeBeforeScanTest={500} onScan={handleScan} />

      {errorDoc ? <Message error>{errorDoc}</Message> : null}

      {isDocLoading ? (
        <Loader active inline="centered" size="big">
          Обработка данных
        </Loader>
      ) : (
        renderDoc()
      )}
    </>
  );
};

export default withRouter(DocPage);
// export default DocPage;
