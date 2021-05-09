export enum sortingEnum {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface Sorting {
  orderBy: string;
  sortBy: sortingEnum;
}
