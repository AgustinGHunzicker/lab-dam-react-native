import React from "react";
import { Text } from "react-native";
import { AppStyles } from "./appStyles";

export const AppText = ({content, style}) => {
  return <Text style={ style || AppStyles.baseText }> {content} </Text>
}

export default AppText;
