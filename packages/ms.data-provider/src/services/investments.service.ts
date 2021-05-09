import DB from '@databases';
import { UpdateInvestmentDto } from '@dtos/investments.dto';
import HttpException from '@exceptions/HttpException';
import { Investment } from '@interfaces/investment.interface';
import { Pagination } from '@interfaces/pagination.interface';
import { Sorting, sortingEnum } from '@interfaces/sorting.interface';

class InvestmentsService {
  public async getInvestmentById(investmentId: number): Promise<Investment> {
    const investment: Investment = await DB.Investment.findByPk(investmentId);

    return investment;
  }

  public async findAllInvestments({ limit, page }: Pagination, { orderBy, sortBy }: Sorting): Promise<Investment[]> {
    const investments: Investment[] = await DB.Investment.findAll({
      offset: page * limit,
      limit,
      order: [[orderBy, sortBy === sortingEnum.ASC ? 'ASC' : 'DESC']],
    });

    return investments;
  }

  public async updateInvestment(investmentId: number, investmentData: UpdateInvestmentDto): Promise<Investment> {
    const findInvestment: Investment = await this.getInvestmentById(investmentId);
    if (!findInvestment) throw new HttpException(409, 'this investment does not exist');

    await DB.Investment.update(investmentData, { where: { id: investmentId } });

    const updateInvestment: Investment = await this.getInvestmentById(investmentId);

    return updateInvestment;
  }

  public async deleteInvestment(investmentId: number): Promise<void> {
    await DB.Investment.destroy({ where: { id: investmentId } });
  }
}

export default InvestmentsService;
