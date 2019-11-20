import React, { Component } from "react";
import { FlatList } from "react-native";
import { Container, Content, Button, Icon, Spinner } from "native-base";
import { CardList } from "../Componentes/CardList";
import { stl } from "../Screens/styles/styles";
import * as session from "../Services/session";

export class Servicios extends Component {
  constructor() {
    super();
    //this.componentDidUpdate();
    this.state = {
      servicios: session.usuarioLogueado().Proveedor.servicios
    };
  }

  shouldComponentUpdate() {
    this.state = {
      servicios: session.usuarioLogueado().Proveedor.servicios
    };
  }

  render() {
    return (
      <Container style={stl.containerList}>
        <Content>
          <FlatList
            style={stl.listaPadding}
            data={this.state.servicios}
            renderItem={({ item }) => (
              <CardList navigation={this.props.navigation} Image obj={item} />
            )}
            keyExtractor={item => item.id.toString()}
          />
        </Content>
        <Button
          onPress={() => {
            this.props.navigation.navigate("AddServicio");
          }}
          style={[stl.btnRounded, stl.primary]}
          block
        >
          <Icon style={stl.iconPlus} type="Ionicons" name="add" />
        </Button>
      </Container>
    );
  }
}
