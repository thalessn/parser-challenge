export default class ParserPatterns {
  public static PLAYER_NAME = /ClientUserinfoChanged:\s\d\sn\\(.*?)\\/
  public static KILL_INFORMATION = /\s([^:]+)\skilled\s(.*)\sby\s(.*)/
  public static START_GAME = /InitGame:/
  public static END_GAME = /----+/
}