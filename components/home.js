import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {screens} from '../App';
import {useNavigation} from '@react-navigation/native';
import AppButton from "./appButton";
import AppText from "./appText";

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  button: {
    margin: 2,
    marginBottom: 10,
    width: 200,
  },
  homeTittle: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export const Home = ({route}) => {
  const navigator = useNavigation();
  const buyerLogged = route.params.logged;

  const titulo = 'Bienvenido '+ (buyerLogged.nombre).toUpperCase();

  const labelListar = 'Listar productos';
  const labelCategorias = 'Ver categorías';
  const labelCompradores = 'Lista compradores';
  const labelCompras = 'Compras hechas';

  const toListar = () => {
    if (!buyerLogged?.id) {
      alert("no hay id");
      return; // No hay id de categoria o producto
    }
    navigator.navigate(screens.listar, {buyerLogged});
  }
  const toCategorias = () => navigator.navigate(screens.listaCategorias);
  const toListaCompradores = () => navigator.navigate(screens.listaCompradores);
  const toListaCompras = () => navigator.navigate(screens.listaCompras, {buyerLogged});

  return (
    <View style={styles.view}>
      <AppText style={styles.homeTittle} content={titulo}/>
      <View style={styles.container}>
        <AppButton style={styles.button} onPress={toListar} content={labelListar}/>
        <AppButton style={styles.button} onPress={toCategorias} content={labelCategorias}/>
        <AppButton style={styles.button} onPress={toListaCompradores} content={labelCompradores}/>
        <AppButton style={styles.button} onPress={toListaCompras} content={labelCompras}/>
      </View>
    </View>
  );
};
