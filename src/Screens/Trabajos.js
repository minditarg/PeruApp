import React, { Component } from "react";
import { FlatList } from "react-native";
import { Container, Content, Button, Icon, Toast } from "native-base";
import works from "../../Datos/Trabajos.json";
import { ListTrabajo } from "../Componentes/ListTrabajo";
import { stl } from "../Screens/styles/styles";
import * as trabajosService from "../Services/trabajos";
import { connect } from "react-redux";

class Trabajos extends Component {
  constructor() {
    super();
    this.state = { listo: false }
    trabajosService.listadoPorProveedor();
  }
  componentDidUpdate() {
    if (this.props.navigation.state.params && this.props.navigation.state.params.toast) {
      Toast.show(this.props.navigation.state.params.toast);
    }
  }
  render() {
    return (
      <Container style={stl.containerList}>
        <Content>
          <FlatList
            style={stl.listaPadding}
            data={this.props.trabajos}
            renderItem={({ item }) => (
              <ListTrabajo navigation={this.props.navigation} Image obj={item} />
            )}
            keyExtractor={item => item.id.toString()}
          />
        </Content>
        <Button
          onPress={() => this.props.navigation.navigate("AddTrabajo")}
          style={[stl.btnRounded, stl.primary]}
          block
        >
          <Icon style={stl.iconPlus} type="Ionicons" name="add" />
        </Button>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    trabajos: trabajosService.getStore().trabajos
  };
};
export default connect(mapStateToProps)(Trabajos);

