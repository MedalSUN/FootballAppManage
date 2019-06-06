import React from 'react'
import { Text, Image, TouchableOpacity } from 'react-native'
import { View, Input, Form, Item, Button, Root, Toast } from 'native-base'
import { Query } from 'react-apollo'
import Styles from './style'
import { client } from '../../../shared_client'
import { APPROVAL_PERSON_TEAM } from '../../../gql/mutation'

export default class PlayerItem extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  // Toast 提示信息
  showToast = (message) => {
    let type = ''
    if (message === '审批通过成功') {
      type = 'success'
    } else {
      type = 'warning'
    }

    Toast.show({
      text: message,
      textStyle: { textAlign: 'center' },
      position: 'top',
      type: type,
      duration: 1000
    })
  }

  // 方法： 用于向后台提交审批结果
  approval = (value) => {
    const { id } = this.props
    client.mutate({
      mutation: APPROVAL_PERSON_TEAM,
      variables: {
        'input': {
          '_personId': id,
          '_approvalResult': value
        }
      }
    }).then((reponse) => {
      console.log(reponse)
      this.showToast(reponse.data.approval.string)
    })
  }

  render () {
    const { navigation } = this.props
    const { userLogo, playerName, teamName, teamLogo } = this.props
    return (
      <View style={Styles.itemBox}>
        <View style={Styles.rowFlex}>
          <Image style={Styles.imgSize} source={{ uri: userLogo }}/>
          <Text>{playerName}</Text>
        </View>
        <View style={Styles.rowFlex}>
          <Image style={Styles.imgSize} source={{ uri: teamLogo }}/>
          <Text>{teamName}</Text>
        </View>
        <View style={Styles.rowFlex}>
          <TouchableOpacity onPress={() => { this.approval('yes') }}>
            <Text style={Styles.approvalButtonText}>批准</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { this.approval('no') }}>
            <Text style={Styles.approvalButtonText}>驳回</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
