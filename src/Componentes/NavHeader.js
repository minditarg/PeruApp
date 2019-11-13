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
    return (
      <ImageBackground
        source={require("../../assets/headerbk-18.png")}
        style={{ width: "100%" }}
      >
        <Header transparent noShadow>
          <Left>
            <Thumbnail
              style={stl.btnAvatar}
              source={require("../../assets/icon.png")}
            />
          </Left>
          <Body>
            <Title style={{ paddingLeft: 10 }}>
              {this.props.navigation.key}
            </Title>
          </Body>
          <Right>
            <Button transparent>
              <Thumbnail
                style={stl.btnAvatar}
                source={{
                  uri:
                    "data:image/png;base64," +
                    session.usuarioLogueado().Proveedor.foto
                }}
              />
            </Button>
          </Right>
        </Header>
      </ImageBackground>
    );
  }
}
