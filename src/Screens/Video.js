import React, { Component } from "react";
import { WebView } from "react-native";
import { Row, Grid } from "react-native-easy-grid";
import { Container, Button, Text } from "native-base";
import { connect } from "react-redux";
import { stl } from "./styles/styles";

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
                ...(this.props.seleccion.appPara === "Cliente"
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
mapStateToProps = state => {
  //console.log(state);
  return { seleccion: state.AppChose[0] };
};

export default connect(mapStateToProps)(Video);
