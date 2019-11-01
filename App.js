import React from "react";
import store from "./src/Store";
import { Provider } from "react-redux";
import Navigation from "./src/Navigation";

export default class Aplication extends React.Component {
  render() {
    console.log(store.getState());
    return (
      <Provider store={store}>
        <Navigation></Navigation>
      </Provider>
    );
  }
}
