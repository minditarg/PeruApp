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

export class NavHeader extends React.Component {
  constructor() {
    super();
  }
  render() {
    console.log(this.props);
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
                source={require("../../assets/icon.png")}
              />
            </Button>
          </Right>
        </Header>
      </ImageBackground>
    );
  }
}