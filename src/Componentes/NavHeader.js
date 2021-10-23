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
  Text,
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
              onPress={() => 
                  this.props.navigation.navigate("Servicios")
              }
            >
              <Thumbnail
                style={stl.btnAvatar}
                source={require("../../assets/icono1.jpg")}
              />
            </Button>
          </Left>
          <Body>
            <Title style={{ paddingLeft: 10 }}>
             {/* {this.props.navigation.state.key} */}
             {(session.usuarioLogueado() != null && session.usuarioLogueado().nombre != null ? 'Hola ' + session.usuarioLogueado().nombre + "!" : 'Bienvenido')} 
            </Title>
          </Body>
          <Right>
            {this.props.usuario && (
              <Button
                transparent
                onPress={() => { 
                  return session.esUsuarioTipoCliente() ?  this.props.navigation.navigate("UserPerfil") :   this.props.navigation.navigate("Empresa")
                }
              }
              >
                <Thumbnail style={stl.btnAvatar} source={icon} />
              </Button>
            )}
            {!this.props.usuario && (
              <Button
                style={stl.primary}
                onPress={() => this.props.navigation.navigate("Login")}
              >
                <Text>Login</Text>
              </Button>
            )}
          </Right>
        </Header>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => {
  return {
    avatar: session.avatar(),
    usuario: session.usuarioLogueado()
  };
};
export default connect(mapStateToProps)(NavHeader);
