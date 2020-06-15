import React, { Component } from "react";
import { View } from "react-native";
import { Container, Content, Button, Icon, Spinner, Text } from "native-base";
import { stl } from "../styles/styles";

import * as empresaService from "../../Services/proveedor";
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
            onPress={() => {  
              empresaService.getPremium()
              this.props.navigation.navigate("EmpresaDetail") }
            }
            style={[stl.btnSelect, stl.Premium]}
            block
          >
            <Text style={stl.btnTextTipoServicio}>PREMIUM</Text>
          </Button>
          <Button
            onPress={() => this.props.navigation.navigate("FeedServicios", {esSupervisado: true})}
            style={[stl.btnSelect, stl.Supervisado]}
            block
          >
            <Text style={stl.btnTextTipoServicio}>SUPERVISADO</Text>
          </Button>
          <Button
            onPress={() => this.props.navigation.navigate("FeedServicios",  {esSupervisado: false})}
            style={[stl.btnSelect, stl.Standar]}
            block
          >
            <Text style={stl.btnTextTipoServicio}>STANDARD</Text>
          </Button>
        </View>
      </View>
    );
  }
}
export default TipoServicio;
