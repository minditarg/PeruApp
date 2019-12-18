import React, { Component } from "react";
import { WebView, Platform } from "react-native";
import { Row, Grid } from "react-native-easy-grid";
import { Container, Button, Text } from "native-base";
import { connect } from "react-redux";
import { stl } from "./styles/styles";
import * as session from "../Services/session";
class Video extends Component {
  constructor() {
    super();
  }
  onListenMessage() {}
  handleNextBtn() {
    if (session.esAppTipoCliente()) {
      this.props.navigation.navigate("Cliente");
    } else {
      this.props.navigation.navigate("Login");
    }
  }

  render() {
    return (
      <Container style={stl.container}>
        <Grid>
          <Row size={1}>
            <WebView
              cacheEnabled={true}
              javaScriptEnabled={true}
              allowsInlineMediaPlayback={true}
              startInLoadingState={true}
              domStorageEnabled
              onMessage={msg => console.log(msg)}
              mediaPlaybackRequiresUserAction={
                Platform.OS !== "android" || Platform.Version >= 17
                  ? false
                  : undefined
              }
              userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"
              source={{
                ...(session.esAppTipoCliente()
                  ? {
                      uri:
                        "https://www.youtube.com/embed/7qOqCtg6HWo?&controls=0&rel=0&autoplay=1&frameborder='0'&allow='autoplay;'&allowfullscreen"
                    }
                  : {
                      uri:
                        "https://www.youtube.com/embed/1TEn9uxH07w?&controls=0&rel=0&autoplay=1&frameborder='0'&allow='autoplay;'&allowfullscreen"
                    })
              }}
            />
          </Row>
        </Grid>
        <Button
          style={stl.btnSaltar}
          block
          onPress={() => this.handleNextBtn()}
        >
          <Text>>> Saltar</Text>
        </Button>
      </Container>
    );
  }
}

export default Video;
