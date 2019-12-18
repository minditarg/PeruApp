import React, { Component } from "react";
import { FlatList } from "react-native";
import { Container, Content, Button, Icon, Spinner } from "native-base";
import { CardList } from "../Componentes/CardList";
import { stl } from "../Screens/styles/styles";
import * as session from "../Services/session";
import * as serviciosService from "../Services/servicios";
import { connect } from "react-redux";
class Servicios extends Component {
  constructor() {
    super();
    serviciosService.listadoPorProveedor();
  }

  render() {
    return (
      <Container style={stl.containerList}>
        <Content>
          <FlatList
            style={stl.listaPadding}
            data={this.props.servicios}
            renderItem={({ item }) => (
              <CardList
                onPress={() => {
                  this.props.navigation.push("UpdateServicio", { id: item.id });
                }}
                trash={true}
                navigation={this.props.navigation}
                Image
                obj={item}
              />
            )}
            keyExtractor={item => item.id.toString()}
          />
        </Content>
        <Button
          onPress={() => {
            this.props.navigation.navigate("AddServicio");
          }}
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
    servicios: serviciosService.getStore().servicios
  };
};
export default connect(mapStateToProps)(Servicios);
