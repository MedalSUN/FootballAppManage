/* eslint-disable react-native/no-color-literals */
import { StyleSheet } from 'react-native'

export default StyleSheet.create({

  rowFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  topBox: {
    width: '30%',
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'gray'
  },
  topText: {
    fontSize: 18,
    color: 'rgb(235,172,0)',
    fontFamily: 'Helvetica Neue'
  }
})
