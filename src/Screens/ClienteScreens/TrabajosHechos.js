import React, { Component } from "react";
import { FlatList, TouchableOpacity, View, ScrollView } from "react-native";
import works from "../../../Datos/Trabajos.json";

import { Container, Content, Button, Icon, Text } from "native-base";
import { stl } from "../styles/styles";
import { ListTrabajo } from "../../Componentes/ListTrabajo";
import RNModal from "rn-modal-picker";
import * as trabajosService from "../../Services/trabajos";
import { connect } from "react-redux";
class TrabajosHechos extends Component {
  constructor() {
    super();
    trabajosService.listadoPorClienteCalificados();
    trabajosService.listadoPorClienteSinCalificar();
  }

  componentDidUpdate() { console.log("componentDidUpdate");
    // trabajosService.listadoPorClienteCalificados();
    // trabajosService.listadoPorClienteSinCalificar();
  }

  render() {
    return (
      <Container style={stl.containerList}>
        <Content>
          <View style={stl.labelSeccion}>
            <Text style={stl.tituloSeccion}> Sin Calificar</Text>
          </View>
          <FlatList
            data={this.props.sinCalificar}
            renderItem={({ item }) => (
              <ListTrabajo navigation={this.props.navigation} esTrabajoSinCalificar={true}  escliente={true}   trash={false} Image obj={item} />
            )}
            keyExtractor={item => item.id.toString()}
          />
          <View style={stl.labelSeccion}>
            <Text style={stl.tituloSeccion}>Calificados</Text>
          </View>
          <FlatList
            data={this.props.calificados}
            renderItem={({ item }) => (
              <ListTrabajo navigation={this.props.navigation} trash={false} esTrabajoSinCalificar={false} escliente={true} Image obj={item} />
            )}
            keyExtractor={item => "#" + item.id.toString()}
          />
        </Content>
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    calificados: trabajosService.getStore().trabajosCalificados,
    sinCalificar: trabajosService.getStore().trabajosSinCalificar
  };
};
export default connect(mapStateToProps)(TrabajosHechos);
