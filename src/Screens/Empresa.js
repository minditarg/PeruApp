import React, { Component } from "react";
import {
  View,
  Image,
  SafeAreaView,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  Keyboard
} from "react-native";
import { Col } from "react-native-easy-grid";
import {
  Button,
  Text,
  Form,
  Item,
  Textarea,
  Input,
  Label,
  Icon,
  Content
} from "native-base";
import { stl } from "./styles/styles";

export class Empresa extends Component {
  constructor() {
    super();

    this.state = {
      nombre: "",
      email: "",
      descripcion: "",
      direccion: "",
      telefono: "",
      foto: null,
      submitted: false,
      isLoading: false,
      error: null
    };
  }
  render() {
    return (
      <SafeAreaView style={stl.containerList}>
        <ScrollView style={stl.scrollView}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Content style={stl.card}>
              <Form style={stl.form}>
                <View style={stl.vista}>
                  <TouchableOpacity onPress={this._pickImage}>
                    {!this.state.foto && (
                      <View style={stl.btnImg}>
                        <Icon
                          style={stl.iconCam}
                          type="FontAwesome"
                          name="camera"
                        />
                      </View>
                    )}
                    {this.state.foto && (
                      <Image
                        source={{ uri: this.state.foto.uri }}
                        style={stl.btnImg}
                      />
                    )}
                  </TouchableOpacity>
                </View>
                <Text style={stl.txtError}> {this.state.error}</Text>
                <Button
                  block
                  style={[stl.btn, stl.primary]}
                  onPress={() => this.HandleRegistroBtn()}
                >
                  <Text style={stl.btnText}>Cerrar Sesión</Text>
                </Button>

                <Item
                  floatingLabel
                  error={this.state.submitted && !this.state.email}
                >
                  <Label style={stl.textBlack}>Mail público</Label>
                  <Input
                    style={stl.textBlack}
                    autoCompleteType="email"
                    keyboardType="email-address"
                    name="email"
                    value={this.state.email}
                    onChangeText={email => {
                      this.setState({ email });
                    }}
                  />
                </Item>
                {this.state.submitted && !this.state.email && (
                  <Text style={stl.txtError}> El email es requerido</Text>
                )}

                <Item
                  floatingLabel
                  error={this.state.submitted && !this.state.nombre}
                >
                  <Label style={stl.textBlack}>Nombre completo</Label>
                  <Input
                    style={stl.textBlack}
                    name="nombre"
                    autoCompleteType="name"
                    value={this.state.nombre}
                    onChangeText={nombre => {
                      this.setState({ nombre });
                    }}
                  />
                </Item>
                {this.state.submitted && !this.state.nombre && (
                  <Text style={stl.txtError}>El nombre es requerido</Text>
                )}

                <Item floatingLabel>
                  <Label style={stl.textBlack}>Teléfono</Label>
                  <Input
                    style={stl.textBlack}
                    name="telefono"
                    autoCompleteType="tel"
                    value={this.state.telefono}
                    onChangeText={telefono => {
                      this.setState({ telefono });
                    }}
                  />
                </Item>

                <Item floatingLabel>
                  <Label style={stl.textBlack}>Dirección</Label>
                  <Input
                    style={stl.textBlack}
                    name="direccion"
                    autoCompleteType="street-address"
                    value={this.state.direccion}
                    onChangeText={direccion => {
                      this.setState({ direccion });
                    }}
                  />
                </Item>
                <View style={stl.areaText}>
                  <Label style={stl.textBlack}>Descripción</Label>
                  <Textarea
                    style={[stl.textBlack, stl.txtArea]}
                    ligth
                    rowSpan={5}
                    name="descripcion"
                    bordered
                    placeholder="Descripcion"
                    value={this.state.descripcion}
                    onChangeText={descripcion => {
                      this.setState({ descripcion });
                    }}
                  />
                </View>

                <View style={stl.btnsRow}>
                  <Button
                    style={stl.btn}
                    bordered
                    onPress={() => this.props.navigation.navigate("Login")}
                  >
                    <Text style={stl.btnText}> Cancelar</Text>
                  </Button>

                  <Button
                    block
                    style={[stl.btn, stl.primary]}
                    onPress={() => this.HandleRegistroBtn()}
                  >
                    <Text style={stl.btnText}>Guardar Cambios</Text>
                  </Button>
                </View>
              </Form>
            </Content>
          </TouchableWithoutFeedback>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
