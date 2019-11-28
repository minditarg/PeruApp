import React, { Component } from "react";
import {
  View,
  Image,
  SafeAreaView,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  Keyboard,
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
  Icon,
  Content,
  Spinner,
  Toast
} from "native-base";
import { stl } from "../styles/styles";

class ServicioDetail extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" enabled>
        <SafeAreaView style={stl.containerList}>
          <ScrollView ref="_scrollView" style={stl.scrollView}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <Content style={stl.card}>
                <View style={stl.EmpresaDetail}>
                  <Row>
                    <Col>
                      <Image
                        source={require("../../../assets/noFoto.png")}
                      ></Image>
                    </Col>
                    <Col>
                      <Text>Nomre de la Empresa</Text>
                      <Text>
                        "Lorem ipsum dolor sit amet, "Lorem ipsum dolor sit
                        amet, "Lorem ipsum dolor sit amet,
                      </Text>

                      <View>
                        <Text> 2215603558 </Text>
                      </View>
                    </Col>
                  </Row>
                </View>
                <View style={stl.EmpresaDetail}>
                  <Row>
                    <Col>
                      <Text>Nomre del Servicio</Text>
                      <Text>"Descripcion del servicio,</Text>
                      <View style={stl.puntaje}>
                        <Icon
                          style={stl.iconstar}
                          type="Ionicons"
                          name="star"
                        />
                        <Icon
                          style={stl.iconstar}
                          type="Ionicons"
                          name="star"
                        />
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
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Image
                        source={require("../../../assets/noFoto.png")}
                      ></Image>
                      <Image
                        source={require("../../../assets/noFoto.png")}
                      ></Image>
                      <Image
                        source={require("../../../assets/noFoto.png")}
                      ></Image>
                      <Image
                        source={require("../../../assets/noFoto.png")}
                      ></Image>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button
                        onPress={() =>
                          this.props.navigation.navigate("EmpresaDetail")
                        }
                        style={[stl.btnSelect, stl.Premium]}
                        block
                      >
                        <Text style={stl.btnText}>PREMIUM</Text>
                      </Button>
                    </Col>
                  </Row>
                </View>
              </Content>
            </TouchableWithoutFeedback>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}
export default ServicioDetail;
