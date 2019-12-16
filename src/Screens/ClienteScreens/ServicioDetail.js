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
    return (
      <Container style={stl.containerList}>
        <Content>
          <View style={stl.cardFluid}>
            <View style={stl.vista}>
              <Grid>
                <Row>
                  <Text style={stl.tituloSeccionCard}>Nombresadf Empresa</Text>
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
                    <Image
                      style={stl.imgEmp}
                      source={require("../../../assets/noFoto.png")}
                    />
                  </Col>
                  <Col style={{ width: "70%" }}>
                    <Text style={stl.txtEmpresa}>
                      descripcion de la empresa larga larga larga mas y mas y
                      todavia mas larga que lo anterior
                    </Text>
                  </Col>
                </Row>
                <Row style={stl.MarginTop15}>
                  <Col>
                    <TouchableOpacity onPress={this.sendMail}>
                      <Text style={stl.MailEmpresa}>mail@empresa.com </Text>
                    </TouchableOpacity>
                  </Col>
                  <Col>
                    <TouchableOpacity onPress={this.sendWhatsapp}>
                      <Text style={stl.TelEmpresa}>2215603558 </Text>
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
                      Titulo del servicio
                    </Text>
                    <Text style={stl.txtEmpresa}>
                      descripcion del servicio larga larga larga mas y mas y
                      todavia mas larga que lo anterior
                    </Text>
                  </Col>
                </Row>

                <Text style={[stl.tituloSeccionCard, stl.MarginTop15]}>
                  Fotos del servicio
                </Text>

                <Row style={stl.MarginTop15}>
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
