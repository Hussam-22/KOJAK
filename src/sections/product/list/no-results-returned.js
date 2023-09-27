import PropTypes from 'prop-types';

import { Box, Stack, Button, Container, Typography } from '@mui/material';

import Image from 'src/components/image/Image';

function NoResultsReturned() {
  return (
    <Box sx={{ py: 2 }}>
      <Stack alignItems="center">
        <Image src="/assets/illustrations/no-results.svg" width={128} height={128} />
        <Typography variant="h2">No Spare Parts Where Found !!</Typography>
      </Stack>
    </Box>
  );
}
export default NoResultsReturned;
// NoResultsReturned.propTypes = { tables: PropTypes.array };
