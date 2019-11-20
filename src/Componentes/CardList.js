import React, { Component } from "react";
import { View, Image, TouchableOpacity, Alert } from "react-native";
import { Text, Left, Body, Right, Button, Icon, Toast } from "native-base";
import { stl } from "../Screens/styles/styles";
import * as servicioService from "../Services/servicios";
import * as sessionService from "../Services/session";
import apiConfig from "../Services/api/config";
export class CardList extends Component {
  constructor() {
    super();
  }
  EliminarServicio(servicioId) {
    servicioService.eliminar(servicioId)
      .then(response => {
        if (response.statusType == "success") {
          Toast.show({
            text: response.message,
            buttonText: "OK",
            position: "top",
            type: "success"
          });

          sessionService.actualizarUsuario().then(response => { 
            this.props.navigation.push("Servicios")
          });
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
  HandleEliminarBtn(servicio) {
    Alert.alert(
      'Eliminar servicio',
      '¿Estás seguro de eliminar el servicio: ' + obj.nombre + ' ?',
      [
        {
          style: 'cancel',
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Eliminar', style: 'destructive', onPress: () => this.EliminarServicio(servicio.id) },
      ],
      { cancelable: false },
    );
  }
  render() {
    let obj = this.props.obj;
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate("UpdateServicio", {id: obj.id} );
        }}
      >
        <View style={[stl.card, stl.cardHor]}>
          {this.props.Image && (
            <Left style={stl.cardLeft}>
              <Image
                style={stl.cardImg}
                source={{ uri: apiConfig.pathFiles + obj.foto }}
              />
            </Left>
          )}
          <Body style={stl.cardBody}>
            <Text style={stl.cardTitulo}>{obj.nombre}</Text>
            <Text style={stl.cardSubtitulo}>{obj.descripcion}</Text>
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
                this.HandleEliminarBtn(obj)
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
