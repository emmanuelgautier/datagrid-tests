import { sortingEnum } from '../enum/sorting.enum';
import { InvestmentsPayload, Investment } from '../interfaces/investments';

const basePath = 'http://localhost:8000/investments';

export const fetchInvestments = async (page: number, orderBy: string, sortBy: sortingEnum): Promise<Investment[]> => {
  const { data } = await (await fetch(`${basePath}?page=${page}&orderBy=${orderBy}&sortBy=${sortBy}`)).json() as InvestmentsPayload;

  return data;
};

export const deleteInvestment = async (id: number): Promise<void> => {
  await fetch(`${basePath}/${id}`, {
    method: 'DELETE'
  });
}
