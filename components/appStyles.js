import { StyleSheet } from "react-native";

export const AppStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  buttonGhost: {
    margin: 2,
    marginTop: 5,
    width: 200,
    textDecorationLine: 'underline',
  },
  homeTittle: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  ghostContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  baseText: {
    fontWeight: 'bold',
  },
  loginTextSection: {
    width: '100%',
    height: '30%',
  },
  cardText: {
    textAlign: 'left',
    fontWeight: 'bold'
  }
});

export default AppStyles;
