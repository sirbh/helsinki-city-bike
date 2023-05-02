import { LinearProgress } from '@mui/material';
import JourneyTable from './table';
import useJourneyDetails from '../../hooks/useJourneyDetails';
import Tabs from './tabs';

function Journeys() {
  const { data, error, isLoading, page, take, setOrder, setSortBy, setPage } =
    useJourneyDetails();
  if (error) {
    return <div>Error</div>;
  }
  return (
    <>
      <Tabs setOrder={setOrder} setSortBy={setSortBy} />
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
