import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TablePagination, Typography } from '@mui/material';
import { IStation } from '../../../types';

interface ITableProps {
  tableData: IStation[];
  pageChangeHandler: (n: number) => void;
  page: number;
  count: number;
  onRowClick: (option: IStation) => void;
}
export default function StationTable({
  tableData,
  pageChangeHandler,
  page,
  count,
  onRowClick,
}: ITableProps) {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 350 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell
                align="left"
                sx={{ fontWeight: 'bold', fontSize: '1rem' }}
              >
                Station Name
              </TableCell>
              <TableCell
                align="left"
                sx={{ fontWeight: 'bold', fontSize: '1rem' }}
              >
                City
              </TableCell>
              <TableCell
                align="left"
                sx={{ fontWeight: 'bold', fontSize: '1rem' }}
              >
                Address
              </TableCell>
              <TableCell
                align="left"
                sx={{ fontWeight: 'bold', fontSize: '1rem' }}
              >
                Capacity
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell
                  align="left"
                  sx={{
                    cursor: 'pointer',
                    color: 'blue',
                    textDecoration: 'underline',
                  }}
                >
                  <Typography onClick={() => onRowClick(row)}>
                    {row.name}
                  </Typography>
                </TableCell>
                <TableCell align="left">{row.city}</TableCell>
                <TableCell align="left">{row.address}</TableCell>
                <TableCell align="left">{row.capacity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        sx={{ display: 'flex', justifyContent: 'center' }}
        rowsPerPageOptions={[10]}
        component="div"
        align="center"
        count={count}
        rowsPerPage={10}
        page={page - 1}
        onPageChange={(_e, n) => {
          pageChangeHandler(n + 1);
        }}
      />
    </>
  );
}
