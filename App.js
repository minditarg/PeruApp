import React from "react";
import store from "./src/Store";
import { Provider } from "react-redux";
import Navigation from "./src/Navigation";
import  { Root }  from "native-base";


export default class Aplication extends React.Component {
 render() {
   return (
     <Root>
     <Provider store={store}>
        <Navigation />
     </Provider>
     </Root>
   );
 }
}