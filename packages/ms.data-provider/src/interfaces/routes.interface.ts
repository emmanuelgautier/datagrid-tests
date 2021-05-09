import { Router } from 'express';
import { sortingEnum } from './sorting.interface';

interface Route {
  path?: string;
  router: Router;
}

export interface FindAllInvestmentsRouteQueryParams {
  page: number;
  limit: number;
  sortBy: sortingEnum;
  orderBy: string;
}

export default Route;
