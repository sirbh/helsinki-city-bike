import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getJourneyDetails } from '../../services';
import JourneyTable from './table';
import useJourneyDetails from '../../hooks/useJourneyDetails';

const Journeys = () => {
  const { data, error, isLoading, page, setPage, take } = useJourneyDetails();
  if (error) {
    console.log(error);
    return <div>Error</div>;
  }
  if (isLoading) {
    console.log(isLoading);
    return <div>Loading...</div>;
  }
  console.log(data);
  return (
    <JourneyTable
      count={data?.count?data.count:0}
      page={page}
      pageChangeHandler={() => {
        setPage((page) => page + 1);
      }}
      tableData={data?.details ? data.details : []}
      take={take}
    />
  );
};
export default Journeys;
