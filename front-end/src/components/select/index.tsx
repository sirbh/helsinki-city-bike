import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { SelectOption } from '../../types';

interface SelectInputProps {
  options: SelectOption[];
  selectedJourneyType: string;
  handleChange: (e: string) => void;
}

function SelectInput({
  options,
  selectedJourneyType,
  handleChange,
}: SelectInputProps) {
  return (
    <FormControl sx={{ m: 1, minWidth: 80 }}>
      <InputLabel id="demo-simple-select-autowidth-label">
        Journey Type
      </InputLabel>
      <Select
        id="journey-type"
        value={selectedJourneyType}
        onChange={(e) => {
          handleChange(e.target.value);
        }}
        autoWidth
        label="Journey Type"
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectInput;
