import React, { Component } from "react";
import { View } from "react-native";
import { Container, Content, Button, Icon, Spinner, Text } from "native-base";
import { stl } from "../styles/styles";

class TipoServicio extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={stl.SelectCatText}>
          <Text style={stl.TextPregunta}>¿Qué tipo de servicio busca? </Text>
        </View>
        <View style={stl.BotonesTipoServicio}>
          <Button
            onPress={() => this.props.navigation.navigate("EmpresaDetail")}
            style={[stl.btnSelect, stl.Premium]}
            block
          >
            <Text style={stl.btnTextTipoServicio}>PREMIUM</Text>
          </Button>
          <Button
            onPress={() => this.props.navigation.navigate("ServicioDetail")}
            style={[stl.btnSelect, stl.Supervisado]}
            block
          >
            <Text style={stl.btnTextTipoServicio}>SUPERVISADO</Text>
          </Button>
          <Button
            onPress={() => this.props.navigation.navigate("FeedServicios")}
            style={[stl.btnSelect, stl.Standar]}
            block
          >
            <Text style={stl.btnTextTipoServicio}>STANDAR</Text>
          </Button>
        </View>
      </View>
    );
  }
}
export default TipoServicio;
