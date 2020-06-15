import React, { Component } from "react";
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform
} from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Button, Text, Container, Content, Spinner } from "native-base";
import { stl } from "../styles/styles";
import * as servicioService from "../../Services/servicios";
import * as empresaService from "../../Services/proveedor";
import { Calificacion } from "../../Componentes/Calificacion";
import { connect } from "react-redux";
import apiConfig from "../../Services/api/config";

class ServicioDetail extends Component {
  constructor() {
    super();
    this.state = {
      modal: false,
      fotoModal: "",
      videosId: [
        {
          id: 1,
          code: "KI2lsdXJQ40"
        },
        {
          id: 2,
          code: "9Fv5cuYZFC0"
        },

        {
          id: 3,
          code: "IvUU8joBb1Q"
        }
      ]
    };
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

  openModal = link => {
    this.setState({ fotoModal: link, modal: true });
    console.log(this.state.fotoModal);
  };
  closeModal = () => {
    this.setState({ modal: false });
  };
  sendMail = mail => {
    Linking.openURL("mailto:" + mail + "?subject=SendMail&body=Description");
  };
  sendWhatsapp = num => {
    Linking.openURL("whatsapp://send?text=" + "soregato" + "&phone=91" + num);
  };
  //#endregion
  render() {
    if (!this.props.isLoading) {
      let Servicio = this.props.servicio;
      let Proveedor = Servicio.Proveedor;
      //#region Videos
      
      let videos = Servicio.videos.map((s, i) => {
        let link = "https://i.ytimg.com/vi/" + s.video + "/hqdefault.jpg";
        return (
          <TouchableOpacity
            key={s.id.toString()}
            onPress={() => {
              this.props.navigation.navigate("VideoPlayer", {
                videoCode: s.video
              });
            }}
          >
            <Image style={stl.imgEmp} source={{ uri: link }} />
          </TouchableOpacity>
        );
      });
      //#endregion
      //#region Fotos Servicio
      let fotoPcipal = require("../../../assets/noFoto.png");
      if (Servicio.foto) {
        fotoPcipal = {
          uri: apiConfig.pathFiles + Servicio.foto
        };
      }
      let fotos = Servicio.galeria.map((s, i) => {
        let link = require("../../../assets/noFoto.png");
        if (s.foto) {
          link = {
            uri: apiConfig.pathFiles + s.foto
          };
        }
        return (
          <TouchableOpacity
            key={s.id.toString()}
            onPress={() => this.openModal(link)}
          >
            <Image style={stl.imgEmp} source={link} />
          </TouchableOpacity>
        );
      });
      //#endregion
      //#region Foto Empresa
      let fotoEmpresa = require("../../../assets/noFoto.png");
      if (Servicio.Proveedor.foto) {
        fotoEmpresa = {
          uri: apiConfig.pathFiles + Proveedor.foto
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
                    <Col>
                      <Text style={stl.tituloSeccionCard}>
                        {Servicio.nombre}
                      </Text>
                      <Row>
                        <Col style={stl.puntajeEnCard}>
                          <Calificacion
                            promedio={Servicio.puntaje}
                          ></Calificacion>
                        </Col>
                      </Row>
                      <Text style={stl.txtEmpresa}>{Servicio.descripcion}</Text>
                    </Col>
                  </Row>

                  <Text style={[stl.tituloSeccionCard, stl.MarginTop15]}>
                    Fotos del servicio
                  </Text>

                  <Row style={stl.MarginTop15}>
                    <ScrollView horizontal>
                      <TouchableOpacity
                        keyExtractor={item => item.id.toString()}
                        onPress={() => this.openModal(fotoPcipal)}
                      >
                        <Image style={stl.imgEmp} source={fotoPcipal} />
                      </TouchableOpacity>

                      {fotos}
                    </ScrollView>
                  </Row>
                  {Servicio.videos.length > 0 && (
                    <Text style={[stl.tituloSeccionCard, stl.MarginTop15]}>
                      Videos del servicio
                    </Text>
                  )}

                  <Row style={stl.MarginTop15}>
                    <ScrollView horizontal>{videos}</ScrollView>
                  </Row>
                </Grid>
              </View>
            </View>
            <View style={stl.cardFluid}>
              <View style={stl.vista}>
                <Grid>
                  <Row>
                    <Text style={stl.tituloSeccionCard}>
                      {Proveedor.nombre}
                    </Text>
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
                      <Text style={stl.txtEmpresa}>
                        {Proveedor.descripcion}
                      </Text>
                    </Col>
                  </Row>
                  <Row style={stl.MarginTop15}>
                    <Col>
                      <TouchableOpacity
                        onPress={() => this.sendMail(Proveedor.email)}
                      >
                        <Text numberOfLines={1} style={stl.MailEmpresa}>
                          {Proveedor.email}
                        </Text>
                      </TouchableOpacity>
                    </Col>
                    <Col>
                      <TouchableOpacity
                        onPress={() => this.sendWhatsapp(Proveedor.telefono)}
                      >
                        <Text style={stl.TelEmpresa}>{Proveedor.telefono}</Text>
                      </TouchableOpacity>
                    </Col>
                  </Row>
                </Grid>
              </View>
            </View>

            <Row style={{ justifyContent: "center" }}>
              <Button
                style={[stl.btn, stl.primary]}
                onPress={() => {
                  empresaService.get(Proveedor.id);
                  empresaService.getServicios(Proveedor.id);
                  this.props.navigation.push("EmpresaDetail", {
                    id: Proveedor.id
                  });
                }}
              >
                <Text style={stl.btnText}>Otros servicios que ofrecemos</Text>
              </Button>
            </Row>
          </Content>
          {!this.state.modal && (
            <Button
              onPress={() => this.makeCall(Proveedor.telefono)}
              style={[stl.btnRounded, stl.primary]}
              block
            >
              <Image
                source={require("../../../assets/whapp.png")}
                style={stl.btnFloatImg}
              />
            </Button>
          )}
          {this.state.modal && (
            <TouchableOpacity style={stl.modal} onPress={this.closeModal}>
              <View>
                <Image style={stl.imgModal} source={this.state.fotoModal} />
              </View>
            </TouchableOpacity>
          )}
        </Container>
      );
    } else {
      return (
        <Container style={stl.containerList}>
          <Content>
            <View style={stl.cardFluid}>
              <View style={stl.vista}>
                <Grid>
                  <Row>
                    <View style={stl.loading}>
                      <View style={stl.loadingbk}>
                        <Spinner color="white" />
                      </View>
                    </View>
                  </Row>
                </Grid>
              </View>
            </View>
          </Content>
        </Container>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    isLoading: servicioService.getStore().isloading,
    servicio: servicioService.getStore().servicioSeleccionado
  };
};
export default connect(mapStateToProps)(ServicioDetail);
