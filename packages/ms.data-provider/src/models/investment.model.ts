import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Investment } from '@interfaces/investment.interface';

export type InvestmentCreationAttributes = Optional<Investment, 'id' | 'symbol' | 'quantity' | 'transactTime' | 'strikePrice' | 'tradeDate'>;

export class InvestmentModel extends Model<Investment, InvestmentCreationAttributes> implements Investment {
  public id: number;
  public symbol: string;
  public quantity: number;
  public transactTime: Date;
  public strikePrice: number;
  public tradeDate: Date;
}

export default function (sequelize: Sequelize): typeof InvestmentModel {
  InvestmentModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      symbol: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      quantity: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      transactTime: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      strikePrice: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      tradeDate: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      tableName: 'investments',
      sequelize,
      timestamps: false,
    },
  );

  return InvestmentModel;
}
