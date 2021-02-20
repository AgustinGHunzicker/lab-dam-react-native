import React, {useContext, useState} from 'react';
import { screens } from '../App';
import { StoreContext } from '../context/storeContext';
import { StyleSheet, TextInput, View } from "react-native";
import AppButton from "./appButton";
import AppInput from "./appInput";

const styles = StyleSheet.create({
  viewIniciarSesion: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const VistaIniciarSesion = ({setEmail, email, checkMail}) => {
  return (
    <View style={styles.viewIniciarSesion}>
      <AppInput placeholder='Email' value={email} onChangeText={(nuevoTexto) => { setEmail(nuevoTexto); }} />
      <AppButton onPress={checkMail} content="Ingresar"/>
    </View>
  );
};

export const IniciarSesion = ({navigation}) => {
  const {compradores} = useContext(StoreContext);
  const [email, setEmail] = useState('');

  const checkMail = () => {
    if (!email.trim()) {
      alert('Email vacío!');
      return;
    }

    compradores.map( (logged) => {
      if (logged.email === email)
          navigation.navigate(screens.homepage, {logged});
    });
  };

  return (
    <VistaIniciarSesion setEmail={setEmail} email={email} checkMail={() => checkMail()} />
  );
};

export default IniciarSesion;
