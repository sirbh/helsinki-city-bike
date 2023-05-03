import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TablePagination } from '@mui/material';
import { IJourney } from '../../../types';

interface ITableProps {
  tableData: IJourney[];
  pageChangeHandler: (n: number) => void;
  page: number;
  count: number;
  take: number;
}

export default function JourneyTable({
  tableData,
  pageChangeHandler,
  page,
  count,
  take,
}: ITableProps) {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 350 }} size="small">
          <TableHead>
            <TableRow>
              <TableCell
                align="left"
                sx={{ fontWeight: 'bold', fontSize: '1rem' }}
              >
                Departure station
              </TableCell>
              <TableCell
                align="left"
                sx={{ fontWeight: 'bold', fontSize: '1rem' }}
              >
                Return Station
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: 'bold', fontSize: '1rem' }}
              >
                Covered Distance&nbsp;(km)
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: 'bold', fontSize: '1rem' }}
              >
                Duration&nbsp;(mins)
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left">{row.departure_station_name}</TableCell>
                <TableCell align="left">{row.return_station_name}</TableCell>
                <TableCell align="right">
                  {(row.covered_distance / 1000).toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  {(row.duration / 60).toFixed(1)}
                </TableCell>
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
        rowsPerPage={take}
        page={page - 1}
        onPageChange={(_e, n) => {
          pageChangeHandler(n + 1);
        }}
      />
    </>
  );
}
