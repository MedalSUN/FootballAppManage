import gql from 'graphql-tag'

// 用于增加赛程
export const ADD_MATCH_SCHEDULE = gql`
mutation changeMatchSchedule($input: ChangeMatchScheduleInput!){
    changeMatchSchedule(input: $input){
      string
    }
  }
`
