import React, { Component } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Linking,
  Platform
} from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Button, Text, Container, Content } from "native-base";
import { Calificacion } from "../../Componentes/Calificacion";
import { stl } from "../styles/styles";
import { CardList } from "../../Componentes/CardList";
import { connect } from "react-redux";
import apiConfig from "../../Services/api/config";
import * as servicioService from "../../Services/servicios";
import * as empresaService from "../../Services/proveedor";

class EmpresaDetail extends Component {
  constructor() {
    super();
  }

  //#region UiFunctions
  makeCall = num => {
    let phoneNumber = "";
    if (Platform.OS === "android") {
      phoneNumber = "tel:${" + num + "}";
    } else {
      phoneNumber = "telprompt:${" + num + "}";
    }
    Linking.openURL(phoneNumber);
  };
  sendMail = mail => {
    Linking.openURL("mailto:" + mail + "?subject=SendMail&body=Description");
  };
  sendWhatsapp = num => {
    Linking.openURL("whatsapp://send?text=" + "soregato" + "&phone=91" + num);
  };
  //#endregion
  render() {
    let emp = this.props.empresa;
    let serv = this.props.servicios;
    //#region Foto Empresa
    let fotoEmpresa = require("../../../assets/noFoto.png");
    if (emp.foto) {
      fotoEmpresa = {
        uri: apiConfig.pathFiles + emp.foto
      };
    }
    //#endregion
    return (
      <Container style={stl.containerList}>
        <Content>
          <View style={stl.cardFluid}>
            <View style={stl.vista}>
              <Grid>
                <Row>
                  <Text style={stl.tituloSeccionCard}>{emp.nombre}</Text>
                </Row>
                <Row>
                  <Col style={stl.puntajeEnCard}>
                    <Calificacion promedio={2}></Calificacion>
                  </Col>
                </Row>
                <Row>
                  <Col style={[stl.imgEmpresa, { width: "30%" }]}>
                    <Image style={stl.imgEmp} source={fotoEmpresa} />
                  </Col>
                  <Col style={{ width: "70%" }}>
                    <Text style={stl.txtEmpresa}>{emp.descripcion}</Text>
                  </Col>
                </Row>
                <Row style={stl.MarginTop15}>
                  <Col>
                    <TouchableOpacity onPress={() => this.sendMail(emp.email)}>
                      <Text numberOfLines={1} style={stl.MailEmpresa}>
                        {emp.email}
                      </Text>
                    </TouchableOpacity>
                  </Col>
                  <Col>
                    <TouchableOpacity
                      onPress={() => this.makeCall(emp.telefono)}
                    >
                      <Text style={stl.TelEmpresa}>{emp.telefono}</Text>
                    </TouchableOpacity>
                  </Col>
                </Row>
              </Grid>
            </View>
          </View>
          <View style={stl.labelSeccion}>
            <Text style={stl.tituloSeccion}>Servicios ofrecidos</Text>
          </View>
          <FlatList
            style={stl.listaPadding}
            data={serv}
            renderItem={({ item }) => (
              <CardList
                onPress={() => {
                  servicioService.get(item.id);
                  this.props.navigation.push("ServicioDetail", { id: item.id });
                }}
                navigation={this.props.navigation}
                Image
                obj={item}
              />
            )}
            keyExtractor={item => item.id.toString()}
          />
        </Content>
        <Button
          onPress={() => this.sendWhatsapp(emp.telefono)}
          style={[stl.btnRounded, stl.primary]}
          block
        >
          <Image
            source={require("../../../assets/whapp.png")}
            style={stl.btnFloatImg}
          />
        </Button>
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    empresa: empresaService.getStore().ProveedorSeleccionado,
    servicios: empresaService.getStore().ServiciosPorProveedor
  };
};
export default connect(mapStateToProps)(EmpresaDetail);
