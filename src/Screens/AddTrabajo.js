import React, { Component } from "react";
import {
  View,
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
export class AddTrabajo extends Component {
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
                    <Picker.Item label="0" value="key0" />
                    <Picker.Item label="1" value="key1" />
                    <Picker.Item label="2" value="key2" />
                    <Picker.Item label="3" value="key3" />
                    <Picker.Item label="4" value="key4" />
                    <Picker.Item label="5" value="key5" />
                    <Picker.Item label="6" value="key6" />
                    <Picker.Item label="7" value="key7" />
                    <Picker.Item label="8" value="key8" />
                    <Picker.Item label="9" value="key9" />
                    <Picker.Item label="10" value="key10" />
                  </Picker>
                </Item>

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
                    <Text style={stl.btnText}>Crear Trabajo</Text>
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
