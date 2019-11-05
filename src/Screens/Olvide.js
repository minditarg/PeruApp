import React, { Component } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  ImageBackground,
  Keyboard
} from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Container, Button, Text, Form, Item, Input, Label } from "native-base";

export class Olvide extends Component {
  render() {
    return (
      <Container style={stl.container}>
        <ImageBackground
          source={require("../../assets/splash.png")}
          style={{ width: "100%", height: "100%" }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Grid style={{ padding: 10 }}>
              <Row size={2}></Row>
              <Row size={3}>
                <Col>
                  <Row size={1}>
                    <Col>
                      <Form style={stl.form}>
                        <Item style={stl.itm} floatingLabel>
                          <Label style={stl.lbl}>Mail</Label>
                          <Input style={stl.input} />
                        </Item>
                      </Form>
                    </Col>
                  </Row>
                  <Row size={1} style={stl.center}>
                    <Button
                      style={[stl.btn, stl.primary]}
                      onPress={() => this.props.navigation.navigate("Login")}
                    >
                      <Text style={stl.btnText}>Enviar Ayuda</Text>
                    </Button>
                  </Row>
                  <Row size={1}></Row>
                </Col>
              </Row>
            </Grid>
          </TouchableWithoutFeedback>
        </ImageBackground>
      </Container>
    );
  }
}

const stl = StyleSheet.create({
  container: { backgroundColor: "#044fb3" },
  center: { justifyContent: "center", alignItems: "center" },
  logo: { width: 40, height: 40, borderRadius: 100 },
  text1: { color: "red", fontWeight: "bold", fontSize: 15 },
  text2: { color: "white", fontWeight: "bold", fontSize: 20 },
  btn: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    margin: "auto",
    padding: 0,
    textAlign: "center",
    borderRadius: 5
  },
  btnText: { textAlign: "center" },
  form: {
    marginLeft: 20,
    marginRight: 30
  },
  primary: {
    backgroundColor: "#2392e5"
  },
  itm: { borderBottomColor: "whitesmoke" },
  lbl: {
    color: "whitesmoke"
  },
  input: {
    color: "whitesmoke"
  },
  btnAyuda: {
    color: "silver"
  },
  alignRight: {
    alignItems: "flex-end"
  }
});
