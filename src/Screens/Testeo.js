import React, { Component } from "react";
import { Container, Header, Content, Text, Button, Toast } from "native-base";
export class Testeo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showToast: false
    };
  }
  render() {
    return (
      <Container>
        <Header />
        <Content padder>
          <Button
            onPress={() =>
              Toast.show({
                text: "Wrong password!",
                buttonText: "Okay"
              })
            }
          >
            <Text>Default Toast</Text>
          </Button>
          <Button
            success
            onPress={() =>
              Toast.show({
                text: "Wrong password!",
                buttonText: "Okay",
                type: "success"
              })
            }
          >
            <Text>Success Toast</Text>
          </Button>
          <Button
            warning
            onPress={() =>
              Toast.show({
                text: "Wrong password!",
                buttonText: "Okay",
                type: "warning"
              })
            }
          >
            <Text>Warning Toast</Text>
          </Button>
          <Button
            danger
            onPress={() =>
              Toast.show({
                text: "Wrong password!",
                buttonText: "Okay",
                type: "danger"
              })
            }
          >
            <Text>Danger Toast</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
