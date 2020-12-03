import { Sequelize, Model, DataTypes } from "sequelize";
import config from '../configure'
import Logger from "../Logger";

export class Server extends Model {}
export class Users extends Model {}
export class Items extends Model {}
export class Inventory extends Model {}

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

    Users.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      discord: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      sequelize: this.seq,
      modelName: 'user',
      tableName: 'user',
      timestamps: true,
      createdAt: true,
      updatedAt: true
    })

    Items.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      name_ko: {
        type: DataTypes.STRING,
        allowNull: true
      }
    }, {
      sequelize: this.seq,
      modelName: 'item',
      tableName: 'item',
      timestamps: true,
      createdAt: true,
      updatedAt: true
    })

    Inventory.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      owner: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      item: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      count: {
        type: DataTypes.INTEGER,
        defaultValue: 1
      },
      meta: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    }, {
      sequelize: this.seq,
      modelName: 'inventory',
      tableName: 'inventory',
      timestamps: true,
      createdAt: true,
      updatedAt: true
    })

    const option = { alter: true }
    Users.sync(option)
    Server.sync(option)
    Items.sync(option)
    Inventory.sync(option)
  }
}

export default Database
