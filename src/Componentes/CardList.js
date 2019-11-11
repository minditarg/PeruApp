import React, { Component } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Text, Left, Body, Right, Button, Icon } from "native-base";
import { stl } from "../Screens/styles/styles";

export class CardList extends Component {
  render() {
    let obj = this.props.obj;
    return (
      <TouchableOpacity
        onPress={() => {
          console.log("select");
        }}
      >
        <View style={[stl.card, stl.cardHor]}>
          {this.props.Image && (
            <Left style={stl.cardLeft}>
              <Image
                style={stl.cardImg}
                source={require("../../assets/icon.png")}
              />
            </Left>
          )}
          <Body style={stl.cardBody}>
            <Text style={stl.cardTitulo}>{obj.tipo}</Text>
            <Text style={stl.cardSubtitulo}>{obj.tipo}</Text>
            <View style={stl.puntaje}>
              <Icon style={stl.iconstar} type="Ionicons" name="star" />
              <Icon style={stl.iconstar} type="Ionicons" name="star" />
              <Icon style={stl.iconstar} type="Ionicons" name="star-half" />
              <Icon style={stl.iconstar} type="Ionicons" name="star-outline" />
              <Icon style={stl.iconstar} type="Ionicons" name="star-outline" />
            </View>
          </Body>
          <Right style={stl.cardRight}>
            <Button
              transparent
              onPress={() => {
                console.log("trash");
              }}
            >
              <Icon style={stl.iconCam} type="EvilIcons" name="trash" />
            </Button>
          </Right>
        </View>
      </TouchableOpacity>
    );
  }
}
