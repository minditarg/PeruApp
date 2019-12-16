import React, { Component } from "react";
import { WebView, Platform } from "react-native";
import { Row, Grid } from "react-native-easy-grid";
import { Container, Button, Text } from "native-base";
import { connect } from "react-redux";
import { stl } from "../styles/styles";

class VideoPlayer extends Component {
  constructor() {
    super();
  }
  onListenMessage() {}
  handleNextBtn() {
    this.props.navigation.pop();
  }

  render() {
    let videoCode = this.props.navigation.getParam("videoCode", "NO-ID");

    let link =
      "https://www.youtube.com/embed/" +
      videoCode +
      "?&controls=0&rel=0&autoplay=1&frameborder='0'&allow='autoplay;'&allowfullscreen";
    console.log(videoCode);
    console.log(link);
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
              source={{ uri: link }}
            />
          </Row>
        </Grid>
        <Button
          style={stl.btnSaltar}
          block
          onPress={() => this.handleNextBtn()}
        >
          <Text>X Salir</Text>
        </Button>
      </Container>
    );
  }
}

export default VideoPlayer;
