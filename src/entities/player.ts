export default class Player {
  constructor(
    private name: string,
    private kills: number = 0
  ) {
    this.name = name
    this.kills = kills
  }

  public getName(): string {
    return this.name
  }

  public getKills(): number {
    return this.kills
  }

  public increaseKills(): void {
    this.kills += 1
  }

  public decreaseKills(): void {
    this.kills -= 1
  }
}