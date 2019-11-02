import React, { Component } from "react";
import { View, Image, StyleSheet ,WebView } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Container, Button, Text } from "native-base";
import { connect } from "react-redux";

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
          ...(this.props.seleccion.appPara==='Cliente'  ? {   uri:'https://www.youtube.com/embed/GDAcE3hN0iQ'} : { uri:'https://www.youtube.com/embed/qFPKcgaGCrI'})
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
mapStateToProps = state => {
  //console.log(state);
  return { seleccion: state.AppChose[0] };
};

export default connect(mapStateToProps)(Video);
const stl = StyleSheet.create({
  container: { backgroundColor: "#044fb3" },
  center: { justifyContent: "center", alignItems: "center" },
  logo: { width: 100, height: 100, borderRadius: 100 },
  text1: { color: "red", fontWeight: "bold", fontSize: 15 },
  text2: { color: "white", fontWeight: "bold", fontSize: 20 },
  text3: { color: "white" },
  btnSaltar: {
    position: "absolute",
    right: 0,
    bottom: 30,
    backgroundColor: "rgba(0,0,0,.5)"
  }
});
