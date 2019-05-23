import React from 'react'
import { Text } from 'react-native'
import { Container, Content } from 'native-base'
import { Query } from 'react-apollo'

export default class ApprovalPage extends React.Component {
  static navigationOptions = (
    (props) => {
      return {
        headerTitle: 'ApprovalPage',
        headerTitleStyle: {
          marginLeft: 110
        }
      }
    }
  )
  render () {
    return (
      <Container>
        <Content>
          <Text>这里是审批页面</Text>
        </Content>
      </Container>
    )
  }
}
