import React from "react";
import { Grid, Message, Table, Label, Icon, List } from "semantic-ui-react";

import { getDateStr } from "../../utils/Utils";

const DocInfo = ({ error, doc, list }) => {
  const renderRow = item => {
    if (item.barcodes.length === 0) {
      return (
        <Table.Row disabled key={item.code}>
          <Table.Cell>нет штрих-кода</Table.Cell>
          <Table.Cell>{item.name}</Table.Cell>
          <Table.Cell textAlign="right">{item.koldoc}</Table.Cell>
          <Table.Cell textAlign="right">{item.kolfact}</Table.Cell>
          <Table.Cell textAlign="right">{item.kolend}</Table.Cell>
          <Table.Cell textAlign="right">{item.kolnew}</Table.Cell>
        </Table.Row>
      );
    }

    if (item.kolend === item.kolnew) {
      return (
        <Table.Row positive key={item.code}>
          <Table.Cell>{item.barcodes.join(" ")}</Table.Cell>
          <Table.Cell>{item.name}</Table.Cell>
          <Table.Cell textAlign="right">{item.koldoc}</Table.Cell>
          <Table.Cell textAlign="right">{item.kolfact}</Table.Cell>
          <Table.Cell textAlign="right">{item.kolend}</Table.Cell>
          <Table.Cell textAlign="right">
            <Icon name="checkmark" /> {item.kolnew}
          </Table.Cell>
        </Table.Row>
      );
    }

    if (item.kolnew === 0) {
      return (
        <Table.Row error key={item.code}>
          <Table.Cell>{item.barcodes.join(" ")}</Table.Cell>
          <Table.Cell>{item.name}</Table.Cell>
          <Table.Cell textAlign="right">{item.koldoc}</Table.Cell>
          <Table.Cell textAlign="right">{item.kolfact}</Table.Cell>
          <Table.Cell textAlign="right">{item.kolend}</Table.Cell>
          <Table.Cell textAlign="right">{item.kolnew}</Table.Cell>
        </Table.Row>
      );
    }

    return (
      <Table.Row warning key={item.code}>
        <Table.Cell>{item.barcodes.join(" ")}</Table.Cell>
        <Table.Cell>{item.name}</Table.Cell>
        <Table.Cell textAlign="right">{item.koldoc}</Table.Cell>
        <Table.Cell textAlign="right">{item.kolfact}</Table.Cell>
        <Table.Cell textAlign="right">{item.kolend}</Table.Cell>
        <Table.Cell textAlign="right">{item.kolnew}</Table.Cell>
      </Table.Row>
    );
  };

  const renderStatus = status => {
    if (status === "modified") {
      return (
        <Label size="tiny" color="red" style={{ float: "right" }}>
          Не сохраненный
        </Label>
      );
    }

    if (status === "saved") {
      return (
        <Label size="tiny" color="green" style={{ float: "right" }}>
          Сохраненный
        </Label>
      );
    }

    return null;
  };

  return (
    <>
      {error ? <Message error>{error}</Message> : null}
      <Grid>
        <Grid.Column width={11}>
          <List>
            <List.Item>
              <List.Header>
                {doc.numdoc} / {getDateStr(doc.date)}
              </List.Header>
              {doc.author}
            </List.Item>
            <List.Item>
              <Label horizontal>{doc.section}</Label>{" "}
              <Label horizontal>{doc.client}</Label>
            </List.Item>
          </List>
        </Grid.Column>
        <Grid.Column floated="right" width={5}>
          <List>
            <List.Item>{renderStatus(doc.status)}</List.Item>
            <List.Item>
              <Label style={{ float: "right" }} size="large">
                {doc.sumsection} р.
              </Label>
            </List.Item>
          </List>
        </Grid.Column>
      </Grid>

      <Table compact="very">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={2}>Штрих-код</Table.HeaderCell>
            <Table.HeaderCell width={6}>Наименование</Table.HeaderCell>
            <Table.HeaderCell width={2} textAlign="right">
              По документу
            </Table.HeaderCell>
            <Table.HeaderCell width={2} textAlign="right">
              Выдано ранее
            </Table.HeaderCell>
            <Table.HeaderCell width={2} textAlign="right">
              Требуется выдать
            </Table.HeaderCell>
            <Table.HeaderCell width={2} textAlign="right">
              Выдано
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>{list.map(item => renderRow(item))}</Table.Body>
      </Table>
    </>
  );
};

export default DocInfo;
