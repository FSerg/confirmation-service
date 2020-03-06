import React from "react";
import { useSelector } from "react-redux";
import {
  Segment,
  Header,
  Icon,
  Message,
  Grid,
  Statistic
} from "semantic-ui-react";
import QRCode from "qrcode.react";

const Position = () => {
  const { position, isPositionLoading, errorPosition } = useSelector(
    state => state.positionStore
  );

  const getIcon = position => {
    if (position.kolend === position.kolnew) {
      return <Icon name="check" size="big" color="green" fitted />;
    }
    if (position.kolnew > position.kolend) {
      return <Icon name="times" size="big" color="red" fitted />;
    }

    return <Icon name="angle double right" size="big" color="brown" fitted />;
  };

  const renderNew = position => {
    if (position.kolend === position.kolnew) {
      return (
        <Message positive size="huge">
          <Statistic color="green" value={position.kolnew} />
        </Message>
      );
    }
    if (position.kolnew > position.kolend) {
      return (
        <Message negative size="huge">
          <Statistic color="red" value={position.kolnew} />
        </Message>
      );
    }

    return (
      <Message warning size="huge">
        <Statistic color="brown" value={position.kolnew} />
      </Message>
    );
  };

  const renderQrFullConfirmation = position => {
    if (position.kolfact < position.koldoc) {
      return (
        <>
          <QRCode value={position.uid} size={64} />
          <p>Подтвердить полную выдачу</p>
        </>
      );
    }

    return null;
  };

  const renderInfo = () => {
    if (errorPosition) {
      return (
        <Message negative>
          <Message.Header>{errorPosition}</Message.Header>
        </Message>
      );
    }

    if (Object.keys(position).length === 0) {
      return (
        <Header icon>
          {/* <Icon name="barcode" /> */}
          Считайте штрих-код товара
        </Header>
      );
    }

    // show current position
    return (
      <>
        <Segment padded="very" basic>
          {renderQrFullConfirmation(position)}
          <Header as="h1">{position.name}</Header>
        </Segment>

        <Grid verticalAlign="middle" columns={3} textAlign="center">
          <Grid.Row>
            <Grid.Column width={4}>
              <Message size="huge">
                <Statistic size="tiny" color="grey" value={position.koldoc} />
              </Message>
              По документу
            </Grid.Column>
            <Grid.Column width={1}> </Grid.Column>
            <Grid.Column width={4}>
              <Message size="huge">
                <Statistic size="tiny" color="grey" value={position.kolfact} />
              </Message>
              Выдано ранее
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={4}>
              <Message size="huge">
                <Statistic size="small" value={position.kolend} />
              </Message>
              Требуется выдать
            </Grid.Column>
            <Grid.Column width={1}>{getIcon(position)}</Grid.Column>
            <Grid.Column width={4}>
              {renderNew(position)}
              Выдано
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    );
  };

  return (
    <Segment
      loading={isPositionLoading}
      placeholder
      textAlign="center"
      style={{ height: "680px" }}
    >
      {renderInfo()}
    </Segment>
  );
};

export default Position;
