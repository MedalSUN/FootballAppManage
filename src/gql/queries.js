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
        teamName,
        imageByTeamLogo{
          url
        }
      },
      teamB,
      footballTeamByTeamB{
        teamName,
        imageByTeamLogo{
          url
        }
      },
      matchGoalById{
        goalA,
        goalB
      }
    }
  }
}
`
