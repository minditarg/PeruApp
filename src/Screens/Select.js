import React, { Component } from "react";
import { ImageBackground } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Container, Button, Text } from "native-base";
import { connect } from "react-redux";
import { APP_CHOOSE_TYPE } from "../Actions/actionsTypes";
import { stl } from "./styles/styles";

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
      <Container>
        <ImageBackground
          source={require("../../assets/splash.png")}
          style={stl.imgBkground}
        >
          <Grid>
            <Row style={stl.center}></Row>
            <Row>
              <Col>
                <Button
                  style={[stl.btnSelect, stl.primary]}
                  block
                  onPress={() => this.Elegir("Cliente")}
                >
                  <Text style={stl.btnText}>Quiero Construir</Text>
                </Button>
              </Col>
              <Col>
                <Button
                  style={[stl.btnSelect, stl.darkBlue]}
                  block
                  onPress={() => this.Elegir("Empresa")}
                >
                  <Text style={stl.btnText}>Soy Constructor</Text>
                </Button>
              </Col>
            </Row>
          </Grid>
        </ImageBackground>
      </Container>
    );
  }
}

export default connect()(Select);
