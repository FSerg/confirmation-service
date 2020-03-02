import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import BarcodeReader from "react-barcode-reader";
import {
  Segment,
  Grid,
  Divider,
  Icon,
  Header,
  Button,
  Message
} from "semantic-ui-react";

import { getDoc, docError } from "./Doc/actions";
import { getEmployee } from "./Employee/actions";

const HomePage = () => {
  const { isDocLoading, errorDoc } = useSelector(state => state.docStore);
  const { employee, isEmployeeLoading, errorEmployee } = useSelector(
    state => state.employeeStore
  );

  const dispatch = useDispatch();

  const handleScan = barcode => {
    console.log("HomePage handleScan:", barcode);
    if (barcode.length === 7) {
      return dispatch(getEmployee(barcode));
    }

    if (!employee) {
      const errMsg = "Сначала считайте штрих-код сотрудника";
      return dispatch(docError(errMsg));
    }

    dispatch(getDoc(barcode));
  };

  const renderEmployee = () => {
    if (!employee) {
      return (
        <Header icon>
          <Icon name="user" />
          1. Считайте штрих-код сотрудника
        </Header>
      );
    }
    return (
      <Header icon>
        <Icon name="check" color="green" />
        {employee.name}
      </Header>
    );
  };

  return (
    <>
      <BarcodeReader timeBeforeScanTest={500} onScan={handleScan} />

      <Segment placeholder loading={isDocLoading} style={{ height: "700px" }}>
        <Grid columns={2} stackable textAlign="center">
          <Divider vertical>>></Divider>

          <Grid.Row verticalAlign="middle">
            <Grid.Column>
              {renderEmployee()}
              {errorEmployee ? <Message error header={errorEmployee} /> : null}
            </Grid.Column>

            <Grid.Column>
              <Header icon>
                <Icon name="pdf file outline" />
                2. Считайте штрих-код документа
              </Header>
              {/* <Button
                onClick={() =>
                  dispatch(getDoc("303394660319748105470718602634394503713"))
                }
              >
                К документу
              </Button> */}
              {errorDoc ? <Message error header={errorDoc} /> : null}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </>
  );
};

export default HomePage;
