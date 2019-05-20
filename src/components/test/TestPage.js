import React from 'react'
import { Text } from 'react-native'
import { Container, Content } from 'native-base'
import { Query } from 'react-apollo'

export default class TestPage extends React.Component {
  static navigationOptions = (
    (props) => {
      return {
        headerTitle: 'TestPage',
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
          <Text>你好世界</Text>
        </Content>
      </Container>
    )
  }
}
