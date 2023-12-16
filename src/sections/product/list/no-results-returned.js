import PropTypes from 'prop-types';

import { Box, Stack, Typography } from '@mui/material';

import SvgColor from 'src/components/svg-color/svg-color';

function NoResultsReturned({ text, illustration, color }) {
  return (
    <Box sx={{ py: 2 }}>
      <Stack alignItems="center" textAlign="center">
        <SvgColor src={illustration} sx={{ width: 200, height: 200 }} />
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
