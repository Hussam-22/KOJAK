import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TextField from '@mui/material/TextField';
import { Stack, Button, FormControl } from '@mui/material';

import { rdxUpdateFilter } from 'src/redux/slices/products';

// ----------------------------------------------------------------------

export default function FilterPartInfo() {
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state.products);
  const [partNoValue, setPartNoValue] = useState(filter.partNo);

  // console.log(filter);

  useEffect(() => {
    if (
      filter.partName === '' &&
      filter.class === '' &&
      filter.model === '' &&
      filter.partNo === ''
    )
      setPartNoValue('');
  }, [filter]);

  const onPartNoFindHandler = () => {
    dispatch(rdxUpdateFilter({ partNo: partNoValue }));
  };

  return (
    <Stack spacing={2}>
      <FormControl variant="outlined" sx={{ width: '100%' }}>
        <TextField
          variant="outlined"
          onChange={(e) => setPartNoValue(e.target.value)}
          fullWidth
          label="Part Number"
          type="text"
          value={partNoValue}
          InputProps={{
            endAdornment: (
              <Button color="primary" variant="contained" onClick={onPartNoFindHandler}>
                Find
              </Button>
            ),
          }}
        />
      </FormControl>
    </Stack>
  );
}
