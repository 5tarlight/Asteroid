import { Sequelize, Model, DataTypes } from "sequelize";
import config from '../configure'
import Logger from "../Logger";

export class Server extends Model {}

class Database {
  public seq: Sequelize

  constructor() {
    const cfg = config()
    // @ts-ignore
    this.seq = new Sequelize(cfg.db.database, cfg.db.user, cfg.db.password, {
      host: cfg.db.host,
      dialect: 'mariadb',
      logging: Logger.debug
    })

    this.seq.authenticate().catch(error => {
      Logger.err('Unable to connect to the database:' + error.toString());
    })

    Server.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      discord: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lang: {
        type: DataTypes.STRING,
        defaultValue: 'en'
      }
    }, {
      sequelize: this.seq,
      modelName: 'server',
      tableName: 'server',
      timestamps: true,
      createdAt: true,
      updatedAt: true
    })

    Server.sync({ alter: true })
  }
}

export default Database
