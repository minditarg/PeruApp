import React from "react";

import { Image, StyleSheet } from "react-native";
import { AppLoading } from "expo";
import { Container, Text } from "native-base";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";

import { Col, Row, Grid } from "react-native-easy-grid";

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
      // this.setState({ cargo: true });
      this.props.navigation.navigate("Select");
    }, 1);
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    return (
      <Container style={stl.container}>
        <Grid>
          <Row size={1}>
            <Col style={stl.center}>
              <Image
                style={stl.logo}
                source={require("../assets/icono1.jpg")}
              />
              <Text style={stl.text1}>CONSTRUCCIONES</Text>
              <Text style={stl.text2}>SOLUCIONES</Text>
            </Col>
          </Row>
        </Grid>
      </Container>
    );
  }
}

const stl = StyleSheet.create({
  container: { backgroundColor: "#044fb3" },
  center: { justifyContent: "center", alignItems: "center" },
  logo: { width: 100, height: 100, borderRadius: 100 },
  text1: { color: "red", fontWeight: "bold", fontSize: 15 },
  text2: { color: "white", fontWeight: "bold", fontSize: 20 }
});
