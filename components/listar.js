import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Text} from '@ui-kitten/components';
import {screens} from '../App';
import CardProducto from './cardProducto';
import {StoreContext} from '../context/storeContext';
import AppButton from "./appButton";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const Listar = ({route}) => {
  const {productos, setProductos, productosComprados, setProductosComprados} = useContext(StoreContext);
  const navigator = useNavigation();
  return (
    <View style={styles.container}>
      {productos.length > 0 ? (
        <ScrollView>
          {productos.map((producto) => (
            <CardProducto
              producto={producto}
              titulo={producto.title}
              precio={producto.price}
              onVerDetalles={() => {navigator.navigate(screens.detalle, {producto});}}
              onComprar={() => {setProductosComprados([...productosComprados, producto])}}
              key={producto.id}/>
          ))}
        </ScrollView>
      ) : (
        <Text category="h3" status="info">
          Cargando productos disponibles...
        </Text>
      )}
    </View>
  );
};

export default Listar;
