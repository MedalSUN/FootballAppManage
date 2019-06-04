import React from 'react'
import { Text, RefreshControl, ScrollView } from 'react-native'
import { Container, Content, Root } from 'native-base'
import { Query } from 'react-apollo'
import Score from './components/Score'
import GoalDetails from './components/GoalDetails'

// 为添加下拉刷新，本页面暂时作废，将比赛详情主页面放置于GoalDetails页面中

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
