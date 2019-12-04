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
import { Col, Row } from "react-native-easy-grid";
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

import works from "../../../Datos/Trabajos.json";

class ServicioDetail extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Container style={stl.containerList}>
        <Content>
          <View stye={stl.CardEmpresa}>
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
                <Text style={stl.TelEmpresa}>2215603558 </Text>
              </Col>
            </Row>
          </View>

          <Row>
            <Col>
              <Text style={stl.btnText}>Nombre Servicio</Text>
              <Text style={stl.btnText}>
                descripcion de la empresa larga larga larga mas y mas y todavia
                mas larga que lo anterior
              </Text>
              <Text style={stl.btnText}>Estrellitas </Text>
            </Col>
          </Row>
          <Row>
            <ScrollView horizontal>
              <Image source={require("../../../assets/noFoto.png")} />
              <Image source={require("../../../assets/noFoto.png")} />
              <Image source={require("../../../assets/noFoto.png")} />
              <Image source={require("../../../assets/noFoto.png")} />
            </ScrollView>
          </Row>
          <Row>
            <Button
              style={[stl.btnSelect, stl.primary]}
              block
              onPress={() => this.Elegir("Cliente")}
            >
              <Text style={stl.btnText}>Quiero contratar un servicio</Text>
            </Button>
          </Row>
        </Content>
      </Container>
    );
  }
}
export default ServicioDetail;
