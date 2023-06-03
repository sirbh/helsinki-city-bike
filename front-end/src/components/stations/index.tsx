import { Box, LinearProgress, Checkbox, FormControlLabel } from '@mui/material';
import { useState, useContext } from 'react';
import useStationDetails from '../../hooks/useStationDetails';
import StationTable from './table';
import SearchStationInput from '../station-search';
import useSingleStationDetails from '../../hooks/useSingleStationDetails';
import SingleStationModal from '../single-station-modal';
import Error from '../error';
import AuthContext from '../../contexts/AuthContext';

function Stations() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { data, page, isLoading, setPage, isError, setUsername } =
    useStationDetails();
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
        showDelete={
          !!userDetails &&
          singleStationDetails?.details.users?.username === userDetails.username
        }
      />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '2rem',
          marginBottom: '2rem',
        }}
      >
        <SearchStationInput
          setSelectedOption={(_res) => {
            setId(_res?.id ? _res.id.toString() : '');
            setModalOpen(!!_res?.id);
          }}
        />
        {userDetails && (
          <FormControlLabel
            control={
              <Checkbox
                onChange={(e) => {
                  if (e.target.checked) {
                    setUsername(userDetails.username);
                  } else {
                    setUsername(undefined);
                  }
                }}
              />
            }
            label="Show Stations Added By You"
          />
        )}
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
