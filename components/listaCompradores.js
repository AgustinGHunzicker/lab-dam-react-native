import React, {useContext, useState} from 'react';
import { Button, Icon, Text} from '@ui-kitten/components';
import { Alert, SafeAreaView, StyleSheet, View, FlatList, TextInput, TouchableHighlight} from 'react-native';
import { StoreContext } from '../context/storeContext';
import BottomSheetModal from './bottomSheetModal';
import AppText from "./appText";
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
  item: {
    flex: 1,
    justifyContent: 'space-evenly',
    backgroundColor: 'pink',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  }
});

export const ListaCompradores = () => {
  const {compradores, setCompradores} = useContext(StoreContext);

  const [nuevoCompradorVisible, setNuevoCompradorVisible] = useState(false);
  const [editarCompradorVisible, setEditarCompradorVisible] = useState(false);

  const [nombreNuevoComprador, setNombreNuevoComprador] = useState('');
  const [emailNuevoComprador, setEmailNuevoComprador] = useState('');

  const [emailComprador, setEmailComprador] = useState('');
  const [nombreComprador, setNombreComprador] = useState('');
  const [idComprador, setIdComprador] = useState('');

  const [pantallaInicio, setPantallaInicio] = useState(true);

  const PlusIcon = (props) => <Icon {...props} name="plus-outline" />;

  const alertIngreseNombre = 'Por favor ingrese un nombre';
  const alertIngreseMail = 'Por favor ingrese un email';

  const alertExitAdd = 'Se añadió un nuevo comprador';
  const alertExitoEdit = 'Se editó el comprador';

  const alertTitleEdit = 'Quitar comprador';
  const alertDescriptionEdit = '¿Estás seguro que desea quitar el comprador?';

  const indicacionEdit = '\n Toque en un item para editarlo \n';
  const tituloAddBuyer = 'Añadir un comprador';
  const tituloEditBuyer = 'Editar un comprador';

  const crearComprador = () => {
    if (!nombreNuevoComprador.trim()) {
      alert(alertIngreseNombre);
      return;
    }

    if (!emailNuevoComprador.trim()) {
      alert(alertIngreseMail);
      return;
    }

    //agrega el comprador a la lista
    setCompradores([...compradores, { nombre: nombreNuevoComprador, email: emailNuevoComprador, id: Math.random() } ]);

    alert(alertExitAdd);

    setNombreNuevoComprador('');
    setEmailNuevoComprador('');
    setNuevoCompradorVisible(false);
  };

  const editarComprador = (compradorAEditar) => {
    if (!nombreComprador.trim()) {
      alert(alertIngreseNombre);
      return;
    }

    if (!emailComprador.trim()) {
      alert(alertIngreseMail);
      return;
    }

    alert(alertExitoEdit);

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
    Alert.alert(alertTitleEdit, alertDescriptionEdit,
      [{text: 'Cancelar',  style: 'cancel'},
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
    <View style={styles.item}>
      <AppText style={styles.title} content={title}/>
    </View>
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
        <AppText style={styles.baseText} content={indicacionEdit}/>

        <BottomSheetModal
          visible={editarCompradorVisible}
          onClosePressed={() => setEditarCompradorVisible(false)}
          title={tituloEditBuyer}>
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

        <BottomSheetModal
          visible={nuevoCompradorVisible}
          onClosePressed={() => setNuevoCompradorVisible(false)}
          title={tituloAddBuyer}>
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

        <Button style={styles.button} accessoryLeft={PlusIcon} onPress={() => setNuevoCompradorVisible(true)}  />

        <SafeAreaView style={styles.container}>
          <FlatList data={compradores} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />
        </SafeAreaView>
      </View>
    </View>
  );
} ;

export default ListaCompradores;
