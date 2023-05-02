import { useEffect, useState } from 'react';
import { ITabsState } from '../../types';

function useSortingTabsManager(
  setOrder: (val: string) => void,
  setSortBy: (val: string) => void
) {
  const [seletedTab, setSelectedTab] = useState(0);
  const [tabsState, setTabsState] = useState<ITabsState[]>([
    {
      name: 'Departure Station',
      value: 'departure_station_name',
      order: 'asc',
    },
    {
      name: 'Return Station',
      value: 'return_station_name',
      order: 'asc',
    },
    {
      name: 'Covered Distance',
      value: 'covered_distance',
      order: 'asc',
    },
    {
      name: 'Duration',
      value: 'duration',
      order: 'asc',
    },
  ]);

  useEffect(() => {
    setOrder(tabsState[seletedTab].order);
    setSortBy(tabsState[seletedTab].value);
  }, [tabsState, seletedTab, setOrder, setSortBy]);

  return { seletedTab, setSelectedTab, tabsState, setTabsState };
}

export default useSortingTabsManager;
