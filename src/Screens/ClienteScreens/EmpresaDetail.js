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

class EmpresaDetail extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Container style={stl.containerList}>
        <Content>
          <View stye={stl.CardEmpresa}>
            <Row>
              <Col>
                <Image source={require("../../../assets/noFoto.png")} />
              </Col>
              <Col>
                <Text style={stl.btnText}>Nombre Empresa</Text>
                <Text style={stl.btnText}>
                  descripcion de la empresa larga larga larga mas y mas y
                  todavia mas larga que lo anterior
                </Text>
                <Text style={stl.btnText}>2215603558 </Text>
              </Col>
            </Row>
          </View>

          <View style={stl.labelSeccion}>
            <Text style={stl.tituloSeccion}>Servicios ofrecidos</Text>
          </View>
          <FlatList
            data={works}
            renderItem={({ item }) => (
              <CardList navigation={this.props.navigation} Image obj={item} />
            )}
            keyExtractor={item => item.id.toString()}
          />
        </Content>
      </Container>
    );
  }
}
export default EmpresaDetail;
