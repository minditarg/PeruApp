import React, { Component } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import {
  Container,
  Content,
  Text,
  Button,
  Picker,
  Icon,
  Form,
  Item,
  Input,
  Textarea,
  Label
} from "native-base";
import { stl } from "../Screens/styles/styles";

export class AddServicio extends Component {
  constructor() {
    super();
    this.state = {
      titulo: "",
      submitted: false,
      image: null,
      selected2: undefined
    };
  }
  onValueChange2(value: string) {
    this.setState({
      selected2: value
    });
  }
  render() {
    let { image } = this.state;

    return (
      <Container style={stl.containerList}>
        <ScrollView>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Content style={stl.card}>
              <Form style={stl.form}>
                <Item
                  floatingLabel
                  error={this.state.submitted && !this.state.titulo}
                >
                  <Label style={stl.textBlack}>Título</Label>
                  <Input
                    style={stl.textBlack}
                    name="titulo"
                    value={this.state.email}
                    onChangeText={email => {
                      this.setState({ email });
                    }}
                  />
                </Item>
                {this.state.submitted && !this.state.email && (
                  <Text style={stl.txtError}> El título es requerido</Text>
                )}
                <Item
                  picker
                  style={stl.picker}
                  error={this.state.submitted && !this.state.email}
                >
                  <Picker
                    mode="dropdown"
                    placeholder="Categoria"
                    iosIcon={<Icon name="arrow-down" />}
                    style={[stl.textBlack, stl.pickerInput]}
                    name="categoria"
                    selectedValue={this.state.selected2}
                    onValueChange={this.onValueChange2.bind(this)}
                  >
                    <Picker.Item label="Carpinteria" value="key0" />
                    <Picker.Item label="ATM Card" value="key1" />
                    <Picker.Item label="Debit Card" value="key2" />
                    <Picker.Item label="Credit Card" value="key3" />
                    <Picker.Item label="Net Banking" value="key4" />
                  </Picker>
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
                <View style={stl.vista}>
                  <TouchableOpacity onPress={this._pickImage}>
                    {!image && (
                      <View style={stl.btnImgServ}>
                        <Icon
                          style={stl.iconCam}
                          type="FontAwesome"
                          name="camera"
                        />
                      </View>
                    )}
                    {image && (
                      <Image source={{ uri: image }} style={stl.btnImgServ} />
                    )}
                  </TouchableOpacity>
                </View>
                <View style={stl.btnsRow}>
                  <Button
                    style={stl.btn}
                    bordered
                    onPress={() => this.props.navigation.goBack()}
                  >
                    <Text style={stl.btnText}> Cancelar</Text>
                  </Button>

                  <Button
                    block
                    style={[stl.btn, stl.primary]}
                    onPress={() => this.HandleRegistroBtn()}
                  >
                    <Text style={stl.btnText}>Crear Servicio</Text>
                  </Button>
                </View>
              </Form>
            </Content>
          </TouchableWithoutFeedback>
        </ScrollView>
      </Container>
    );
  }
}
