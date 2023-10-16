import PropTypes from 'prop-types';

import { Box, Stack, Button, Container, Typography } from '@mui/material';

import Image from 'src/components/image/Image';

function NoResultsReturned({ text, illustration, color }) {
  return (
    <Box sx={{ py: 2 }}>
      <Stack alignItems="center" textAlign="center">
        <Image src={illustration} width="15%" height="15%" />
        <Typography variant="h2" sx={{ color }}>
          {text}
        </Typography>
      </Stack>
    </Box>
  );
}
export default NoResultsReturned;

NoResultsReturned.propTypes = {
  text: PropTypes.string,
  illustration: PropTypes.string,
  color: PropTypes.string,
};
