import React, { Component } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Button, Text } from "native-base";

export class AddServicio extends Component {
  render() {
    return (
      <Grid>
        <Row size={5}>
          <Col>
            <Text>Todavia no ofrecen ningun servicio</Text>
          </Col>
        </Row>
        <Row size={1}>
          <Button
            block
            onPress={() => this.props.navigation.navigate("Servicios")}
          >
            <Text>agregar Servicio</Text>
          </Button>
        </Row>
      </Grid>
    );
  }
}
