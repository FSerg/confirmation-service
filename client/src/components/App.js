import React from "react";
import { Route, Switch } from "react-router-dom";

import { Container } from "semantic-ui-react";
import HomePage from "./HomePage";
import DocPage from "./Doc/DocPage";

const App = () => {
  return (
    <Container fluid style={{ padding: 25 }}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/doc/:id" component={DocPage} />
      </Switch>
    </Container>
  );
};

export default App;
