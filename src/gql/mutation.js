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
mutation changeMatchGoalDetails($input:  ChangeMatchGoalDetailsInput!){
  changeMatchGoalDetails(input: $input){
    string
  }
}
`

// 用于完成比赛录入
export const FINISHED_MATCH_GOAL = gql`
mutation finishedMatchGoal($input: FinishedMatchGoalInput!){
  finishedMatchGoal(input: $input){
    string
  }
}
`

// 用于完成加入球队申请
export const APPROVAL_PERSON_TEAM = gql`
mutation approval($input: ApprovalInput!){
  approval(input: $input){
    string
  }
}
`
