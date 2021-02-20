import React, { useContext, useState } from "react";
import { StoreContext } from "../context/storeContext";
import useOrientation, { SCREEN } from "../hooks/useOrientation";
import { FlatList, TextInput, View } from "react-native";
import BottomSheetModal from "./bottomSheetModal";
import { Button, Card, Icon, Text } from "@ui-kitten/components";
import { TouchableOpacity } from "react-native-gesture-handler";

export const ListaCompras = () => {
  const {productosComprados, setProductosComprados} = useContext(StoreContext);
  const [primaraPantalla, setPrimeraPantalla] = useState(true);

  return (
    <View style={styles.container}>
      <BottomSheetModal
        visible={modalVisible}
        onClosePressed={() => setModalVisible(false)}
        title={primaraPantalla ? 'Crear una categoria' : 'Elegir Color'}>
        <>
          {primaraPantalla && (
            <PrimeraPantalla
              nombreNuevaCategoria={nombreNuevaCategoria}
              setNombreNuevaCategoria={setNombreNuevaCategoria}
              colorNuevaCategoria={colorNuevaCategoria}
              setPrimeraPantalla={setPrimeraPantalla}
              crearCategoria={crearCategoria}
            />
          )}
          {!primaraPantalla && (
            <SegundaPantalla
              setPrimeraPantalla={setPrimeraPantalla}
              setColorNuevaCategoria={setColorNuevaCategoria}
            />
          )}
        </>
      </BottomSheetModal>
      <Button
        style={styles.button}
        accessoryLeft={PlusIcon}
        onPress={() => setModalVisible(true)}
      />
      <FlatList
        data={categorias}
        key={screenDirection}
        numColumns={screenDirection === SCREEN.LANDSCAPE ? 4 : 2}
        renderItem={({item}) => {
          return (
            <Card
              style={{...styles.card, backgroundColor: item.color}}
              key={item.id}>
              <Text style={styles.cardText}>{item.nombre}</Text>
            </Card>
          );
        }}
      />
    </View>
  );
};

const PrimeraPantalla = ({
                           nombreNuevaCategoria,
                           setNombreNuevaCategoria,
                           colorNuevaCategoria,
                           setPrimeraPantalla,
                           crearCategoria,
                         }) => {
  return (
    <>
      <TextInput
        placeholder="Nombre de Categoria"
        style={styles.textInput}
        value={nombreNuevaCategoria}
        onChangeText={(nuevoTexto) => {
          setNombreNuevaCategoria(nuevoTexto);
        }}
      />
      <TouchableOpacity onPress={() => setPrimeraPantalla(false)}>
        <TextInput
          placeholder="Color de Categoria"
          editable={false}
          style={styles.textInput}
          value={colorNuevaCategoria}
        />
      </TouchableOpacity>
      <Button style={styles.modalButton} onPress={() => crearCategoria()}>
        Crear Categoria
      </Button>
    </>
  );
};

const PlusIcon = (props) => <Icon {...props} name="plus-outline" />;

export default ListaCompras;
