import { Row } from "react-table"
export type Columns = {
    Header: string
    accessor: string
    className: string
}

export type GlobalFilterProps = {
    preGlobalFilteredRows: Row<object>[],
    globalFilter: any,
    setGlobalFilter: (filterValue: any) => void
}