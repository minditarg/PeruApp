import React, { Component } from "react";
import { View, Image, TouchableOpacity, Alert } from "react-native";
import { Text, Left, Body, Right, Button, Icon, Toast } from "native-base";
import { stl } from "../Screens/styles/styles";
import * as servicioService from "../Services/servicios";
import * as sessionService from "../Services/session";
import apiConfig from "../Services/api/config";
import * as trabajosService from "../Services/trabajos";
export class ListTrabajo extends Component {
  constructor() {
    super();
  }
  HandleEliminarBtn(trabajo) {
    Alert.alert(
      "Eliminar trabajo",
      "¿Estás seguro de eliminar el trabajo: " + trabajo.Servicio.nombre + " ?",
      [
        {
          style: "cancel",
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => this.EliminarTrabajo(trabajo.id)
        }
      ],
      { cancelable: false }
    );
  }
  EliminarTrabajo(trabajoId) {
    trabajosService
      .eliminar(trabajoId)
      .then(response => {
        if (response.statusType == "success") {
          Toast.show({
            text: response.message,
            buttonText: "OK",
            position: "top",
            type: "success"
          });
          trabajosService.listadoPorProveedor();
        } else {
          Toast.show({
            text: response.message,
            buttonText: "OK",
            position: "top",
            type: "danger"
          });
        }
      })
      .catch(exception => {
        Toast.show({
          text: exception,
          buttonText: "OK",
          position: "top",
          type: "danger"
        });
        console.log(exception, "exc");
      });
  }

  render() {
    let obj = this.props.obj;
    console.log(obj);
    return (
      <TouchableOpacity

      >
        <View style={[stl.card, stl.cardHor]}>
          {this.props.Image && (
            <Left style={stl.cardLeft}>
              <Image
                style={stl.cardImg}
                source={
                  obj.Servicio.foto
                    ? { uri: apiConfig.pathFiles + obj.Servicio.foto }
                    : require("../../assets/nofotoservice.png")
                }
              />
            </Left>
          )}
          <Body style={stl.cardBody}>
            <Text style={stl.cardTitulo}>{obj.Servicio.nombre}</Text>
            <Text style={stl.cardSubtitulo}>{obj.Cliente.Usuario.nombre} {!obj.puntajeDelCliente && <Text > (aún sin puntuar)</Text>}</Text>
            {obj.puntajeDelCliente &&
              <View style={stl.puntaje}>
                <Icon style={stl.iconstar} type="Ionicons" name="star" />
                <Icon style={stl.iconstar} type="Ionicons" name="star" />
                <Icon style={stl.iconstar} type="Ionicons" name="star-half" />
                <Icon style={stl.iconstar} type="Ionicons" name="star-outline" />
                <Icon style={stl.iconstar} type="Ionicons" name="star-outline" />
              </View>
            }
          </Body>
          {!obj.puntajeDelCliente &&
            <Right style={stl.cardRight}>
              <Button
                transparent
                onPress={() => {
                  this.HandleEliminarBtn(obj);
                }}
              >
                <Icon style={stl.iconCam} type="EvilIcons" name="trash" />
              </Button>
            </Right>
          }
        </View>
      </TouchableOpacity>
    );
  }
}
