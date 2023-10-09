import { useFormContext } from 'react-hook-form';
import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { LoadingButton } from '@mui/lab';
import TextField from '@mui/material/TextField';
import { Stack, Button, IconButton, FormControl } from '@mui/material';

import Iconify from 'src/components/iconify';
import { rdxClearFilter, rdxUpdateFilter } from 'src/redux/slices/products';

// ----------------------------------------------------------------------

export default function FilterPartInfo() {
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state.products);
  const [partNoValue, setPartNoValue] = useState(filter.partNo);
  const partNoRef = useRef();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (filter.class === '' && filter.model === '' && filter.partNo === '') setPartNoValue('');
  }, [filter]);

  useEffect(() => {
    if (filter.class !== '' && filter.model !== '') setPartNoValue('');
  }, [filter]);

  const onPartNoFindHandler = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    dispatch(rdxClearFilter());
    dispatch(rdxUpdateFilter({ partNo: partNoValue }));
    setLoading(false);
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
          inputRef={partNoRef}
          InputProps={{
            endAdornment: (
              <LoadingButton
                color="primary"
                onClick={onPartNoFindHandler}
                disabled={partNoRef?.current?.value === ''}
                loading={loading}
              >
                <Iconify icon="octicon:search-16" />
              </LoadingButton>
            ),
          }}
        />
      </FormControl>
    </Stack>
  );
}
