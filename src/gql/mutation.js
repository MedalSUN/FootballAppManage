import gql from 'graphql-tag'

// 用于增加赛程
export const ADD_MATCH_SCHEDULE = gql`
mutation changeMatchSchedule($input: ChangeMatchScheduleInput!){
    changeMatchSchedule(input: $input){
      string
    }
  }
`

// 用于增加指定比赛的比分
export const ADD_MATCH_GOALS = gql`
mutation changeMatchGoal($input: ChangeMatchGoalInput!){
  changeMatchGoal(input: $input){
  string
  }
}
`
