import React from 'react'
import { Text } from 'react-native'
import { Container, Content } from 'native-base'
import { Query } from 'react-apollo'

export default class AddRaceDetails extends React.Component {
  static navigationOptions = (
    (props) => {
      return {
        headerTitle: 'AddRaceDetails',
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
          <Text>你好这里是赛事详情页面</Text>
        </Content>
      </Container>
    )
  }
}
