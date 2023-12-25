import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';
import { fNumber } from 'src/utils/format-number';

// ----------------------------------------------------------------------

export default function PropertyDetailsHeader({ spaceInfo }) {
  const { spaceType, description, city, location, rent, isActive } = spaceInfo;

  return (
    <Box>
      {isActive && (
        <Typography variant="h2" color="primary" sx={{ mb: 1 }}>
          {`AED ${fNumber(rent)}`}
        </Typography>
      )}
      {!isActive && (
        <Typography variant="h4" color="primary" sx={{ mb: 1 }}>
          Currently Not Available for Rent
        </Typography>
      )}
      <Stack spacing={1} direction={{ xs: 'column', md: 'row' }}>
        <Typography sx={{ textTransform: 'capitalize' }}>
          {`${spaceType} - ${description}`}
        </Typography>

        <Stack direction="row" alignItems="center" sx={{ typography: 'body2' }}>
          <Iconify icon="carbon:location" sx={{ mr: 0.5 }} />
          {location} - {city}
        </Stack>
      </Stack>
    </Box>
  );
}

PropertyDetailsHeader.propTypes = {
  spaceInfo: PropTypes.shape({
    spaceType: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    city: PropTypes.string,
    rent: PropTypes.number,
    isActive: PropTypes.bool,
  }),
};
