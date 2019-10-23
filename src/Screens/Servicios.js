import React, { Component } from "react";
import { View, Image, StyleSheet } from "react-native";
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

export class Servicios extends Component {
  render() {
    return (
      <Container>
        <Content>
          <List>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={require("../../assets/icono1.jpg")} />
              </Left>
              <Body>
                <Text>Sankhadeep</Text>
                <Text note numberOfLines={1}>
                  Its time to build a difference . .
                </Text>
              </Body>
              <Right>
                <Button transparent>
                  <Text>a</Text>
                </Button>
              </Right>
              <Right>
                <Button transparent>
                  <Text>b</Text>
                </Button>
              </Right>
            </ListItem>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={require("../../assets/icono1.jpg")} />
              </Left>
              <Body>
                <Text>Sankhadeep</Text>
                <Text note numberOfLines={1}>
                  Its time to build a difference . .
                </Text>
              </Body>
              <Right>
                <Button transparent>
                  <Text>a</Text>
                </Button>
              </Right>
              <Right>
                <Button transparent>
                  <Text>b</Text>
                </Button>
              </Right>
            </ListItem>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={require("../../assets/icono1.jpg")} />
              </Left>
              <Body>
                <Text>Sankhadeep</Text>
                <Text note numberOfLines={1}>
                  Its time to build a difference . .
                </Text>
              </Body>
              <Right>
                <Button transparent>
                  <Text>a</Text>
                </Button>
              </Right>
              <Right>
                <Button transparent>
                  <Text>b</Text>
                </Button>
              </Right>
            </ListItem>

            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={require("../../assets/icono1.jpg")} />
              </Left>
              <Body>
                <Text>Sankhadeep</Text>
                <Text note numberOfLines={1}>
                  Its time to build a difference . .
                </Text>
              </Body>
              <Right>
                <Button transparent>
                  <Text>a</Text>
                </Button>
              </Right>
              <Right>
                <Button transparent>
                  <Text>b</Text>
                </Button>
              </Right>
            </ListItem>

            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={require("../../assets/icono1.jpg")} />
              </Left>
              <Body>
                <Text>Sankhadeep</Text>
                <Text note numberOfLines={1}>
                  Its time to build a difference . .
                </Text>
              </Body>
              <Right>
                <Button transparent>
                  <Text>a</Text>
                </Button>
              </Right>
              <Right>
                <Button transparent>
                  <Text>b</Text>
                </Button>
              </Right>
            </ListItem>

            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={require("../../assets/icono1.jpg")} />
              </Left>
              <Body>
                <Text>Sankhadeep</Text>
                <Text note numberOfLines={1}>
                  Its time to build a difference . .
                </Text>
              </Body>
              <Right>
                <Button transparent>
                  <Text>a</Text>
                </Button>
              </Right>
              <Right>
                <Button transparent>
                  <Text>b</Text>
                </Button>
              </Right>
            </ListItem>

            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={require("../../assets/icono1.jpg")} />
              </Left>
              <Body>
                <Text>Sankhadeep</Text>
                <Text note numberOfLines={1}>
                  Its time to build a difference . .
                </Text>
              </Body>
              <Right>
                <Button transparent>
                  <Text>a</Text>
                </Button>
              </Right>
              <Right>
                <Button transparent>
                  <Text>b</Text>
                </Button>
              </Right>
            </ListItem>

            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={require("../../assets/icono1.jpg")} />
              </Left>
              <Body>
                <Text>Sankhadeep</Text>
                <Text note numberOfLines={1}>
                  Its time to build a difference . .
                </Text>
              </Body>
              <Right>
                <Button transparent>
                  <Text>a</Text>
                </Button>
              </Right>
              <Right>
                <Button transparent>
                  <Text>b</Text>
                </Button>
              </Right>
            </ListItem>

            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={require("../../assets/icono1.jpg")} />
              </Left>
              <Body>
                <Text>Sankhadeep</Text>
                <Text note numberOfLines={1}>
                  Its time to build a difference . .
                </Text>
              </Body>
              <Right>
                <Button transparent>
                  <Text>a</Text>
                </Button>
              </Right>
              <Right>
                <Button transparent>
                  <Text>b</Text>
                </Button>
              </Right>
            </ListItem>

            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={require("../../assets/icono1.jpg")} />
              </Left>
              <Body>
                <Text>Sankhadeep</Text>
                <Text note numberOfLines={1}>
                  Its time to build a difference . .
                </Text>
              </Body>
              <Right>
                <Button transparent>
                  <Text>a</Text>
                </Button>
              </Right>
              <Right>
                <Button transparent>
                  <Text>b</Text>
                </Button>
              </Right>
            </ListItem>

            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={require("../../assets/icono1.jpg")} />
              </Left>
              <Body>
                <Text>Sankhadeep</Text>
                <Text note numberOfLines={1}>
                  Its time to build a difference . .
                </Text>
              </Body>
              <Right>
                <Button transparent>
                  <Text>a</Text>
                </Button>
              </Right>
              <Right>
                <Button transparent>
                  <Text>b</Text>
                </Button>
              </Right>
            </ListItem>

            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={require("../../assets/icono1.jpg")} />
              </Left>
              <Body>
                <Text>Sankhadeep</Text>
                <Text note numberOfLines={1}>
                  Its time to build a difference . .
                </Text>
              </Body>
              <Right>
                <Button transparent>
                  <Text>a</Text>
                </Button>
              </Right>
              <Right>
                <Button transparent>
                  <Text>b</Text>
                </Button>
              </Right>
            </ListItem>
          </List>
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
