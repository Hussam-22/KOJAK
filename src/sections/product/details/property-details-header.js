import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useLocales } from 'src/locales';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function PropertyDetailsHeader({ spaceInfo }) {
  const {
    id,
    type,
    spaceType,
    rent,
    city,
    location,
    description,
    descriptionAr,
    listingDate,
    isAvailable,
    features: { bedrooms },
  } = spaceInfo;
  const listingDateTime = new Date(listingDate.seconds * 1000).toDateString();
  const { translate, currentLang } = useLocales();

  const descriptionValue = currentLang.value === 'ar' ? descriptionAr?.ar || '' : description || '';

  return (
    <>
      <Typography variant="caption" sx={{ textTransform: 'capitalize' }}>
        {`${translate(`propertyCard.${type}`)} - ${descriptionValue}`}
      </Typography>
      <Stack
        spacing={3}
        direction="row"
        sx={{
          mb: 2,
        }}
      >
        {/* <Typography variant="h3" component="h1" sx={{ flexGrow: 1, pr: { md: 10 } }}>
          {translate(`propertyCard.${spaceType.toLowerCase()}`)} - {description}
        </Typography> */}
      </Stack>

      <Stack spacing={3} direction={{ xs: 'column', md: 'row' }}>
        <Stack spacing={0.5} direction="row" alignItems="center">
          <Iconify icon="grommet-icons:money" sx={{ color: 'success.main' }} />

          {isAvailable && (
            <Box sx={{ typography: 'h6' }}>
              {translate('common.aed')} {rent}
            </Box>
          )}
          {!isAvailable && (
            <Box sx={{ typography: 'h6' }}>{translate(`propertyCard.notAvailable`)}</Box>
          )}
        </Stack>

        <Stack direction="row" alignItems="center" sx={{ typography: 'body2' }}>
          <Iconify icon="carbon:location" sx={{ mr: 0.5 }} />
          {translate(`propertyCard.${city.toLowerCase()}`)} - {location}
        </Stack>

        <Stack direction="row" alignItems="center" sx={{ typography: 'body2' }}>
          <Iconify icon="clarity:date-line" sx={{ mr: 0.5 }} /> {listingDateTime}
        </Stack>
      </Stack>
    </>
  );
}

PropertyDetailsHeader.propTypes = {
  spaceInfo: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    spaceType: PropTypes.string,
    rent: PropTypes.any,
    city: PropTypes.string,
    location: PropTypes.string,
    description: PropTypes.string,
    descriptionAr: PropTypes.object,
    listingDate: PropTypes.object,
    isAvailable: PropTypes.bool,

    features: PropTypes.shape({
      bedrooms: PropTypes.number,
      bathrooms: PropTypes.number,
      area: PropTypes.string,
    }),
  }),
};
