import React from 'react'
import { Text } from 'react-native'
import { Container, Content, Tabs, Tab, View } from 'native-base'
import { Query } from 'react-apollo'
import { client } from '../../../shared_client'

export default class GoalDetails extends React.Component {
  render () {
    return (
      <View>
        <Text>进球管理</Text>
      </View>
    )
  }
}
