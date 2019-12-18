import React from "react";
import { Image, View, ImageBackground } from "react-native";
import { AppLoading } from "expo";
import { Spinner } from "native-base";
import { stl } from "./Screens/styles/styles";

import { Container, Toast } from "native-base";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Col, Row, Grid } from "react-native-easy-grid";
import * as session from "./Services/session";
/*en esta pantalla tengo que refrescar USER_TOKEN si existe
  cargar las fuentes del template
  iniciar timeout de refresh USER_TOKEN */

export default class AppLoad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("../node_modules/native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("../node_modules/native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font
    });
    this.setState({ isReady: true });
    setTimeout(() => {
      let logueado = session.estaLogueado().then(response => {
        if (response) {
          if (session.esUsuarioTipoCliente())
            this.props.navigation.navigate("FeedServicios");
            else if (session.esUsuarioTipoEmpresa() && session.usuarioLogueado().Proveedor != null)
            this.props.navigation.navigate("Servicios");
          else {
            //se pudo registrar pero no completo los datos particulares
            if (session.esAppTipoCliente()) {
              this.props.navigation.navigate("Trabajos");
            } else {
              this.props.navigation.navigate("RegistrarProveedor");
            }
          }
        }else{
          this.props.navigation.navigate("Select");
        }
      });
    }, 300);
  }

  render() {
    /* if (!this.state.isReady) {
      return <AppLoading />;
    }*/
    return (
      <Container>
        <ImageBackground
          source={require("../assets/splash.png")}
          style={{ width: "100%", height: "100%" }}
        >
          {!this.state.isReady && (
            <View style={stl.loading}>
              <View style={stl.loadingbk}>
                <Spinner color="white" />
              </View>
            </View>
          )}
        </ImageBackground>
      </Container>
    );
  }
}
