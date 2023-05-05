import { Box, LinearProgress } from '@mui/material';
import { useState } from 'react';
import useStationDetails from '../../hooks/useStationDetails';
import StationTable from './table';
import SearchStationInput from '../station-search';
import useSingleStationDetails from '../../hooks/useSingleStationDetails';
import SingleStationModal from '../single-station-modal';

function Stations() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { data, page, isLoading, setPage } = useStationDetails();
  const {
    data: singleStationDetails,
    isLoading: singleStationLoading,
    setId,
  } = useSingleStationDetails();
  return (
    <>
      <SingleStationModal
        open={modalOpen}
        handleClose={() => {
          setModalOpen((prev) => !prev);
        }}
        loading={singleStationLoading}
        stationDetails={singleStationDetails}
      />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '2rem',
        }}
      >
        <SearchStationInput
          setSelectedOption={(_res) => {
            setId(_res?.id ? _res.id.toString() : '');
            setModalOpen(!!_res?.id);
          }}
        />
      </Box>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <StationTable
          count={data?.count || 0}
          onRowClick={(_e) => {
            setId(_e.id.toString());
            setModalOpen(true);
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
