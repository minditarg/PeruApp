import React, { Component } from "react";
import { FlatList } from "react-native";
import { Container, Content, Button, Icon } from "native-base";
import works from "../../Datos/Trabajos.json";
import { ListTrabajo } from "../Componentes/ListTrabajo";
import { stl } from "../Screens/styles/styles";

export class Trabajos extends Component {
  render() {
    return (
      <Container style={stl.containerList}>
        <Content>
          <FlatList
            style={stl.listaPadding}
            data={works}
            renderItem={({ item }) => <ListTrabajo obj={item} />}
            keyExtractor={item => item.id}
          />
        </Content>
        <Button
          onPress={() => this.props.navigation.navigate("Servicios")}
          style={[stl.btnRounded, stl.primary]}
          block
        >
          <Icon style={stl.iconPlus} type="Ionicons" name="add" />
        </Button>
      </Container>
    );
  }
}
