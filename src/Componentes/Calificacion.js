import React, { Component } from "react";
import { View, Image, TouchableOpacity, Alert } from "react-native";
import { Text, Left, Body, Right, Button, Icon, Toast } from "native-base";
import { stl } from "../Screens/styles/styles";
export class Calificacion extends Component {
  constructor() {
    console.log();
    super();
  }

  render() {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      if (i + 1 <= this.props.promedio) {
        stars.push(
          <Icon key={i} style={stl.iconstar} type="Ionicons" name="star" />
        );
      } else if (i + 1 > this.props.promedio && i < this.props.promedio) {
        stars.push(
          <Icon key={i} style={stl.iconstar} type="Ionicons" name="star-half" />
        );
      } else {
        stars.push(
          <Icon
            key={i}
            style={stl.iconstar}
            type="Ionicons"
            name="star-outline"
          />
        );
      }
    }

    return <View style={stl.puntaje}>{stars}</View>;
  }
}
