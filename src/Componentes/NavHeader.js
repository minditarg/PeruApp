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
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";

class NavHeader extends React.Component {
  constructor() {
    super();
    this.state = {
      foto: session.avatar()
    };
  }

  render() {
    let icon =
      this.props.avatar != null
        ? { uri: this.props.avatar }
        : require("../../assets/noFoto.png");

    return (
      <ImageBackground
        source={require("../../assets/headerbk-18.png")}
        style={{ width: "100%" }}
      >
        <Header transparent noShadow>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("Servicios")}
            >
              <Thumbnail
                style={stl.btnAvatar}
                source={require("../../assets/icono1.jpg")}
              />
            </Button>
          </Left>
          <Body>
            <Title style={{ paddingLeft: 10 }}>
              {this.props.navigation.state.key}
            </Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("Empresa")}
            >
              {/* <Thumbnail style={stl.btnAvatar} source={icon} />*/}
            </Button>
          </Right>
        </Header>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => {
  return {
    avatar: session.avatar()
  };
};
export default connect(mapStateToProps)(NavHeader);
