import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Stack from '@mui/material/Stack';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';

import { rdxUpdateFilter } from 'src/redux/slices/products';
import { _mercedesClasses } from 'src/_mock/_mercedesClasses';

// ----------------------------------------------------------------------

export default function FilterBrand() {
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state.products);
  const [selectedClass, setSelectedClass] = useState(filter.class);
  const [selectedModel, setSelectedModel] = useState(filter.model);

  useEffect(() => {
    if (filter.class === '') setSelectedClass('');
    if (filter.model === '') setSelectedClass('');
  }, [filter]);

  const handelSelectedClassChange = (e) => {
    setSelectedClass(e.target.value);
  };
  const handelSelectedModelChange = (e) => {
    dispatch(rdxUpdateFilter({ model: e.target.value, class: selectedClass }));
    setSelectedModel(e.target.value);
  };

  return (
    <Stack spacing={3}>
      <FormControl>
        <InputLabel id="carClass">Select Class</InputLabel>
        <Select
          variant="outlined"
          labelId="carClass"
          value={selectedClass}
          label="Class"
          onChange={handelSelectedClassChange}
        >
          <MenuItem value="">
            <em>Select Class</em>
          </MenuItem>
          {_mercedesClasses
            .sort((a, b) => a.class.localeCompare(b.class))
            .map((item) => (
              <MenuItem key={item.class} value={item.class} color="primary">
                {item.class}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel id="carClass">Select Model/Year</InputLabel>

        <Select
          variant="outlined"
          labelId="carModelYear"
          value={selectedModel}
          label="Model"
          onChange={handelSelectedModelChange}
        >
          <MenuItem value="">
            <em>Select Model/Year</em>
          </MenuItem>
          {selectedClass !== '' &&
            _mercedesClasses
              .find((item) => item.class === selectedClass)
              .models.map((item) => (
                <MenuItem key={item.model} value={item.model}>
                  {item.model} - {item.productionYears}
                </MenuItem>
              ))}
        </Select>
      </FormControl>
    </Stack>
  );
}
