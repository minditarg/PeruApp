import React, { Component } from "react";
import { FlatList } from "react-native";
import { Container, Content, Button, Icon } from "native-base";
import { CardList } from "../Componentes/CardList";
import { stl } from "../Screens/styles/styles";
import * as session from "../Services/session";

export class Servicios extends Component {
  render() {
    

    return (
      <Container style={stl.containerList}>
        <Content>
          <FlatList
            style={stl.listaPadding}
            data={session.usuarioLogueado().Proveedor.servicios}
            renderItem={({ item }) => <CardList Image obj={item} />}
            keyExtractor={item => item.id}
          />
        </Content>
        <Button
          onPress={() => this.props.navigation.navigate("AddServicio")}
          style={[stl.btnRounded, stl.primary]}
          block
        >
          <Icon style={stl.iconPlus} type="Ionicons" name="add" />
        </Button>
      </Container>
    );
  }
}
