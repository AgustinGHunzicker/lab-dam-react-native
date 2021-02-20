import React from 'react';
import {View} from 'react-native';
import {screens} from '../App';
import AppText from "./appText";
import AppButton from "./appButton";

export const Shop = ({productoComprador}) => {
  const title = 'Producto: '+productoComprador.producto.title;
  const price = 'Precio: '+productoComprador.producto.price;
  const name = 'Comprado por: '+productoComprador.logueado.nombre;

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-evenly'}}>
      <View style={styles.container}>
        <AppText content={ title }/>
        <AppText content={ price }/>
        <AppText content={ name }/>
        <AppButton onPress={() => navigator.navigate(screens.listaCompradores)} content={COMPRAR}/>
      </View>
    </View>
  );
};

export default Shop;
