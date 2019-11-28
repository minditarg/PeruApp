import React, { Component } from "react";
import { Container, Content, Button, Icon, Text } from "native-base";
import { stl } from "../styles/styles";

class TrabajosHechos extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Container style={stl.containerList}>
        <Content>
          <Text style={stl.btnText}>Pagina Trabajos Hechos</Text>
        </Content>
      </Container>
    );
  }
}
export default TrabajosHechos;
