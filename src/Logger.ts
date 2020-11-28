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
      , msg + '\n'
    )
  }

  static info(msg: string): void {
    console.log('[info] '.blue + Logger.getTimeStamp().white + msg.white)
    Logger.println('[info] ' + Logger.getTimeStamp() + msg)
  }

  static warn(msg: string): void {
    console.log('[warn] '.yellow + Logger.getTimeStamp().white + msg.white)
    Logger.println('[warn] ' + Logger.getTimeStamp() + msg)
  }

  static err(msg: string): void {
    console.log('[err] '.red + Logger.getTimeStamp().white + msg.white)
    Logger.println('[err] ' + Logger.getTimeStamp() + msg)
  }
}

export default Logger
