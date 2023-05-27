import { Box, LinearProgress } from '@mui/material';
import JourneyTable from './table';
import useJourneyDetails from '../../hooks/useJourneyDetails';
import Tabs from './tabs';
import SearchStationInput from '../station-search';
import SelectInput from '../select';
import Error from '../error';

function Journeys() {
  const {
    data,
    error,
    isLoading,
    page,
    take,
    journeyType,
    setOrder,
    setSortBy,
    setPage,
    setJourneyType,
    setStationId,
  } = useJourneyDetails();
  if (error) {
    return <Error />;
  }
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
        <SearchStationInput
          setSelectedOption={(res) => {
            setStationId(res ? res.id.toString() : '');
            setPage(1);
          }}
        />
        <SelectInput
          handleChange={(v: string) => {
            setJourneyType(v);
          }}
          selectedJourneyType={journeyType}
          options={[
            {
              name: 'Departure',
              value: 'departure_station_id',
            },
            {
              name: 'Return',
              value: 'return_station_id',
            },
          ]}
        />
      </Box>
      <Tabs setOrder={setOrder} setSortBy={setSortBy} setPage={setPage} />
      {isLoading ? (
        <LinearProgress />
      ) : (
        <JourneyTable
          count={data?.count ? data.count : 0}
          page={page}
          pageChangeHandler={(p) => {
            setPage(p);
          }}
          tableData={data?.details ? data.details : []}
          take={take}
        />
      )}
    </>
  );
}

export default Journeys;
