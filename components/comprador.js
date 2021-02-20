import React, {useContext, useState} from 'react';
import { Button, Icon, Text} from '@ui-kitten/components';
import { Alert, SafeAreaView, StyleSheet, View, FlatList, TextInput, TouchableHighlight} from 'react-native';
import { StoreContext } from '../context/storeContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BottomSheetModal from './bottomSheetModal';
import AppText from "./appText";
import { AppStyles } from "./appStyles";
import AppInput from "./appInput";
import GestionarComprador from "./compradorPantalla";

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1
  },
  button: {
    position: 'absolute',
    bottom: 30,
    right: -60,
    zIndex: 999,
    borderRadius: 60,
    width: 60,
    height: 60,
  },
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
});

export const Compradores = () => {
  const {compradores, setCompradores} = useContext(StoreContext);

  const [nuevoCompradorVisible, setNuevoCompradorVisible] = useState(true);
  const [editarCompradorVisible, setEditarCompradorVisible] = useState(false);

  const [nombreNuevoComprador, setNombreNuevoComprador] = useState('');
  const [emailNuevoComprador, setEmailNuevoComprador] = useState('');

  const [emailComprador, setEmailComprador] = useState('');
  const [nombreComprador, setNombreComprador] = useState('');
  const [idComprador, setIdComprador] = useState('');

  const [pantallaInicio, setPantallaInicio] = useState(true);

  const crearComprador = () => {
    if (!nombreNuevoComprador.trim()) {
      alert('Por favor ingrese un nombre');
      return;
    }

    if (!emailNuevoComprador.trim()) {
      alert('Por favor ingrese un email');
      return;
    }

    //agrega el comprador a la lista
    setCompradores([...compradores, { nombre: nombreNuevoComprador, email: emailNuevoComprador, id: Math.random() } ]);

    alert('Se añadió un nuevo comprador');

    setNombreNuevoComprador('');
    setEmailNuevoComprador('');
    setNuevoCompradorVisible(false);
  };

  const editarComprador = (compradorAEditar) => {
    if (!nombreComprador.trim()) {
      alert('Por favor ingrese un nombre');
      return;
    }

    if (!emailComprador.trim()) {
      alert('Por favor ingrese un email');
      return;
    }

    alert('Se editó el comprador');

    const compradorYaEditado = compradores.map((compradorPrevioAEditar) => {
      if (compradorPrevioAEditar.id === compradorAEditar) {
        compradorPrevioAEditar.nombre = nombreComprador;
        compradorPrevioAEditar.email = emailComprador;
        return compradorPrevioAEditar;
      }
      return compradorPrevioAEditar;
    });

    setCompradores(compradorYaEditado);
  };

  const quitarComprador = (compradorAQuitar) => {
    Alert.alert('Quitar comprador', '¿Estás seguro que desea quitar el comprador?',
      [{text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => quitarDeLaLista(compradorAQuitar)}, ],
      {cancelable: false},
    );
  };

  const quitarDeLaLista = (compradorEditado) => {
    const filteredData = compradores.filter((item) => item.id !== compradorEditado);
    setCompradores(filteredData);
    setEditarCompradorVisible(false);
  };

  const Item = ({title}) => (
    <View style={styles.item}> <AppText style={styles.title} content={title}/></View>
  );

  const renderItem = ({item}) => (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="#DDDDDD"
      onPress={() => {
        setEditarCompradorVisible(true);
        setEmailComprador(item.email);
        setNombreComprador(item.nombre);
        setIdComprador(item.id);
      }}>
      <Item title={item.nombre} />
    </TouchableHighlight>
  );

  return (
    <View style={styles.view}>
      <View style={styles.container}>
        <AppText style={styles.baseText} content={'\n Toque en un item para editarlo \n'}/>
        <BottomSheetModal
          visible={nuevoCompradorVisible}
          onClosePressed={() => setNuevoCompradorVisible(false)}
          title={'Añadir un comprador'}>
          <>
            {pantallaInicio && (
              <GestionarComprador
                nombre={nombreNuevoComprador}
                setNombre={setNombreNuevoComprador}
                email={emailNuevoComprador}
                setEmail={setEmailNuevoComprador}
                setPrimeraPantalla={setPantallaInicio}
                accionSobreComprador1={crearComprador}
              />
            )}
          </>
        </BottomSheetModal>

        <BottomSheetModal
          visible={editarCompradorVisible}
          onClosePressed={() => setEditarCompradorVisible(false)}
          title={'Editar un comprador'}>
          <>
            {pantallaInicio && (
              <GestionarComprador
              nombre={nombreComprador}
              setNombre={setNombreComprador}
              email={emailComprador}
              setEmail={setEmailComprador}
              idComprador={idComprador}
              setPrimeraPantalla={setPantallaInicio}
              accionSobreComprador1={editarComprador}
              accionSobreComprador2={quitarComprador}
              />
            )}
          </>
        </BottomSheetModal>

        <Button
          style={styles.button}
          accessoryLeft={PlusIcon}
          onPress={() => setNuevoCompradorVisible(true)}
        />

        <SafeAreaView style={styles.container}>
          <FlatList
            data={compradores}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </SafeAreaView>
      </View>
    </View>
  );
} ;

const PlusIcon = (props) => <Icon {...props} name="plus-outline" />;
const EditIcon = (props) => <Icon {...props} name="edit-outline" />;
export default Comprador;
