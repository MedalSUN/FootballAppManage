import React from 'react'
import { Text } from 'react-native'
import { Container, Content } from 'native-base'
import { Query } from 'react-apollo'
import Score from './components/Score'
import GoalDetails from './components/GoalDetails'

export default class AddRaceDetails extends React.Component {
  static navigationOptions = (
    (props) => {
      return {
        headerTitle: '比赛详情管理',
        headerTitleStyle: {
          marginLeft: 150
        }
      }
    }
  )
  render () {
    const { navigation } = this.props
    return (
      <Container>
        <Content>
          <GoalDetails navigation={navigation}/>
        </Content>
      </Container>
    )
  }
}
