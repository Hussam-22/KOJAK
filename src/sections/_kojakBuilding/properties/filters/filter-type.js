/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Checkbox, { checkboxClasses } from '@mui/material/Checkbox';

// ----------------------------------------------------------------------

export default function FilterType({ filterType, onChangeType, filters, selectedAllText }) {
  return (
    <FormControl fullWidth hiddenLabel>
      <Select
        multiple
        displayEmpty
        value={filterType}
        onChange={onChangeType}
        renderValue={(selected) => {
          if (!selected.length) {
            return (
              <Typography variant="body2" sx={{ color: 'text.disabled' }}>
                {selectedAllText}
              </Typography>
            );
          }
          return (
            <Typography variant="subtitle2" component="span">
              {selected.join(', ')}
            </Typography>
          );
        }}
      >
        {filters.map((filterKey) => (
          <MenuItem key={filterKey} value={filterKey}>
            <Checkbox
              size="small"
              checked={filterType.includes(filterKey)}
              sx={{
                [`&.${checkboxClasses.root}`]: {
                  p: 0,
                  mr: 1,
                },
              }}
            />
            {typeof filterKey === 'boolean'
              ? filterKey === false
                ? 'Not Available'
                : 'Available'
              : filterKey}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

FilterType.propTypes = {
  filterType: PropTypes.array,
  filters: PropTypes.array,
  onChangeType: PropTypes.func,
  selectedAllText: PropTypes.string,
};
