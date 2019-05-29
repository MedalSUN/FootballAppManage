/* eslint-disable react-native/no-color-literals */
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  contentStyle: {
    backgroundColor: '#F2F2F2',
    height: 600
  },
  matchBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: 380,
    marginTop: 20
  },
  imgSize: {
    width: 30,
    height: 30,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 15
  },
  rowFlex: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  columnFlex: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  teamName: {
    fontSize: 18,
    color: 'rgb(235,172,0)',
    fontFamily: 'Helvetica Neue'
  },
  loginForm: {
    marginTop: 40,
    marginLeft: 25,
    marginRight: 40,
    width: 300,
    height: 200,
    justifyContent: 'center'
  },
  loginButtonView: {
    width: 100,
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
