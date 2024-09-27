import { Label } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Checkbox,
  TableCell,
  TableRow,
} from "@mui/material";
import { Iconify } from "src/components/iconify";

export type PayProps = {
  id: string;
  name: string;
  price: string;
  status: string;
  date: string;
  avatarUrl: string;
  isVerified: boolean;
};

type PayTableRowProps = {
  row: PayProps;
  selected: boolean;
  onSelectRow: () => void;
};

export function PayTableRow({ row, selected, onSelectRow }: PayTableRowProps) {
  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding={"checkbox"}>
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>
        <TableCell component={"th"} scope="row">
          <Box gap={2} display={"flex"} alignItems={"center"}>
            <Avatar alt={row.name} src={row.avatarUrl} />
            {row.name}
          </Box>
        </TableCell>
        <TableCell>{row.price}</TableCell>
        <TableCell align="center">
          {row.isVerified ? (
            <Iconify
              width={22}
              icon="solar:check-circle-bold"
              sx={{ color: "success.main" }}
            />
          ) : (
            "-"
          )}
        </TableCell>

        <TableCell>
          <Label color={(row.status === "banned" && "error") || "success"}>
            {row.status}
          </Label>
        </TableCell>
      </TableRow>
    </>
  );
}
