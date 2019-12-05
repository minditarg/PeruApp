import React, { Component } from "react";
import { View, Image, TouchableOpacity, Alert } from "react-native";
import { Text, Left, Body, Right, Button, Icon, Toast } from "native-base";
import { stl } from "../Screens/styles/styles";
import * as servicioService from "../Services/servicios";
import * as sessionService from "../Services/session";
import apiConfig from "../Services/api/config";
export class ListTrabajo extends Component {
  constructor() {
    super();
    console.log("eee");
  }
 
  
  render() {
    let obj = this.props.obj;
    return (
      <TouchableOpacity
        
      >
        <View style={[stl.card, stl.cardHor]}>
          {this.props.Image && (
            <Left style={stl.cardLeft}>
              <Image
                style={stl.cardImg}
                source={
                  obj.foto
                    ? { uri: apiConfig.pathFiles + obj.foto }
                    : require("../../assets/nofotoservice.png")
                }
              />
            </Left>
          )}
          <Body style={stl.cardBody}>
            <Text style={stl.cardTitulo}>{obj.Servicio.nombre}</Text>
            <Text style={stl.cardSubtitulo}>{obj.Servicio.descripcion}</Text>
            <View style={stl.puntajeDelProveedor}>
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
