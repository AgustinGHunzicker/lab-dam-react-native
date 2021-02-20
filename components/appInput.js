import React from "react";
import { TextInput, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: 'darkgray',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    marginVertical: 10,
    width: "80%",
  }
});

export const AppInput = ({placeholder, style, value, onChangeText}) => {
  return <TextInput placeholder={placeholder} style={style || styles.textInput} value={value} onChangeText={onChangeText}/>
}

export default AppInput;
