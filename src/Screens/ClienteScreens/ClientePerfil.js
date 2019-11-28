import React, { Component } from "react";
import { Container, Content, Button, Icon, Text } from "native-base";
import { stl } from "../styles/styles";

class ClientePerfil extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Container style={stl.containerList}>
        <Content>
          <Text style={stl.btnText}>Pagina Cliente Detail</Text>
        </Content>
      </Container>
    );
  }
}
export default ClientePerfil;
