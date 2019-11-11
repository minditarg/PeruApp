import React, { Component } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  ImageBackground,
  Keyboard,
  ScrollView,
  SafeAreaView
} from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Container, Button, Text, Form, Item, Input, Label } from "native-base";
import { stl } from "./styles/styles";

export class Olvide extends Component {
  render() {
    return (
      <SafeAreaView style={stl.container}>
        <ImageBackground
          source={require("../../assets/bkblues.png")}
          style={stl.imgBkground}
        >
          <ScrollView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <Grid>
                <Row size={2}>
                  <Image
                    style={stl.imgLogoGrande}
                    source={require("../../assets/img-header-18.png")}
                  />
                </Row>
                <Row size={3}>
                  <Col>
                    <Form style={stl.form}>
                      <Item floatingLabel>
                        <Label style={stl.textwhite}>Mail</Label>
                        <Input style={stl.textwhite} />
                      </Item>
                      <Row size={1} style={stl.center}>
                        <Button
                          style={[stl.btn, stl.primary]}
                          onPress={() =>
                            this.props.navigation.navigate("Login")
                          }
                        >
                          <Text style={stl.btnText}>Enviar Ayuda</Text>
                        </Button>
                      </Row>
                    </Form>
                  </Col>
                </Row>
              </Grid>
            </TouchableWithoutFeedback>
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}
