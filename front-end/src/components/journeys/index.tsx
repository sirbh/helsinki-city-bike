import JourneyTable from './table';
import useJourneyDetails from '../../hooks/useJourneyDetails';

function Journeys() {
  const { data, error, isLoading, page, setPage, take } = useJourneyDetails();
  if (error) {
    return <div>Error</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <JourneyTable
      count={data?.count ? data.count : 0}
      page={page}
      pageChangeHandler={(p) => {
        setPage(p);
      }}
      tableData={data?.details ? data.details : []}
      take={take}
    />
  );
}

export default Journeys;
