import AppInput from "./appInput";
import { TouchableOpacity } from "react-native-gesture-handler";
import React from "react";
import AppButton from "./appButton";

export const GestionarComprador = ({nombre, setNombre, email, setEmail, setPrimeraPantalla, idComprador,
                                     accionSobreComprador1, accionSobreComprador2}) => {
  const btnAgregar = 'Agregar comprador';
  const btnEditar = 'Editar comprador';
  const btnRemover = 'Remover comprador';
  const labelNombre = 'Nombre comprador';
  const labelMail = 'Email comprador';

  return (
  <>
    <AppInput placeholder={labelNombre} value={nombre} onChangeText={(nuevoTexto) => { setNombre(nuevoTexto); }} />
    <TouchableOpacity onPress={() => setPrimeraPantalla(false)}>
      <AppInput placeholder={labelMail} value={email} onChangeText={(nuevoTexto) => { setEmail(nuevoTexto); }} />
    </TouchableOpacity>
    {(accionSobreComprador2 === undefined) ?
      <AppButton onPress={() => accionSobreComprador1()} content={btnAgregar}/>
      :
      <>
        <AppButton onPress={() => accionSobreComprador1(idComprador)} content={btnEditar}/>
        <AppButton onPress={() => accionSobreComprador2(idComprador)} content={btnRemover}/>
      </>
    }
  </>
  );
}

export default GestionarComprador;
