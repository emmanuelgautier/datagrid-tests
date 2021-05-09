import React, { useEffect, useState } from 'react';
import { investmentEnum } from '../enum/investment.enum';

import { sortingEnum } from '../enum/sorting.enum';
import { Investment } from '../interfaces/investments';
import { fetchInvestments, deleteInvestment } from '../services/investments.service'

export function InvestmentsTable() {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [page, setPage] = useState<number>(0);
  const [orderBy, setOrderBy] = useState<string>('id');
  const [sortBy, setSortBy] = useState<sortingEnum>(sortingEnum.ASC);

  const _refreshTable = async () => {
    const investments = await fetchInvestments(page, orderBy, sortBy);
    setInvestments(investments);
  }

  const _handleNextPage = async () => {
    const newPage = page + 1;

    const investments = await fetchInvestments(newPage, orderBy, sortBy);
    setInvestments(investments);
    setPage(newPage);
  }

  const _handlePreviousPage = async () => {
    if (page <= 0) {
      return;
    }

    const newPage = page - 1;

    const investments = await fetchInvestments(newPage, orderBy, sortBy);
    setInvestments(investments);
    setPage(newPage);
  }

  const _handleDeleteInvestment = async (id: number) => {
    await deleteInvestment(id);
    await _refreshTable();
  }

  const _handleOrderColumn = async (column: string) => {
    const newPage = 0;
    let newSortBy = sortBy;
    if (column === orderBy) {
      newSortBy = sortBy === sortingEnum.ASC ? sortingEnum.DESC : sortingEnum.ASC;
    }
    const newOrderBy = column;

    const investments = await fetchInvestments(newPage, newOrderBy, newSortBy);
    setInvestments(investments);
    setPage(newPage);
    setOrderBy(newOrderBy);
    setSortBy(newSortBy);
  }

  useEffect(() => {
    _refreshTable();
  }, []);

  return (
    <div className="p-8 mt-6 lg:mt-0 rounded shadow bg-white">
      <table className="table-auto divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              onClick={() => _handleOrderColumn(investmentEnum.Id)}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Id
            </th>
            <th
              onClick={() => _handleOrderColumn(investmentEnum.Symbol)}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Symbol
            </th>
            <th
              onClick={() => _handleOrderColumn(investmentEnum.Quantity)}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Quantity
            </th>
            <th
              onClick={() => _handleOrderColumn(investmentEnum.TransactionTime)}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Transaction Time
            </th>
            <th
              onClick={() => _handleOrderColumn(investmentEnum.StrikePrice)}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Strike Price
            </th>
            <th
              onClick={() => _handleOrderColumn(investmentEnum.TradeDate)}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Trade Date
            </th>
            <th className="relative px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {investments.map(({ id, symbol, quantity, transactTime, strikePrice, tradeDate }) => (
            <tr key={`investments-table-${id}`}>
              <td className="px-6 py-4 whitespace-nowrap">{id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{symbol}</td>
              <td className="px-6 py-4 whitespace-nowrap">{quantity}</td>
              <td className="px-6 py-4 whitespace-nowrap">{transactTime}</td>
              <td className="px-6 py-4 whitespace-nowrap">{strikePrice}</td>
              <td className="px-6 py-4 whitespace-nowrap">{tradeDate}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-indigo-600 hover:text-indigo-900" onClick={() => _handleDeleteInvestment(id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="flex-1 flex justify-between">
          <button onClick={_handlePreviousPage} className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500">
            Previous
          </button>
          <button onClick={_handleNextPage} className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}