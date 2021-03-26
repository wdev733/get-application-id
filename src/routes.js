import React from "react";
import { Switch, Route } from "react-router-dom";

import HomePage from "./pages/Home";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
    </Switch>
  );
};

export default Routes;
