import React, { useContext } from "react";
import { StoreContext } from "../context/storeContext";
import useOrientation, { SCREEN } from "../hooks/useOrientation";
import {FlatList, StyleSheet, TouchableHighlight, View} from "react-native";
import { Card, Text } from "@ui-kitten/components";
import AppText from "./appText";

const styles = StyleSheet.create({
  container: {flex: 1},
  card: {flex: 1, margin: 5},
  button: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    zIndex: 999,
    borderRadius: 60,
    width: 60,
    height: 60,
  },
  modalView: {
    backgroundColor: 'lightgrey',
    paddingVertical: 10,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    height: '50%',
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'column-reverse',
  },
  textInput: {
    height: 40,
    borderColor: 'blue',
    borderWidth: 2,
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: 'lightgrey',
    marginVertical: 10,
  },
  modalButton: {
    marginVertical: 10,
  },
  cardText: {textAlign: 'center', fontWeight: 'bold'},
});


export const ListaCompras = ({route}) => {
  const {productosComprados, obtenerProductosDelComprador} = useContext(StoreContext);
  const screenDirection = useOrientation();

  const Item = ({title}) => (
    <View>
      <AppText content={title}/>
    </View>
  );

  const renderItem = ({item}) => (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="#DDDDDD" >
      <Item title={item.nombre} />
    </TouchableHighlight>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={()=>obtenerProductosDelComprador(route.params.buyerLogged)}
        keyExtractor={(item) => item.id.toString()}
        numColumns={screenDirection === SCREEN.LANDSCAPE ? 4 : 2}
        renderItem={renderItem}
        />
    </View>
  );
};
//({item}) => {
//           return (
//             <Card style={{...styles.card, backgroundColor: item.color}} key={item.id}>
//               <AppText style={styles.cardText} content={item.nombre}/>
//             </Card>
//           );}
//
export default ListaCompras;
