import React, { useMemo } from "react";
import useData from "../../hooks/useData";

import Table from "./resultTable";
import { Columns } from "../../types/types";
import styles from './resultSection.module.css'

interface Props {
  query: string
}
const TableSection = React.memo(({ query }: Props) => {
  const { data, runtime, error } = useData(query);

  const columns: Columns[] = useMemo(() => {
    if (data.length > 0) {
      return Object.keys(data[0]).map((key) => {
        const result = data[0][key]
          .replace(/([A-Z]+)/g, " $1")
          .replace(/([A-Z][a-z])/g, " $1");

        return {
          Header: result,
          accessor: key,
          className: 'column'
        };
      });
    }
    else {
      return []
    }
  }, [data]);

  const queryData = useMemo(() => data.slice(1), [data]);

  if (error)
    return (
      <section
      >
        <h3>
          Something Went Wrong{" "}
          <span role="img" aria-label="sad face">
            😔
          </span>
        </h3>
      </section>
    );
  return (
    <>
      <section className={styles.tableSectionContainer}>
        {data.length > 0 ? (
          <>
            <p className={styles.runtimeText}>
              Query took:{" "}
              <span className={styles.runtime}>{`${runtime.toFixed(2)} ms`}</span>
            </p>
            <Table
              columns={columns}
              completeData={data}
              data={queryData}
              query={query} />
          </>
        ) : (
          <p>Loading...</p>
        )}
      </section>
    </>
  );
});

export default TableSection;
