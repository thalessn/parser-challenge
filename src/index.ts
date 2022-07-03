import LogParser from './logParser'
import Challenge from './challenge'
import path from 'path'
import fs from 'fs'

(async (): Promise<void> => {
  const logFile = path.resolve('qgames.log')
  if(fs.existsSync(logFile)) {
    const games = await new LogParser().parser(logFile)
    const challenge = new Challenge(games)
    
    challenge.task1()
    challenge.task2()
    challenge.task3() 
  } else {
    console.log('Log file wasn\'t found')
  }
})()
