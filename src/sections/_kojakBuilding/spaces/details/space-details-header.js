import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';
import { fCurrency } from 'src/utils/format-number';

// ----------------------------------------------------------------------

export default function SpaceDetailsHeader({ spaceInfo }) {
  const { id, type, rent, city, location, buildingName, listingDate } = spaceInfo;

  const listingDateTime = new Date(listingDate.seconds * 1000).toDateString();

  return (
    <>
      <Typography variant="caption">{type}</Typography>
      <Stack
        spacing={3}
        direction="row"
        sx={{
          mb: 2,
        }}
      >
        <Typography variant="h3" component="h1" sx={{ flexGrow: 1, pr: { md: 10 } }}>
          {buildingName}
        </Typography>

        {/* <Stack direction="row" alignItems="center" flexShrink={0}>
          <Iconify icon="carbon:share" />
        </Stack> */}
      </Stack>

      <Stack spacing={3} direction={{ xs: 'column', md: 'row' }}>
        <Stack spacing={0.5} direction="row" alignItems="center">
          <Iconify icon="grommet-icons:money" sx={{ color: 'success.main' }} />

          <Box sx={{ typography: 'h6' }}>{fCurrency(rent)}</Box>
        </Stack>

        <Stack direction="row" alignItems="center" sx={{ typography: 'body2' }}>
          <Iconify icon="carbon:location" sx={{ mr: 0.5 }} /> {`${city} - ${location}`}
        </Stack>

        <Stack direction="row" alignItems="center" sx={{ typography: 'body2' }}>
          <Iconify icon="clarity:date-line" sx={{ mr: 0.5 }} /> {listingDateTime}
        </Stack>
      </Stack>
    </>
  );
}

SpaceDetailsHeader.propTypes = {
  spaceInfo: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    rent: PropTypes.number,
    city: PropTypes.string,
    location: PropTypes.string,
    buildingName: PropTypes.string,
    listingDate: PropTypes.object,
  }),
};
