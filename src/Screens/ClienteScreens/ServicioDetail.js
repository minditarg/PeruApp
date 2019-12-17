import React, { Component } from "react";
import {
  View,
  Image,
  SafeAreaView,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  FlatList,
  Linking,
  Platform,
  KeyboardAvoidingView
} from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import {
  Button,
  Text,
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Body,
  Item,
  Form,
  Textarea,
  Input,
  Label,
  Icon,
  Spinner,
  Toast
} from "native-base";
import { stl } from "../styles/styles";
import { CardList } from "../../Componentes/CardList";
import * as servicioService from "../../Services/servicios";
import * as storeda from "../../Store/index";

import { connect } from "react-redux";
import apiConfig from "../../Services/api/config";

import works from "../../../Datos/Trabajos.json";

class ServicioDetail extends Component {
  constructor() {
    super();
    this.state = {
      modal: false,

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

  makeCall = () => {
    let phoneNumber = "";

    if (Platform.OS === "android") {
      phoneNumber = "tel:${1234567890}";
    } else {
      phoneNumber = "telprompt:${1234567890}";
    }

    Linking.openURL(phoneNumber);
  };
  openModal = link => {
    this.setState({ fotoModal: link, modal: true });
  };
  closeModal = () => {
    this.setState({ modal: false });
  };
  sendMail = () => {
    Linking.openURL(
      "mailto:support@example.com?subject=SendMail&body=Description"
    );
  };

  sendWhatsapp = () => {
    Linking.openURL(
      "whatsapp://send?text=" + "soregato" + "&phone=91" + "123456789"
    );
  };

  render() {
    if (!this.props.isLoading) {
      console.log(this.props.servicio);

      let videos = this.state.videosId.map((s, i) => {
        let link = "https://i.ytimg.com/vi/" + s.code + "/hqdefault.jpg";
        return (
          <TouchableOpacity
            key={s.id.toString()}
            onPress={() => {
              this.props.navigation.navigate("VideoPlayer", {
                videoCode: s.code
              });
            }}
          >
            <Image style={stl.imgEmp} source={{ uri: link }} />
          </TouchableOpacity>
        );
      });

      let fotos = this.props.servicio.galeria.map((s, i) => {
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

      let fotoEmpresa = require("../../../assets/noFoto.png");

      if (this.props.servicio.Proveedor.foto) {
        fotoEmpresa = {
          uri: apiConfig.pathFiles + this.props.servicio.Proveedor.foto
        };
      }
      return (
        <Container style={stl.containerList}>
          <Content>
            <View style={stl.cardFluid}>
              <View style={stl.vista}>
                <Grid>
                  <Row>
                    <Text style={stl.tituloSeccionCard}>
                      {this.props.servicio.Proveedor.nombre}
                    </Text>
                  </Row>
                  <Row>
                    <View style={[stl.puntaje, stl.pointEnCard]}>
                      <Icon style={stl.iconstar} type="Ionicons" name="star" />
                      <Icon style={stl.iconstar} type="Ionicons" name="star" />
                      <Icon
                        style={stl.iconstar}
                        type="Ionicons"
                        name="star-half"
                      />
                      <Icon
                        style={stl.iconstar}
                        type="Ionicons"
                        name="star-outline"
                      />
                      <Icon
                        style={stl.iconstar}
                        type="Ionicons"
                        name="star-outline"
                      />
                    </View>
                  </Row>
                  <Row>
                    <Col style={[stl.imgEmpresa, { width: "30%" }]}>
                      <Image style={stl.imgEmp} source={fotoEmpresa} />
                    </Col>
                    <Col style={{ width: "70%" }}>
                      <Text style={stl.txtEmpresa}>
                        {this.props.servicio.Proveedor.descripcion}
                      </Text>
                    </Col>
                  </Row>
                  <Row style={stl.MarginTop15}>
                    <Col>
                      <TouchableOpacity onPress={this.sendMail}>
                        <Text style={stl.MailEmpresa}>
                          {this.props.servicio.Proveedor.email}
                        </Text>
                      </TouchableOpacity>
                    </Col>
                    <Col>
                      <TouchableOpacity onPress={this.sendWhatsapp}>
                        <Text style={stl.TelEmpresa}>
                          {this.props.servicio.Proveedor.telefono}
                        </Text>
                      </TouchableOpacity>
                    </Col>
                  </Row>
                </Grid>
              </View>
            </View>
            <View style={stl.cardFluid}>
              <View style={stl.vista}>
                <Grid>
                  <Row>
                    <Col>
                      <Text style={stl.tituloSeccionCard}>
                        {this.props.servicio.nombre}
                      </Text>
                      <Text style={stl.txtEmpresa}>
                        {" "}
                        {this.props.servicio.descripcion}
                      </Text>
                    </Col>
                  </Row>

                  <Text style={[stl.tituloSeccionCard, stl.MarginTop15]}>
                    Fotos del servicio
                  </Text>

                  <Row style={stl.MarginTop15}>
                    <ScrollView horizontal>{fotos}</ScrollView>
                  </Row>

                  <Text style={[stl.tituloSeccionCard, stl.MarginTop15]}>
                    Videos del servicio
                  </Text>

                  <Row style={stl.MarginTop15}>
                    <ScrollView horizontal>{videos}</ScrollView>
                  </Row>
                </Grid>
              </View>
            </View>
            <Row style={{ justifyContent: "center" }}>
              <Button
                style={[stl.btn, stl.primary]}
                onPress={() => this.logout()}
              >
                <Text style={stl.btnText}>Otros servicios que ofrecemos</Text>
              </Button>
            </Row>
          </Content>
          <Button
            onPress={this.makeCall}
            style={[stl.btnRounded, stl.primary]}
            block
          >
            <Image
              source={require("../../../assets/whapp.png")}
              style={stl.btnFloatImg}
            />
          </Button>
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
                    <Text style={stl.tituloSeccionCard}>
                      Aguanta la mechaaaaaaa
                    </Text>
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
