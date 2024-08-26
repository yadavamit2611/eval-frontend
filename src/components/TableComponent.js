import React, { useMemo } from 'react';
import { useTable, useSortBy, useGlobalFilter, usePagination, useRowSelect } from 'react-table';
import { CSVLink } from 'react-csv';
import './TableComponent.css';

const TableComponent = ({ data }) => {
  const columns = useMemo(
    () => [
/*       {
        Header: 'ID',
        accessor: '_id',
      }, */
      {
        Header: 'Sector',
        accessor: 'Sector',
      },
      {
        Header: 'Question',
        accessor: 'Question',
      },
      {
        Header: 'Answer',
        accessor: 'Answer',
      },
      {
        Header: 'Question Tokens',
        accessor: 'Question_tokens',
      },
      {
        Header: 'Answer Tokens',
        accessor: 'Answer_tokens',
      },
    ],
    []
  );

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        {
          id: 'selection',
          Header: ({ getToggleAllPageRowsSelectedProps }) => (
            <input type="checkbox" {...getToggleAllPageRowsSelectedProps()} />
          ),
          Cell: ({ row }) => (
            <input type="checkbox" {...row.getToggleRowSelectedProps()} />
          ),
        },
        ...columns,
      ]);
    }
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    state,
    setGlobalFilter,
    selectedFlatRows,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = tableInstance;

  const { globalFilter } = state;

  const headers = columns.map(column => ({
    label: column.Header,
    key: column.accessor,
  }));

  const csvData = selectedFlatRows.map(row => row.original);

  return (
    <div className="table-container">
      <input
        value={globalFilter || ''}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Search..."
        className="search-input"
      />
      <CSVLink
        data={csvData}
        headers={headers}
        filename="table_data.csv"
        className="btn"
      >
        Export Selected Rows to CSV
      </CSVLink>
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}><div>{cell.render('Cell')}</div></td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
        <select
          value={pageSize}
          onChange={e => setPageSize(Number(e.target.value))}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TableComponent;
