import 'colors'
import {appendFileSync, existsSync, mkdirSync} from 'fs'
import { join } from 'path'

class Logger {
  private static getTimeStamp(): string {
    const date = new Date()

    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return `[${year}.${month+1}.${day} ${hour}:${minute}:${second}] `
  }

  private static println(msg: string) {
    if (!existsSync(join(__dirname, 'logs'))) mkdirSync(join(__dirname, 'logs'))
    appendFileSync(
      join(__dirname, `/logs/${Logger.getTimeStamp().split(' ')[0].replace('[', '').trim()}.log`)
      , msg + '\n',
      { flag: 'w' }
    )
  }

  static info(msg: string): void {
    console.log('[정보] '.blue + Logger.getTimeStamp().white + msg.white)
    Logger.println('[정보] ' + Logger.getTimeStamp() + msg)
  }

  static warn(msg: string): void {
    console.log('[경고] '.yellow + Logger.getTimeStamp().white + msg.white)
    Logger.println('[경고] ' + Logger.getTimeStamp() + msg)
  }

  static err(msg: string): void {
    console.log('[오류] '.red + Logger.getTimeStamp().white + msg.white)
    Logger.println('[오류] ' + Logger.getTimeStamp() + msg)
  }
}

export default Logger
