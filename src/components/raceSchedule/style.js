/* eslint-disable react-native/no-color-literals */
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  contentStyle: {
    backgroundColor: '#F2F2F2'
  },
  loginForm: {
    marginTop: 40,
    marginLeft: 25,
    marginRight: 40,
    justifyContent: 'center'
  },
  teamSelectBox: {
    marginTop: 20
  },
  rowStyle1: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  rowStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonBox: {
    width: 100,
    height: 30,
    marginRight: 20,
    backgroundColor: 'rgb(250,122,21)',
    borderWidth: 1,
    borderColor: 'rgb(250,122,21)',
    borderRadius: 20
  },
  teamSelectButton: {
    fontSize: 13,
    fontFamily: 'Helvetica Neue',
    color: '#808080'
  },
  loginButtonView: {
    marginLeft: 40,
    marginRight: 40,
    marginTop: 30
  },
  loginButton: {
    height: 50,
    backgroundColor: 'rgb(250,122,21)'
  },
  loginButtonText: {
    color: 'rgb(255,255,255)',
    fontSize: 20
  }
})
