import React from 'react'
import { Text } from 'react-native'
import { Container, Content } from 'native-base'
import { Query } from 'react-apollo'

export default class ApprovalPage extends React.Component {
  static navigationOptions = (
    (props) => {
      return {
        headerTitle: '审批管理',
        headerTitleStyle: {
          marginLeft: 165
        }
      }
    }
  )
  render () {
    return (
      <Container>
        <Content>
          <Text>审批管理</Text>
        </Content>
      </Container>
    )
  }
}
