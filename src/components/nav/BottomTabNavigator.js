
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'

// 引入赛程模块相关页面
import AddRaceSchedule from '../raceSchedule/AddRaceSchedule'
import selectPage from '../raceSchedule/components/selectPage'

// 引入赛事详情相关页面
import AddRaceDetails from '../raceDetails/AddRaceDetails'

// 引入审批模块相关页面
import Approval from '../check/Approval'

const RaceScheduleStack = createStackNavigator({
  AddRaceSchedule: { screen: AddRaceSchedule },
  selectPage: { screen: selectPage }
})

const RaceDetailsStack = createStackNavigator({
  AddRaceDetails: { screen: AddRaceDetails }
})

const CheckStack = createStackNavigator({
  Approval: { screen: Approval }
})

const BottomTabNavigator = createBottomTabNavigator(
  {
    赛程: { screen: RaceScheduleStack },
    详情: { screen: RaceDetailsStack },
    审批: { screen: CheckStack }
  },
  {
    navigationOptions: ({ navigation }) => ({
      // eslint-disable-next-line react/display-name
      tabBarIcon: ({ focused, tintColor }) => {
      // console.log(99,navigation.state.routes[navigation.state.routes.length - 1].params.routeName)
      //  console.log(99,navigation.state.routes[navigation.state.routes.length - 1].routeName)
      //  const aa = navigation.state.routes[navigation.state.routes.length - 1].routeName !== 'IdolInfo'
        const { routeName } = navigation.state
        let iconName
        if (routeName === '赛程') {
          iconName = `ios-alarm${focused ? '' : ''}`
        } else if (routeName === '详情') {
          iconName = `ios-list${focused ? '' : ''}`
        } else if (routeName === '详情') {
          iconName = `ios-home${focused ? '' : ''}`
        }
        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />
      },
      tabBarVisible: !navigation.state.index > 0
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray'
    }
  }
)

export default BottomTabNavigator
