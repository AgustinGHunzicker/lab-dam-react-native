import React from "react";
import { Button } from "@ui-kitten/components";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  button: {
    margin: 2,
    marginBottom: 10,
    width: "80%",
  }
});

export const AppButton = ({onPress, content, style}) => {
  return (
    <Button style={style || styles.button} appearance="outline" status="info" onPress={ onPress }> {content} </Button>
  );
};

export default AppButton;
