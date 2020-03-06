import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import QRCode from "qrcode.react";

const DocOperations = () => {
  return (
    <Grid>
      <Grid.Row textAlign="center" columns={2}>
        <Grid.Column as={Link} to="#">
          <QRCode value="000001" size={64} fgColor="#1a531b" />
          <p>Сохранить и закрыть</p>
        </Grid.Column>
        <Grid.Column as={Link} to="#">
          <QRCode value="000002" size={64} fgColor="#912d2b" />
          <p>Закрыть без сохранения</p>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default DocOperations;
