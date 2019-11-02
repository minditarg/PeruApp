import React, { Component } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Container, Button, Text } from "native-base";
import { connect } from "react-redux";

import { APP_CHOOSE_TYPE } from "../Actions/actionsTypes";
import FormMessage from '../Componentes/FormMessage';
class Select extends Component {
  constructor() {
    super();
  }

  Elegir(tipo) {
    this.props.dispatch({
      type: APP_CHOOSE_TYPE,
      playload: {
        tipo: tipo
      }
    });

    this.props.navigation.navigate("Video");
  }

  render() {
    return (
      <Container style={stl.container}>
        <Grid>
          <Row size={1}>


            <Col style={stl.center}>
            <FormMessage message = {"regatomanolo"} type= {'warning'}></FormMessage>

              <Image
                style={stl.logo}
                source={require("../../assets/icono1.jpg")}
              />
              <Text style={stl.text1}>CONSTRUCCIONES</Text>
              <Text style={stl.text2}>SOLUCIONES</Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                style={stl.btn}
                block
                onPress={() => this.Elegir("Cliente")}
              >
                <Text style={stl.btnText}>Quiero Construir</Text>
              </Button>
            </Col>
            <Col>
              <Button
                style={stl.btn}
                block
                onPress={() => this.Elegir("Empresa")}
              >
                <Text style={stl.btnText}>Soy Constructor</Text>
              </Button>
            </Col>
          </Row>
        </Grid>
      </Container>
    );
  }
}

export default connect()(Select);
const stl = StyleSheet.create({
  container: { backgroundColor: "#044fb3" },
  center: { justifyContent: "center", alignItems: "center" },
  logo: { width: 100, height: 100, borderRadius: 100 },
  text1: { color: "red", fontWeight: "bold", fontSize: 15 },
  text2: { color: "white", fontWeight: "bold", fontSize: 20 },
  btn: {
    margin: 5,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20,
    height: 80
  },
  btnText: { textAlign: "center" }
});
