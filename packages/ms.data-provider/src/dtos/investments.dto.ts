import { Transform } from 'class-transformer';
import { IsDateString, IsDecimal, IsEnum, IsInt, IsString } from 'class-validator';

import { sortingEnum } from '@interfaces/sorting.interface';

export class FindAllInvestmentsParamsDto {
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  public readonly page: number;

  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  public readonly limit: number;

  @IsEnum([sortingEnum.ASC, sortingEnum.DESC])
  @Transform(({ value }) => sortingEnum[value])
  public readonly sortBy: sortingEnum;

  @IsString()
  @IsEnum(['id', 'symbol', 'quantity', 'transactTime', 'strikePrice', 'tradeDate'])
  public readonly orderBy: string;
}

export class UpdateInvestmentDto {
  @IsString()
  public readonly symbol: string;

  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  public readonly quantity: number;

  @IsDateString()
  @Transform(({ value }) => new Date(value))
  public readonly transactTime: Date;

  @IsDecimal()
  @Transform(({ value }) => +value)
  public readonly strikePrice: number;

  @IsDateString()
  @Transform(({ value }) => new Date(value))
  public tradeDate: Date;
}
