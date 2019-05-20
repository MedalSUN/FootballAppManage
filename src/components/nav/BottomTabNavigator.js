
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'

// 引入赛程模块相关页面
import AddRaceSchedule from '../raceSchedule/AddRaceSchedule'

// 引入赛事详情相关页面
import AddRaceDetails from '../raceDetails/AddRaceDetails'

// 创建BottomTabNavigator的几个stack
// 1: 创建赛事安排模块
const RaceScheduleStack = createStackNavigator({
  AddRaceSchedule: { screen: AddRaceSchedule }
})

const RaceDetailsStack = createStackNavigator({
  AddRaceDetails: { screen: AddRaceDetails }
})

const BottomTabNavigator = createBottomTabNavigator(
  {
    赛程: { screen: RaceScheduleStack },
    详情: { screen: RaceDetailsStack }
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
          iconName = `ios-baseball${focused ? '' : ''}`
        } else if (routeName === '详情') {
          iconName = `ios-list${focused ? '' : ''}`
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
