import React, { Component } from "react";
import { WebView } from "react-native";
import { Row, Grid } from "react-native-easy-grid";
import { Container, Button, Text } from "native-base";
import { connect } from "react-redux";
import { stl } from "./styles/styles";
import * as session from "../Services/session";
class Video extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Container style={stl.container}>
        <Grid>
          <Row size={1}>
            <WebView
              javaScriptEnabled={true}
              source={{
                ...(session.esAppTipoCliente()
                  ? { uri: "https://www.youtube.com/embed/GDAcE3hN0iQ" }
                  : { uri: "https://www.youtube.com/embed/qFPKcgaGCrI" })
              }}
            />
          </Row>
        </Grid>
        <Button
          style={stl.btnSaltar}
          block
          onPress={() => this.props.navigation.navigate("Login")}
        >
          <Text>>> Saltar</Text>
        </Button>
      </Container>
    );
  }
}


export default Video;
