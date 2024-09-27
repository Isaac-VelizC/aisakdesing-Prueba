import {
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import { useState } from "react";
import { _payments } from "src/_mock";
import { Scrollbar } from "src/components/scrollbar";
import { TableToolbar } from "src/components/table/table-toolbar";
import { useTable } from "src/hooks/use-table";
import { DashboardContent } from "src/layouts/dashboard";
import {
  applyPayFilter,
  emptyRows,
  getComparator,
} from "src/utils/table-utils";
import { PayProps, PayTableRow } from "./pay-table-row";
import { TableEmptyRows } from "src/components/table/table-empty-rows";
import { TableNoData } from "src/components/table/table-not-data";
import { WidgetTableHead } from "src/components/table/table-head";

export function PaymentsView() {
  const table = useTable();

  const [filterName, setFilterName] = useState("");

  const dataFiltered: PayProps[] = applyPayFilter({
    inputData: _payments,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <DashboardContent>
      <Typography variant="h4" flexGrow={1} mb={5}>
        Payments
      </Typography>
      <Card>
        <TableToolbar
          numSelected={table.selected.length}
          filterName={filterName}
          onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFilterName(event.target.value);
            table.onResetPage();
          }} 
        />
        <Scrollbar>
          <TableContainer sx={{ overflow: "unset" }}>
            <Table sx={{ minWidth: 800 }}>
              <WidgetTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={_payments.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) => table.onSelectAllRows(
                  checked,
                  _payments.map((pay) => pay.id)
                )}
                headLabel={[
                  { id: "name", label: "Name" },
                  { id: "price", label: "Price" },
                  { id: "isVerified", label: "Verified", align: "center" },
                  { id: "status", label: "Status" },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <PayTableRow
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id)}
                      onSelectRow={() => table.onSelectRow(row.id)}
                    />
                  ))}
                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(
                    table.page,
                    table.rowsPerPage,
                    _payments.length
                  )}
                />
                {notFound && <TableNoData searchQuery={filterName} /> }
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        <TablePagination
          component={"div"}
          page={table.page}
          count={_payments.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 15]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
    </DashboardContent>
  );
}
