import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TextField from '@mui/material/TextField';
import { Stack, Button, FormControl } from '@mui/material';

import { rdxUpdateFilter } from 'src/redux/slices/products';

// ----------------------------------------------------------------------

export default function FilterPartInfo() {
  const dispatch = useDispatch();
  const partNumberRef = useRef('');
  const partNameRef = useRef('');
  const [partNoValue, setPartNoValue] = useState('');
  const [partNameValue, setPartNameValue] = useState('');
  const { partNo, partName } = useSelector((state) => state.products.filter);

  useEffect(() => {
    console.log('IM HERE');
    if (partNo === '') setPartNoValue('');
    if (partName === '') setPartNameValue('');
  }, [partName, partNo]);

  const onPartNoFindHandler = () => {
    dispatch(rdxUpdateFilter({ partNo: partNoValue }));
  };

  const onPartNameFindHandler = () => {
    dispatch(rdxUpdateFilter({ partName: partNameValue }));
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
      <FormControl variant="outlined" sx={{ width: '100%' }}>
        <TextField
          variant="outlined"
          onChange={(e) => setPartNameValue(e.target.value)}
          fullWidth
          label="Part Name"
          value={partNameValue}
          type="text"
          InputProps={{
            endAdornment: (
              <Button color="primary" variant="contained" onClick={onPartNameFindHandler}>
                Find
              </Button>
            ),
          }}
        />
      </FormControl>
    </Stack>
  );
}
