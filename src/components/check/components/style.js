/* eslint-disable react-native/no-color-literals */
import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  itemBox: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  rowFlex: {
    width: '30%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imgSize: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderRadius: 20,
    marginRight: 10
  },
  approvalButtonText: {
    color: 'rgb(235,172,0)',
    fontFamily: 'Helvetica Neue',
    borderBottomWidth: 1,
    borderColor: 'rgb(235,172,0)',
    marginRight: 5
  }
})
