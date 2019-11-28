import React, { Component } from "react";
import { Container, Content, Button, Icon, Spinner, Text } from "native-base";
import { stl } from "../styles/styles";

class TipoServicio extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Container style={stl.containerList}>
        <Content>
          <Text style={stl.btnText}>¿Qué tipo de servicio buscas?</Text>
          <Button
            onPress={() => this.props.navigation.navigate("EmpresaDetail")}
            style={[stl.btnSelect, stl.Premium]}
            block
          >
            <Text style={stl.btnText}>PREMIUM</Text>
          </Button>
          <Button
            onPress={() => this.props.navigation.navigate("ServicioDetail")}
            style={[stl.btnSelect, stl.Supervisado]}
            block
          >
            <Text style={stl.btnText}>SUPERVISADO</Text>
          </Button>
          <Button
            onPress={() => this.props.navigation.navigate("FeedServicios")}
            style={[stl.btnSelect, stl.Standar]}
            block
          >
            <Text style={stl.btnText}>STANDAR</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
export default TipoServicio;
