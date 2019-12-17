import React, { Component } from "react";
import {
    View,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    SafeAreaView
} from "react-native";
import {
    Container,
    Content,
    Text,
    Button,
    Picker,
    Icon,
    Form,
    Toast,
    Item,
    Input,
    Textarea,
    Label
} from "native-base";
import dismissKeyboard from "react-native/Libraries/Utilities/dismissKeyboard";
import * as trabajosService from "../../Services/trabajos";
import { stl } from "../styles/styles";
export class PuntuarTrabajo extends Component {
    constructor() {
        super();
        this.initialState = {
            submitted: false,
            isLoading: false,
            puntaje: "",
            descripcion: "",
            trabajoId: ""
        };
        this.state = this.initialState;
    }
    componentDidMount() {
        this.setState({trabajoId: this.props.navigation.getParam("id")})
    }

    HandleRegistroBtn() {
        this.setState({
            isLoading: true,
            submitted: true,
            error: ""
        });
        dismissKeyboard();
        trabajosService
            .puntuarTrabajo(
                this.state.trabajoId,
                this.state.puntaje,
                this.state.descripcion
            )
            .then(response => {
                
                if (response.statusType == "success") {
                    this.setState({
                        isLoading: false
                    });
                    trabajosService.listadoPorClienteCalificados();
                    trabajosService.listadoPorClienteSinCalificar();
                    this.props.navigation.navigate("TrabajosHechos", {
                        toast: {
                            text: response.message,
                            buttonText: "OK",
                            position: "top",
                            type: "success"
                        }
                    });
                } else {
                    this.setState({
                        isLoading: false,
                        error: `${response.message}: ${response.error}`
                    });
                    Toast.show({
                        text: response.message,
                        buttonText: "OK",
                        position: "top",
                        type: "danger"
                    });
                }
            })
            .catch(exception => {
                const error = exception;
                this.setState({
                    isLoading: false,
                    ...(error ? { error } : {})
                });

                if (!error) {
                    throw exception;
                }
            });
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" enabled>
                <SafeAreaView style={stl.containerList}>
                    <ScrollView>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <Content style={stl.card}>
                                <Form style={stl.form}>
                                    <View style={stl.areaText}>
                                        <Label style={stl.textBlack}>Comentario del trabajo</Label>
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
                                    <View>
                                        <Text style={[stl.textBlack, stl.pickerlbl]}>
                                            Que puntaje le pones al proveedor:
                    </Text>
                                        <Item
                                            picker
                                            style={stl.picker}
                                            error={this.state.submitted && !this.state.puntaje}
                                        >
                                            <Picker
                                                mode="dropdown"
                                                placeholder="Seleccione el puntaje"
                                                iosIcon={<Icon name="arrow-down" />}
                                                style={[stl.textBlack, stl.pickerInput]}
                                                name="puntaje"
                                                selectedValue={this.state.puntaje}
                                                onValueChange={puntaje => this.setState({ puntaje })}
                                            >
                                                <Picker.Item
                                                    label="Por favor, seleccione el puntaje"
                                                    value="0"
                                                />
                                                <Picker.Item label="1 Muy malo" value="1" />
                                                <Picker.Item label="2 Malo" value="2" />
                                                <Picker.Item label="3 Regular" value="3" />
                                                <Picker.Item label="4 Bueno" value="4" />
                                                <Picker.Item label="5 Excelente " value="5" />
                                            </Picker>
                                        </Item>
                                        {this.state.submitted && !this.state.puntaje && (
                                            <Text style={stl.txtError}> El puntaje es requerido</Text>
                                        )}
                                    </View>

                                    <Text style={stl.txtError}> {this.state.error}</Text>
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
                                            <Text style={stl.btnText}>Puntuar Trabajo</Text>
                                        </Button>
                                    </View>
                                </Form>
                            </Content>
                        </TouchableWithoutFeedback>
                    </ScrollView>
                </SafeAreaView>
            </KeyboardAvoidingView>
        );
    }
}
