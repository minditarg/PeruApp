import React, { Component } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Button, Text } from "native-base";

export class AddTrabajo extends Component {
  render() {
    return (
      <Grid>
        <Row size={5}>
          <Col>
            <Text>Te cambie este texto</Text>
          </Col>
        </Row>
        <Row size={1}>
          <Button
            block
            onPress={() => this.props.navigation.navigate("Trabajos")}
          >
            <Text>agregar Trabajo</Text>
          </Button>
        </Row>
      </Grid>
    );
  }
}
