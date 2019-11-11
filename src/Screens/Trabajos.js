import React, { Component } from "react";
import { FlatList } from "react-native";
import { Container, Content, Button, Icon } from "native-base";
import works from "../../Datos/Trabajos.json";
import { CardList } from "../Componentes/CardList";
import { stl } from "../Screens/styles/styles";

export class Trabajos extends Component {
  render() {
    console.log(works);

    return (
      <Container style={stl.containerList}>
        <Content>
          <FlatList
            style={stl.listaPadding}
            data={works}
            renderItem={({ item }) => <CardList obj={item} />}
            keyExtractor={item => item.id}
          />
        </Content>
        <Button
          onPress={() => this.props.navigation.navigate("AddTrabajo")}
          style={[stl.btnRounded, stl.primary]}
          block
        >
          <Icon style={stl.iconPlus} type="Ionicons" name="add" />
        </Button>
      </Container>
    );
  }
}
