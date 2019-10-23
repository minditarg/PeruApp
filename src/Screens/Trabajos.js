import React, { Component } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Button, Text } from "native-base";

export class Trabajos extends Component {
  render() {
    return (
      <Grid>
        <Row size={5}>
          <Col>
            <Text>Todavia no hicieron ningun trabajo</Text>
          </Col>
        </Row>
        <Row size={1}>
          <Button
            block
            onPress={() => this.props.navigation.navigate("AddTrabajo")}
          >
            <Text>Nuevo Trabajo</Text>
          </Button>
        </Row>
      </Grid>
    );
  }
}
