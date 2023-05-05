/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, LinearProgress } from '@mui/material';
import useStationDetails from '../../hooks/useStationDetails';
import StationTable from './table';
import SearchStationInput from '../station-search';
import useSingleStationDetails from '../../hooks/useSingleStationDetails';

function Stations() {
  const { data, page, isLoading, setPage } = useStationDetails();
  const {
    data: singleStationDetails,
    isLoading: singleStationLoading,
    setId,
  } = useSingleStationDetails();
  console.log(singleStationDetails);
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
          onRowClick={(_e) => {
            setId(_e.id.toString());
          }}
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
