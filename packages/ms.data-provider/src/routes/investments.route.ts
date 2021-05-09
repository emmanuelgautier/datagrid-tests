import { Router } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

import InvestmentsController from '@controllers/investments.controller';
import { FindAllInvestmentsParamsDto, UpdateInvestmentDto } from '@dtos/investments.dto';
import Route, { FindAllInvestmentsRouteQueryParams } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class InvestmentsRoute implements Route {
  public path = '/investments';
  public router = Router();
  public InvestmentsController = new InvestmentsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get<ParamsDictionary, any, any, FindAllInvestmentsRouteQueryParams>(
      `${this.path}`,
      validationMiddleware<any, any, FindAllInvestmentsRouteQueryParams>(FindAllInvestmentsParamsDto, 'query', true),
      this.InvestmentsController.getInvestments,
    );
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(UpdateInvestmentDto, 'body', true), this.InvestmentsController.updateInvestment);
    this.router.delete(`${this.path}/:id(\\d+)`, this.InvestmentsController.deleteInvestment);
  }
}

export default InvestmentsRoute;
