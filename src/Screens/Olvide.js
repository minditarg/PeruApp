import React, { Component } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import {Container, Button, Text, Form, Item, Input, Label } from "native-base";

export class Olvide extends Component {
  render() {
    return (
      <Container style={stl.container}>
        <Grid>
          <Row size={5}>
            <Col>
              <Row size={2}>
                <Col style={stl.center} >
                  <Image style={stl.logo} source={require('../../assets/icono1.jpg')} />
                </Col>
              </Row>
              <Row size={3}>
                <Col>
                  <Form style={stl.form}>
                    <Item style={stl.itm} floatingLabel>
                      <Label style={stl.lbl} >Mail</Label>
                      <Input style={stl.input} />
                    </Item>

                  </Form>
                </Col>
              </Row>
              <Row size={2}>
                <Col>
                  <Button block style={stl.btn}
                  onPress={() => this.props.navigation.navigate("Login")}>
                    <Text style={stl.btnText} >Enviar Ayuda</Text>
                  </Button>
                </Col>
              </Row>

            </Col>
          </Row>

        </Grid>
      </Container>
    );
  }
}


const stl = StyleSheet.create({
  container: { backgroundColor: '#044fb3' },
  center: { justifyContent: 'flex-end', alignItems: 'center', },
  logo: { width: 40, height: 40, borderRadius: 100 },
  text1: { color: 'red', fontWeight: 'bold', fontSize: 15 },
  text2: { color: 'white', fontWeight: 'bold', fontSize: 20 },
  btn: {
    margin: 5,
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20, textAlign: 'center'
  },
  btnText: { textAlign: 'center' },
  form: {
    marginLeft: 20,
    marginRight: 30
  },
  itm: { borderBottomColor: 'whitesmoke' },
  lbl: {
    color: 'whitesmoke'

  },
  input: {
    color: 'whitesmoke'
  },
  btnAyuda: {
    color: 'silver'
  },
  alignRight: {
    alignItems: 'flex-end',
  }
})