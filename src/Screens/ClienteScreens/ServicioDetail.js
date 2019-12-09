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

import works from "../../../Datos/Trabajos.json";

class ServicioDetail extends Component {
  constructor() {
    super();
    this.state = {
      modal: false
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
  openModal = () => {
    this.setState({ modal: true });
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
    return (
      <Container style={stl.containerList}>
        <Content>
          <View style={stl.labelSeccion}>
            <Text style={stl.tituloSeccion}> Servicio</Text>
          </View>
          <View style={stl.cardFluid}>
            <View style={stl.vista}>
              <Grid>
                <Row>
                  <Col>
                    <Text style={stl.tituloSeccion}>Titulo del servicio</Text>
                    <Text style={stl.txtEmpresa}>
                      descripcion del servicio larga larga larga mas y mas y
                      todavia mas larga que lo anterior
                    </Text>
                    <TouchableOpacity onPress={this.sendMail}>
                      <Text style={stl.TelEmpresa}>mail@empresa.com </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.sendWhatsapp}>
                      <Text style={stl.TelEmpresa}>2215603558 </Text>
                    </TouchableOpacity>
                  </Col>
                </Row>
                <View style={stl.labelSeccion}>
                  <Text style={stl.tituloSeccion}> Fotos del servicio</Text>
                </View>
                <Row>
                  <ScrollView horizontal>
                    <TouchableOpacity onPress={this.openModal}>
                      <Image
                        style={stl.imgEmp}
                        source={require("../../../assets/noFoto.png")}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.openModal}>
                      <Image
                        style={stl.imgEmp}
                        source={require("../../../assets/noFoto.png")}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.openModal}>
                      <Image
                        style={stl.imgEmp}
                        source={require("../../../assets/noFoto.png")}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.openModal}>
                      <Image
                        style={stl.imgEmp}
                        source={require("../../../assets/noFoto.png")}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.openModal}>
                      <Image
                        style={stl.imgEmp}
                        source={require("../../../assets/noFoto.png")}
                      />
                    </TouchableOpacity>
                  </ScrollView>
                </Row>
              </Grid>
            </View>
          </View>
          <View style={stl.labelSeccion}>
            <Text style={stl.tituloSeccion}> Empresa</Text>
          </View>
          <View style={stl.cardFluid}>
            <View style={stl.vista}>
              <Grid>
                <Row>
                  <Col style={stl.imgEmpresa}>
                    <Image
                      style={stl.imgEmp}
                      source={require("../../../assets/noFoto.png")}
                    />
                  </Col>
                  <Col style={stl.DescEmpresa}>
                    <Text style={stl.tituloEmpresa}>Nombresadf Empresa</Text>
                    <Text style={stl.txtEmpresa}>
                      descripcion de la empresa larga larga larga mas y mas y
                      todavia mas larga que lo anterior
                    </Text>

                    <TouchableOpacity onPress={this.makeCall}>
                      <Text style={stl.TelEmpresa}>2215603558 </Text>
                    </TouchableOpacity>
                  </Col>
                </Row>
                <Row>
                  <Button
                    style={[stl.btn, stl.primary]}
                    onPress={() => this.logout()}
                  >
                    <Text style={stl.btnText}>
                      Otros servicios que ofrecemos
                    </Text>
                  </Button>
                </Row>
              </Grid>
            </View>
          </View>
        </Content>

        {this.state.modal && (
          <TouchableOpacity style={stl.modal} onPress={this.closeModal}>
            <View>
              <Image
                style={stl.imgModal}
                source={require("../../../assets/noFoto.png")}
              />
            </View>
          </TouchableOpacity>
        )}
      </Container>
    );
  }
}
export default ServicioDetail;
