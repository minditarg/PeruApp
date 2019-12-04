import React, { Component } from "react";
import { FlatList, TouchableOpacity, View, ScrollView } from "react-native";
import works from "../../../Datos/Trabajos.json";

import { Container, Content, Button, Icon, Text } from "native-base";
import { stl } from "../styles/styles";
import { CardList } from "../../Componentes/CardList";
import RNModal from "rn-modal-picker";

class TrabajosHechos extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Container style={stl.containerList}>
        <Content>
          <View style={stl.labelSeccion}>
            <Text style={stl.tituloSeccion}> Sin Calificar</Text>
          </View>
          <FlatList
            data={works}
            renderItem={({ item }) => (
              <CardList navigation={this.props.navigation} Image obj={item} />
            )}
            keyExtractor={item => item.id.toString()}
          />
          <View style={stl.labelSeccion}>
            <Text style={stl.tituloSeccion}>Calificados</Text>
          </View>
          <FlatList
            data={works}
            renderItem={({ item }) => (
              <CardList navigation={this.props.navigation} Image obj={item} />
            )}
            keyExtractor={item => "#" + item.id.toString()}
          />
        </Content>
      </Container>
    );
  }
}
export default TrabajosHechos;
