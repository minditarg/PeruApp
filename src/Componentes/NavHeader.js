import React, { Component } from "react";
import { ImageBackground } from "react-native";
import {
  Container,
  Header,
  Title,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Thumbnail,
  View
} from "native-base";
import { stl } from "../Screens/styles/styles";
import * as session from "../Services/session";

export class NavHeader extends React.Component {
  constructor() {
    super();
  }
  render() {
    let icon =
      session.avatar() != null
        ? { uri: session.avatar() }
        : require("../../assets/noFoto.png");
    return (
      <ImageBackground
        source={require("../../assets/headerbk-18.png")}
        style={{ width: "100%" }}
      >
        <Header transparent noShadow>
          <Left>
            <Thumbnail
              style={stl.btnAvatar}
              source={require("../../assets/icono1.jpg")}
            />
          </Left>
          <Body>
            <Title style={{ paddingLeft: 10 }}>
              {this.props.navigation.key}
            </Title>
          </Body>
          <Right>
            <Button transparent>
              <Thumbnail style={stl.btnAvatar} source={icon} />
            </Button>
          </Right>
        </Header>
      </ImageBackground>
    );
  }
}
