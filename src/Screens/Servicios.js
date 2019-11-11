import React, { Component } from "react";
import { FlatList } from "react-native";
import { Container, Content, Button, Icon } from "native-base";
import Services from "../../Datos/Services.json";
import { CardList } from "../Componentes/CardList";
import { stl } from "../Screens/styles/styles";

export class Servicios extends Component {
  render() {
    console.log(Services);

    return (
      <Container style={stl.containerList}>
        <Content>
          <FlatList
            style={stl.listaPadding}
            data={Services}
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
