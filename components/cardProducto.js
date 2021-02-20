import React from 'react';
import {Button, Card, Text} from '@ui-kitten/components';
import {StyleSheet, View} from 'react-native';
import AppButton from "./appButton";
import AppText from "./appText";

const styles = StyleSheet.create({
  tituloContainer: {
    flexDirection: 'column',
    marginBottom: 10,
  },
  botonesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold', // 100 - 200 - 300 - 400
  },
  precio: {
    fontSize: 15,
  },
  card: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
});

const CardProducto = ({titulo, precio, onVerDetalles, onComprar}) => {
  return (
    <Card style={styles.card}>
      <View style={styles.tituloContainer}>
        <AppText style={styles.titulo} content={titulo}/>
        <AppText style={styles.precio} content={precio}/>
      </View>
      <View style={styles.botonesContainer}>
        <AppButton style={styles.botonesContainer} onPress={onVerDetalles} content={'Ver Detalles'}/>
        <AppButton style={styles.botonesContainer} onPress={onComprar} content={'Comprar'}/>
      </View>
    </Card>
  );
};

export default CardProducto;
