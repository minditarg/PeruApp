import React, { Component } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import {Container, Button, Text } from "native-base";
export class Select extends Component {
  render() {
    return (
<Container style={stl.container}>
    
    <Grid> 
      <Row size={1}>
        <Col style={stl.center} >
          <Image style={stl.logo} source={require('../../assets/icono1.jpg')} />
          <Text style={stl.text1}>CONSTRUCCIONES</Text>
          <Text style={stl.text2}>SOLUCIONES</Text>
        </Col>
      </Row>
      <Row>
          <Col>
            <Button style={stl.btn}
              block
              onPress={() => this.props.navigation.navigate("Video", {
                videoTipo: 'cliente'})}
            >
              <Text  style={stl.btnText}>Quiero Construir</Text>
            </Button>
          </Col>
          <Col>
            <Button  style={stl.btn}
              block
              onPress={() => this.props.navigation.navigate("Video", {
                videoTipo: 'constructor'})}
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

const stl = StyleSheet.create({
  container:{ backgroundColor: '#044fb3' },
  center: { justifyContent: 'center', alignItems: 'center', },
  logo: { width: 100, height: 100, borderRadius:100 },
  text1:{ color: 'red', fontWeight:'bold',fontSize:15 },
  text2:{ color: 'white', fontWeight:'bold',fontSize:20 },
  btn: { margin:5,  paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20,
  height:80},
  btnText:{ textAlign:'center'}
})

