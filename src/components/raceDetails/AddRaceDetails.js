import React from 'react'
import { Text } from 'react-native'
import { Container, Content, Tabs, Tab } from 'native-base'
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
          <Tabs>
            <Tab heading="比分管理">
              <Score navigation={navigation}/>
            </Tab>
            <Tab heading="进球管理">
              <GoalDetails/>
            </Tab>
          </Tabs>
        </Content>
      </Container>
    )
  }
}
