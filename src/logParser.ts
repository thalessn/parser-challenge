import fs from 'fs'
import readline from 'readline'
import events from 'events'
import Game from './entities/game'
import Player from './entities/player'
import ParserPatterns from './regex/parse-patterns'

interface KillInformation {
  killer_player: string
  killed_player: string
  deathCause: string
}

export default class LogParser {
  private static UNKNOWN = 'Unknown'
  private games: Game[]

  constructor() {
    this.games = []
  }

  async parser(filename: string): Promise<Game[]> {
    let game: Game | undefined
    let idGame = 1

    const reader = readline.createInterface({
      input: fs.createReadStream(filename)
    })

    reader.on('line', (line) => {
      if (ParserPatterns.START_GAME.test(line)) {
        if (!game) {
          game = new Game(idGame)
          this.games.push(game)
          idGame++
        }
      }

      if (ParserPatterns.PLAYER_NAME.test(line)) {
        const playerName = this.parserPlayerName(line)
        if (game && !game.containsPlayer(playerName)) {
          const player = new Player(playerName)
          game.addPlayer(player)
        }
      }

      if (ParserPatterns.KILL_INFORMATION.test(line)) {
        const { killer_player, killed_player, deathCause } = this.parserKillInfo(line)
        if (game) {
          game.calcKill(killer_player, killed_player, deathCause)
        }
      }

      if (ParserPatterns.END_GAME.test(line)) {
        game = undefined
      }
    })

    await events.once(reader, 'close')

    return this.games
  }

  private parserPlayerName(line: string): string {
    const indexName = 1
    const playerInfo = ParserPatterns.PLAYER_NAME.exec(line)
    const playerName = playerInfo?.[indexName] ?? LogParser.UNKNOWN
    return playerName
  }

  private parserKillInfo(line: string): KillInformation {
    const indexKillerName = 1
    const indexKilledName = 2
    const indexMotiveDeath = 3
    const killInfo = ParserPatterns.KILL_INFORMATION.exec(line)
    return {
      killer_player: killInfo?.[indexKillerName] ?? LogParser.UNKNOWN,
      killed_player: killInfo?.[indexKilledName] ?? LogParser.UNKNOWN,
      deathCause: killInfo?.[indexMotiveDeath] ?? LogParser.UNKNOWN
    }
  }
}