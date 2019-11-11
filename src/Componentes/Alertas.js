import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

export default class Alerta extends Component {
  render() {
    return (
      <View style={stl.alerta}>
        <Text>{this.props.text} </Text>
      </View>
    );
  }
}

const stl = StyleSheet.create({
  alerta: {
    flex: 1,
    flexDirection: "row",
    position: "absolute",
    top: 20,
    backgroundColor: "#dddddd"
  }
});
