import Player from './player'

type Kill =  {
  killer: string
  killed: string
  deathCause: string
}

export default class Game {
  private static WORLD = '<world>'

  constructor(
    private id: number,
    private kills: Kill[] = [],
    private players: Player[] = []
  ) {
    this.id = id
  }

  public getPlayersName(): string {
    return this.players.map(player => player.getName()).join(', ')
  }
  
  public getPlayersAndKills(): Object {
    const playersObj: { [name: string]: number } = {}
    for (let player of this.players) {
      playersObj[player.getName()] = player.getKills()
    }
    return playersObj
  }
  
  public getPlayers(): Player[] {
    return this.players
  }
  
  public getId(): number {
    return this.id
  }

  public getKills(): Kill[] {
    return this.kills
  }
  
  public addPlayer(player: Player) {
    this.players.push(player)
  }

  public containsPlayer(playerName: string): boolean {
    const player = this.players.find(player => player.getName() === playerName)
    return player ? true : false
  }

  public calcKill(killerPlayer: string, killedPlayer: string, deathCause: string): void {
    this.kills.push({
      killer: killerPlayer,
      killed: killedPlayer,
      deathCause
    })

    if (killerPlayer === Game.WORLD) {
      const killedPlayerIndex = this.players.findIndex(player => player.getName() === killedPlayer)
      if (killedPlayerIndex >= 0) {
        this.players[killedPlayerIndex].decreaseKills()
      }
    } else {
      const killerPlayerIndex = this.players.findIndex(player => player.getName() === killerPlayer)
      if (killerPlayerIndex >= 0) {
        this.players[killerPlayerIndex].increaseKills()
      }
    }
  }

  public totalKills(): number {
    return this.kills.length
  }
  
  public getGameStats(): object {
    return {
        totalKills: this.totalKills(),
        players: [this.getPlayersName()],
        kills: this.getPlayersAndKills()
      }
  }
}