import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { useLocales } from 'src/locales';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function PropertyDetailsSummary({ spaceInfo }) {
  const {
    spaceType,
    totalArea,
    bedrooms,
    bathrooms,
    kitchens,
    acType,
    paymentTerms,
    isActive,
    parking,
    cctv,
    security,
    healthClub,
    isCommercial,
  } = spaceInfo;

  const { translate } = useLocales();

  return (
    <Stack spacing={5}>
      <Stack spacing={3}>
        <Typography variant="h5">{translate('propertyCard.propertyFeatures')}</Typography>
        <Box
          sx={{
            rowGap: 2.5,
            columnGap: 3,
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
          }}
        >
          <OverviewItem icon="tabler:ruler-measure" label="Total Area" text={`${totalArea} sqft`} />
          <OverviewItem icon="carbon:floorplan" label="Space Type" text={spaceType} />
          <OverviewItem icon="iconoir:air-conditioner" label="AC Type" text={acType} />

          {bedrooms !== 0 && (
            <OverviewItem icon="fluent:bed-24-regular" label="Bedrooms" text={bedrooms} />
          )}
          {bathrooms !== 0 && (
            <OverviewItem icon="cil:shower" label="Bathrooms" text={`${bathrooms}`} />
          )}
          {kitchens !== 0 && (
            <OverviewItem icon="tabler:tools-kitchen-2" label="Kitchen" text={kitchens} />
          )}

          <OverviewItem
            icon="tabler:parking"
            label={translate('propertyCard.parking')}
            text={parking ? 'Available' : 'Not Available'}
          />

          <OverviewItem icon="bx:cctv" label="CCTV" text={cctv ? 'Available' : 'Not Available'} />

          <OverviewItem
            icon="healthicons:security-worker-outline"
            label="Security"
            text={security ? 'Available' : 'Not Available'}
          />

          <OverviewItem
            icon="iconoir:gym"
            label="GYM / Health Club"
            text={healthClub ? 'Available' : 'Not Available'}
          />

          <OverviewItem
            icon="material-symbols:payments-outline"
            label="Payment Terms"
            text={`${paymentTerms}`}
          />
        </Box>
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      {
        <Stack spacing={4}>
          <Stack>
            <Typography variant="h5">
              {translate('propertyCard.summery.maintenance.title')}
            </Typography>
            <Typography>{translate('propertyCard.summery.maintenance.text')}</Typography>
          </Stack>

          <Stack>
            <Typography variant="h5">
              {' '}
              {translate('propertyCard.summery.security.title')}
            </Typography>
            <Typography>{translate('propertyCard.summery.security.text')}</Typography>
          </Stack>

          <Stack>
            <Typography variant="h5"> {translate('propertyCard.summery.payment.title')}</Typography>
            <Typography>{translate('propertyCard.summery.payment.text')}</Typography>
          </Stack>

          {/* <Stack>
            <Typography variant="h5"> {translate('propertyCard.summery.spaces.title')}</Typography>
            <Typography>{translate('propertyCard.summery.spaces.text')}</Typography>
          </Stack> */}

          <Stack>
            <Typography variant="h5">
              {' '}
              {translate('propertyCard.summery.locations.title')}
            </Typography>
            <Typography>{translate('propertyCard.summery.locations.text')}</Typography>
          </Stack>
        </Stack>
      }
    </Stack>
  );
}

PropertyDetailsSummary.propTypes = {
  spaceInfo: PropTypes.shape({
    spaceType: PropTypes.string,
    description: PropTypes.string,
    city: PropTypes.string,
    location: PropTypes.string,
    totalArea: PropTypes.string,
    bedrooms: PropTypes.number,
    bathrooms: PropTypes.number,
    kitchens: PropTypes.number,
    acType: PropTypes.string,
    rent: PropTypes.number,
    paymentTerms: PropTypes.string,
    isFeatured: PropTypes.bool,
    isActive: PropTypes.bool,
    parking: PropTypes.bool,
    cctv: PropTypes.bool,
    security: PropTypes.bool,
    healthClub: PropTypes.bool,
    isCommercial: PropTypes.bool,
  }),
};

// ----------------------------------------------------------------------

function OverviewItem({ icon, label, text = '-' }) {
  const theme = useTheme();
  return (
    <Stack spacing={1.5} direction="row" alignItems="flex-start">
      <Iconify icon={icon} width={24} />
      <Stack spacing={0.5}>
        <Typography
          variant="body2"
          sx={{ color: 'text.secondary', fontWeight: theme.typography.fontWeightLight }}
        >
          {label}
        </Typography>
        <Typography>{text}</Typography>
      </Stack>
    </Stack>
  );
}

OverviewItem.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  label: PropTypes.string,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

// ----------------------------------------------------------------------

function HighlightItem({ label, text }) {
  return (
    <Stack spacing={1}>
      <Typography
        variant="subtitle1"
        sx={{ color: 'primary.main', display: 'flex', alignItems: 'center' }}
      >
        <Box
          component="span"
          sx={{
            width: 12,
            height: 2,
            borderRadius: 1,
            bgcolor: 'currentColor',
            mr: 1.5,
          }}
        />
        {label}
      </Typography>
      <Typography>{text}</Typography>
    </Stack>
  );
}

HighlightItem.propTypes = {
  label: PropTypes.string,
  text: PropTypes.string,
};
