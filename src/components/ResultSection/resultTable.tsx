import React, { useState } from "react";
import {
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  usePagination,
} from "react-table";
import FirstPageIcon from "../../icons/firstPageIcon";
import LastPageIcon from "../../icons/lastPageIcon";
import NextPageIcon from "../../icons/nextPageIcon";
import PreviousPageIcon from "../../icons/previousPageIcon";
import { Columns, GlobalFilterProps } from "../../types/types";
import CsvDownload from "react-json-to-csv";

import styles from './resultSection.module.css'
import '../Sidebar/sidebar.css'
import DownloadIcon from "../../icons/downloadIcon";

const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}: GlobalFilterProps) => {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <div>
      <label >
        <span className={styles.searchText}>
          Search:{" "}
        </span>
        <input
          type="text"
          className={styles.input}
          value={value || ""}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`${count} data...`}
        />
      </label>
    </div>
  );
};

interface Props {
  columns: Columns[]
  data: any[]
  completeData: any[]
  query: string
}
const Table = React.memo(({ columns, data, completeData, query }: Props) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
    state,
    setPageSize,
    pageOptions,
    gotoPage,
    pageCount,
    setGlobalFilter,
    preGlobalFilteredRows,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  return (
    <>
      <div className={styles.searchContainer}>
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />

        <CsvDownload
          data={completeData}
          filename={`${query}.csv`}
          className={styles.csvDownloadBtn}
        >
          <DownloadIcon />
          CSV
        </CsvDownload>
      </div>

      {/* ....table.... */}
      <div className={styles.tableContainer}>
        <table
          {...getTableProps()}
          className={styles.table}
        >
          <thead className={styles.tableHead}>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} className={styles.subheads}>
                {headerGroup.headers.map((column) => (
                  <th
                    scope="col"
                    // className={styles.subheads}
                    {...column.getHeaderProps([{ className: column.className }, column.getSortByToggleProps()])}
                  >
                    <span>
                      {column.render("Header")?.toString().toUpperCase()}
                    </span>

                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody
            {...getTableBodyProps()}
          >
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}
                  className={styles.rows}
                  style={i % 2 === 0 ? { backgroundColor: "whitesmoke" } : {}}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        className={styles.cells}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>


      <div className={styles.paginationContainer}>
        <div>
          <span>
            Page <span >{state.pageIndex + 1}</span> of{" "}
            <span >{pageOptions.length}</span>
          </span>
          <select
            value={state.pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
            className={styles.paginationSelect}
          >
            {[5, 10, 20].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div>
          <nav
            className={styles.paginationNavigator}
            aria-label="Pagination"
          >
            <button
              className={styles.iconButton}
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >

              <FirstPageIcon />
            </button>
            <button
              className={styles.iconButton}
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >

              <PreviousPageIcon />
            </button>
            <button
              className={styles.iconButton}
              onClick={() => nextPage()} disabled={!canNextPage}>

              <NextPageIcon />
            </button>
            <button
              className={styles.iconButton}
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >

              <LastPageIcon />
            </button>
          </nav>
        </div>
      </div>
    </>
  );
});

export default Table;
