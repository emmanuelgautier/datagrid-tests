import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

import { UpdateInvestmentDto } from '@dtos/investments.dto';
import { Investment } from '@interfaces/investment.interface';
import InvestmentsService from '@services/investments.service';
import { sortingEnum } from '@/interfaces/sorting.interface';
import { FindAllInvestmentsRouteQueryParams } from '@/interfaces/routes.interface';

class InvestmentsController {
  public investmentsService = new InvestmentsService();

  public getInvestments = async (req: Request<ParamsDictionary, any, any, FindAllInvestmentsRouteQueryParams>, res: Response, next: NextFunction) => {
    try {
      const { limit = 10, page = 0, orderBy = 'id', sortBy = sortingEnum.ASC } = req.query;
      const findAllInvestmentsData: Investment[] = await this.investmentsService.findAllInvestments({ limit, page }, { orderBy, sortBy });

      res.status(200).json({ data: findAllInvestmentsData });
    } catch (error) {
      next(error);
    }
  };

  public updateInvestment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const investmentId = Number(req.params.id);
      const investmentData: UpdateInvestmentDto = req.body;
      const updateInvestmentData: Investment = await this.investmentsService.updateInvestment(investmentId, investmentData);

      res.status(200).json({ data: updateInvestmentData });
    } catch (error) {
      next(error);
    }
  };

  public deleteInvestment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const investmentId = Number(req.params.id);
      await this.investmentsService.deleteInvestment(investmentId);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}

export default InvestmentsController;
