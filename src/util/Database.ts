import { Sequelize } from "sequelize";
import config from '../configure'

class Database {
  public seq: Sequelize

  constructor() {
    const cfg = config()
    // @ts-ignore
    this.seq = new Sequelize(cfg.db.database, cfg.db.user, cfg.db.password, {
      host: cfg.db.host,
      dialect: 'mariadb'
    })

    this.seq.authenticate().catch(error => {
      console.error('Unable to connect to the database:', error);
    })
  }
}

export default Database
