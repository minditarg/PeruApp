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
  KeyboardAvoidingView
} from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import {
  Button,
  Text,
  Form,
  Item,
  Textarea,
  Input,
  Label,
  Container,
  Icon,
  Content,
  Spinner,
  Toast
} from "native-base";
import { stl } from "../styles/styles";
import { CardList } from "../../Componentes/CardList";
import { connect } from "react-redux";
import apiConfig from "../../Services/api/config";
import works from "../../../Datos/Trabajos.json";
import * as empresaService from "../../Services/proveedor";

class EmpresaDetail extends Component {
  constructor() {
    super();
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
    console.log("en empresa");

    console.log(this.props.empresa);
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
          <View style={stl.labelSeccion}>
            <Text style={stl.tituloSeccion}>Servicios ofrecidos</Text>
          </View>
          {/*<FlatList
            style={stl.listaPadding}
            data={works}
            renderItem={({ item }) => (
              <CardList navigation={this.props.navigation} Image obj={item} />
            )}
            keyExtractor={item => item.id.toString()}
          />*/}
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
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    estado: state,
    empresa: empresaService.getStore().ProveedorSeleccionado,
    servicios: empresaService.getStore().ServiciosPorProveedor
  };
};
export default connect(mapStateToProps)(EmpresaDetail);
