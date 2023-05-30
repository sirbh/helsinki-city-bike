import { Box, LinearProgress } from '@mui/material';
import { useState, useContext } from 'react';
import useStationDetails from '../../hooks/useStationDetails';
import StationTable from './table';
import SearchStationInput from '../station-search';
import useSingleStationDetails from '../../hooks/useSingleStationDetails';
import SingleStationModal from '../single-station-modal';
import Error from '../error';
import StationContext from '../../contexts/StationContext';
import AuthContext from '../../contexts/AuthContext';

function Stations() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { data, page, isLoading, setPage, isError } = useStationDetails();
  const {
    data: singleStationDetails,
    isLoading: singleStationLoading,
    setId,
  } = useSingleStationDetails();
  const { userDetails } = useContext(AuthContext);

  if (isError) {
    return <Error />;
  }
  return (
    <>
      <SingleStationModal
        open={modalOpen}
        handleClose={() => {
          setModalOpen((prev) => !prev);
        }}
        loading={singleStationLoading}
        stationDetails={singleStationDetails}
        showDelete={!!userDetails}
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
