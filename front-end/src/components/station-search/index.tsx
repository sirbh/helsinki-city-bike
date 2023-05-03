import { Autocomplete, Box, TextField } from '@mui/material';
import useStationSearch from '../../hooks/useStationSearch';
import { ISearchStation } from '../../types';

interface AutocompleteInputProps {
  setSelectedOption: (opt: ISearchStation | undefined) => void;
}

function SearchStationInput({ setSelectedOption }: AutocompleteInputProps) {
  const { data, setQuery } = useStationSearch();
  return (
    <Box sx={{ margin: '1rem 0rem' }}>
      <Autocomplete
        disablePortal
        getOptionLabel={(option) => {
          return option.name;
        }}
        onChange={(_e, v, r) => {
          if (r === 'selectOption' && v) {
            setSelectedOption(v);
          }
          if (r === 'clear') {
            setSelectedOption(undefined);
            setQuery('');
          }
        }}
        id="combo-box-demo"
        options={data || []}
        sx={{ width: 300 }}
        fullWidth
        renderInput={(params) => (
          <TextField {...params} label="Station Search" fullWidth />
        )}
        onInputChange={(_e, v, r) => {
          if (r === 'input') {
            setQuery(v);
          }
        }}
        isOptionEqualToValue={(option, value) => {
          return option.id === value.id;
        }}
      />
    </Box>
  );
}

export default SearchStationInput;
