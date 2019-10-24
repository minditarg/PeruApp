import React, { Component } from "react";
import { View, Image, StyleSheet, FlatList } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Button
} from "native-base";
import { Services } from "../../Datos/Services";

const extractKey = ({ Id }) => Id;
function Item({ obj }) {
  return (
    <ListItem thumbnail>
      <Left>
        <Thumbnail square source={{ uri: obj.Image }} />
      </Left>
      <Body>
        <Text>{obj.Titulo}</Text>
        <Text note numberOfLines={1}>
          {obj.Descripcion}
        </Text>
      </Body>

      <Right>
        <Button transparent>
          <Text style={{ color: "red" }}>b</Text>
        </Button>
      </Right>
    </ListItem>
  );
}

export class Servicios extends Component {
  render() {
    return (
      <Container>
        <Content>
          <FlatList
            data={Services}
            renderItem={({ item }) => <Item obj={item}></Item>}
            keyExtractor={extractKey}
          />
        </Content>
        <Button
          onPress={() => this.props.navigation.navigate("AddServicio")}
          style={stl.btnRounded}
          block
        >
          <Text>+</Text>
        </Button>
      </Container>
    );
  }
}
const stl = StyleSheet.create({
  btnRounded: {
    position: "absolute",
    right: 20,
    bottom: 25,
    borderRadius: 100,
    width: 50,
    height: 50
  }
});
