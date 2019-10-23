import React, { Component } from "react";
import { View, Image, StyleSheet,SafeAreaView } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Container,Button, Text, Form, Item, Textarea, Input, Label,Icon, Content } from "native-base";
import { ScrollView } from "react-native-gesture-handler";

export class Empresa extends Component {
  render() {
    return (
      <SafeAreaView style={stl.container}>
      <ScrollView style={stl.scrollView}>
        <View style={stl.vista}>
          <View style={stl.center}>
                   <Image style={stl.logo} source={require('../../assets/icono1.jpg')} />
                   </View>
                   <Form style={stl.form}>
                    <Item style={stl.itm} floatingLabel>
                      <Label style={stl.lbl} >Mail</Label>
                      <Input style={stl.input} />
                    </Item>
                    <Item style={stl.itm} floatingLabel>
                      <Label style={stl.lbl} >Nombre Completo</Label>
                      <Input  style={stl.input} />
                    </Item>
                    <Item style={stl.itm} floatingLabel>
                      <Label style={stl.lbl} >Telefono</Label>
                      <Input  style={stl.input} />
                    </Item>
                    <Item style={stl.itm} floatingLabel>
                      <Label style={stl.lbl} >Direccion</Label>
                      <Input secureTextEntry={true} style={stl.input} />
                    </Item>
                    <View  style={{paddingTop:10}}  >
                    <Textarea style={stl.txtArea} ligth rowSpan={5} bordered  placeholderTextColor = "whitesmoke" placeholder="Descripcion" />
                    </View>
                    <Button
                        style={stl.btnFoto}
                        block light
                        onPress={() => this.props.navigation.navigate("Login")}
                      >
                      <Icon name='home' />
                      </Button>
                  </Form>
                <Row>
                    <Col>
                      <Button
                        style={stl.btn}
                        bordered light
                        onPress={() => this.props.navigation.navigate("Login")}
                      >
                        <Text style={stl.btnText}> Cancelar</Text>
                      </Button>
                    </Col>
                    <Col>
                      <Button block style={stl.btn}>
                        <Text style={stl.btnText} >Iniciar Sesion</Text>
                      </Button>
                    </Col></Row>
                    </View>
   </ScrollView>
   </SafeAreaView>
    );
  }
}


const stl = StyleSheet.create({});