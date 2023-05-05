/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, LinearProgress } from '@mui/material';
import useStationDetails from '../../hooks/useStationDetails';
import StationTable from './table';
import SearchStationInput from '../station-search';

function Stations() {
  const { data, page, isLoading, setPage } = useStationDetails();
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '2rem',
        }}
      >
        <SearchStationInput setSelectedOption={(_res) => {}} />
      </Box>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <StationTable
          count={data?.count || 0}
          onRowClick={(_e) => {}}
          page={page}
          pageChangeHandler={(updatedPage) => {
            setPage(updatedPage);
          }}
          tableData={data?.details || []}
        />
      )}
    </>
  );
}

export default Stations;
