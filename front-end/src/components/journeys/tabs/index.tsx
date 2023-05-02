import Box from '@mui/material/Box';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import useSortingTabsManager from '../../../hooks/utility/useSortingTabsManager';

interface ITabsProps {
  setSortBy: (val: string) => void;
  setOrder: (val: string) => void;
}

function getLabel(order: string) {
  if (order === 'asc') {
    return <ArrowDownward />;
  }
  return <ArrowUpward />;
}

export default function Tabs({ setOrder, setSortBy }: ITabsProps) {
  const { seletedTab, setSelectedTab, setTabsState, tabsState } =
    useSortingTabsManager(setOrder, setSortBy);
  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        margin: '2rem 0rem',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h6"
        sx={{ display: 'inline-block', margin: '0rem 1rem' }}
      >
        Sort By:
      </Typography>
      {tabsState.map((tab, i) => {
        return (
          <Button
            key={tab.value}
            onClick={() => {
              // set the index of selected tab
              setSelectedTab(i);
              // make sure if same tabs is pressed the order is reversed
              setTabsState((prev) => {
                if (i === seletedTab) {
                  if (prev[i].order === 'asc') {
                    const updatedState = [...prev];
                    updatedState[i].order = 'desc';
                    return updatedState;
                  }
                  const updatedState = [...prev];
                  updatedState[i].order = 'asc';
                  return updatedState;
                }
                return prev;
              });
            }}
            endIcon={seletedTab === i ? getLabel(tab.order) : undefined}
            sx={{ marginLeft: '1rem' }}
            variant={seletedTab === i ? 'contained' : 'outlined'}
          >
            {tab.name}
          </Button>
        );
      })}
    </Box>
  );
}
