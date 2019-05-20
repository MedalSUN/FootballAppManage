import React from 'react'
import { Text } from 'react-native'
import { Container, Content } from 'native-base'
import { Query } from 'react-apollo'

export default class AddRaceSchedule extends React.Component {
  static navigationOptions = (
    (props) => {
      return {
        headerTitle: 'AddRaceSchedule',
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
          <Text>你好这里是增加赛程</Text>
        </Content>
      </Container>
    )
  }
}
