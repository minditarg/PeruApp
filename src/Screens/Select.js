import React, { Component } from "react";
import { ImageBackground, ScrollView, SafeAreaView, Image } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Button, Text } from "native-base";
import { connect } from "react-redux";
import { APP_CHOOSE_TYPE } from "../Actions/actionsTypes";
import { stl } from "./styles/styles";

import * as session from "../Services/session";
class Select extends Component {
  constructor() {
    super();
  }

  Elegir(tipo) {
    session.elegirTipoApp(tipo);
    // this.props.navigation.navigate("Cliente");
    this.props.navigation.navigate("Video");
  }

  render() {
    return (
      <SafeAreaView style={stl.container}>
        <ImageBackground
          source={require("../../assets/bkblues.png")}
          style={stl.imgBkground}
        >
          <ScrollView>
            <Grid>
              <Row size={2}>
                <Image
                  style={stl.imgLogoGrande}
                  source={require("../../assets/img-header-18.png")}
                />
              </Row>
              <Row style={stl.paddingTop30}>
                <Col>
                  <Button
                    style={[stl.btnSelect, stl.primary]}
                    block
                    onPress={() => this.Elegir("Cliente")}
                  >
                    <Text style={stl.btnText}>
                      Quiero contratar un servicio
                    </Text>
                  </Button>
                </Col>
                <Col>
                  <Button
                    style={[stl.btnSelect, stl.darkBlue]}
                    block
                    onPress={() => this.Elegir("Empresa")}
                  >
                    <Text style={stl.btnText}>Quiero ofrecer un servicio</Text>
                  </Button>
                </Col>
              </Row>
            </Grid>
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

export default connect()(Select);
