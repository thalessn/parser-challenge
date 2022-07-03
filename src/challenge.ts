import Game from './entities/game'

type PlayerKillInfo = {
  [key: string]: number
}

type DeathInfo = {
  [key: string]: number
}

export default class Challenge {
  constructor(private readonly games: Game[]) {
    this.games = games
  }

  public task1(): void {
    console.log('--------- Task 1 ----------')
    const statistics: {[key:string]: object} = {}
    for (let game of this.games) {
      statistics[`Game-${game.getId()}`] = game.getGameStats()
    }
    console.log(statistics)
    console.log('\n------- End Task 1 -------\n')
  }

  public task2(): void {
    console.log('--------- Task 2 ---------')
    this.printGlobalRank(this.games)
    console.log('\n------- End Task 2 -------\n')
  }

  public task3(): void {
    console.log('--------- Task 3 ---------')
    const rank: {[name: string]: object} = {}
    for (let game of this.games) {
      rank[`Game-${game.getId()}`] = this.rankDeathCauses(game)
    }
    console.log(JSON.stringify(rank, null, 2))
    console.log('\n------ End Task 3 ------')
  }

  private printGlobalRank(games: Game[]): void {
    const playersKills = this.sumPlayersKills(games)
    const playersRanking = this.rankPlayersObj(playersKills)
    console.log('\n**** Ranking ****')
    for (let key of Object.keys(playersRanking)) {
      console.log(`${key}: ${playersRanking[key]} KILLS`)
    }
    console.log('\n')
    for (let game of games) {
      this.printGameRank(game)
    }
  }

  private printGameRank(game: Game): void {
    const sortedPlayers = game.getPlayers().sort((player1, player2) => player2.getKills() - player1.getKills())
    console.log(`---- Game ${game.getId()} ----`)
    for (let player of  sortedPlayers) {
      console.log(`${player.getName()}: ${player.getKills()} Kills`)
    }
  }

  private rankDeathCauses(game: Game): object {
    const deathCause = this.sumDeathCauses(game)
    const rankDeathCause = this.sortDeathCausesDesc(deathCause)
    return {
      "kills_by_means": rankDeathCause
    }
  }

  private sumPlayersKills(games: Game[]): object {
    const playersKills: { [name: string]: number } = {}
    for (let game of games) {
      for (let player of game.getPlayers()) {
        const playerName = player.getName()
        if (playersKills.hasOwnProperty(playerName)) {
          playersKills[playerName] += player.getKills()
        } else {
          playersKills[playerName] = player.getKills()
        }
      }
    }
    return playersKills
  }

  private sumDeathCauses(game: Game): object {
    const deathCauseObj: {[name: string]: number} = {}
    for (let kill of game.getKills()) {
      const deathCause = kill.deathCause
      if (deathCauseObj.hasOwnProperty(deathCause)) {
        deathCauseObj[deathCause] += 1
      } else {
        deathCauseObj[deathCause] = 1
      }
    }
    return deathCauseObj
  }

  private rankPlayersObj(players: Object): PlayerKillInfo {
    return Object.fromEntries(Object.entries(players).sort((player1, player2) => {
      return player2[1] - player1[1]
    }))
  }

  private sortDeathCausesDesc(deaths: Object): DeathInfo {
    return Object.fromEntries(Object.entries(deaths).sort((kill1, kill2) => kill2[1] - kill1[1]))
  }
}