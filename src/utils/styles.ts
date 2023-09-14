import { StyleSheet } from "react-native";
import { BlueGrey } from "./colors";

export const styles = StyleSheet.create({
  containerEven: {
    // flex: 1,
    flexDirection: 'row',
    // justifyContent: 'center',
    justifyContent: 'space-evenly'
  },
  container: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewColumn: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'gray',
  },
  buttonCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: BlueGrey.BlueGrey50
  },
  label: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    textAlign: 'center',
    flex: 2, 
    backgroundColor: 'gray'
  },
  title: {
    fontSize: 30,
    lineHeight: 30,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    textAlign: 'center'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'ghostwhite'
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  noPadding: {
    padding: 0,
    paddingHorizontal: 0,
    paddingVertical: 0
  },
  darkText: {
    color: 'black'
  }
});