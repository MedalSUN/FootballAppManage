import gql from 'graphql-tag'

// 用于获取所有的球队信息 ---这里的condition不是必填项。
export const ALL_FOOTBALL_TEAM = gql`
query allFootballTeams($condition: FootballTeamCondition){
    allFootballTeams(condition: $condition){
      totalCount
      nodes{
        id,
        teamName,
        imageByTeamLogo{
          url
        }
      }
    }
  }
`

// 用于获取所有的球场
export const ALL_FOOTBALL_COURT = gql`
query allFootballCourts{
    allFootballCourts{
      totalCount
      nodes{
        id
        courtName
        courtLocation
      }
    }
  }
`

// 获取所有比赛赛程
export const ALL_MATCH = gql`
query allMatchSchedules($orderBy: [MatchSchedulesOrderBy!]){
  allMatchSchedules(orderBy: $orderBy){
    totalCount
    nodes{
      id,
      orderNumber,
      wheelNumber,
      matchDate,
      teamA,
      footballTeamByTeamA{
        id,
        teamName,
        imageByTeamLogo{
          url
        }
      },
      teamB,
      footballTeamByTeamB{
        id,
        teamName,
        imageByTeamLogo{
          url
        }
      },
      matchGoalById{
        goalA,
        goalB,
        finished
      }
    }
  }
}
`
// 获取相应比赛的比分
export const MATCH_GOAL = gql`
query allMatchGoals($condition: MatchGoalCondition) {
  allMatchGoals(condition: $condition){
    totalCount
    nodes{
      id,
      goalA,
      goalB
    }
  }
}
`

// 获取球队的球员
export const ALL_TEAM_PLAYER = gql`
query allPersonTeams($condition: PersonTeamCondition){
  allPersonTeams(condition: $condition){
    totalCount
    nodes{
      checked,
      teamId,
      personByPersonId{
        id,
        playerName,
        shirtNum,
        imageByPlayerImg{
          url
        }
      }
    }
  }
}
`
// 查找审批还没有通过的用户
export const ALL_PERSON_TEAMS = gql`
query allPersonTeams($condition: PersonTeamCondition){
  allPersonTeams(condition: $condition){
    totalCount
    nodes{
      checked,
      teamId,
      personByPersonId{
        id
        playerName,
        shirtNum,
        imageByPlayerImg{
          url
        }
      }
      footballTeamByTeamId{
        teamName
        imageByTeamLogo{
          url
        }
      }
    }
  }
}
`
