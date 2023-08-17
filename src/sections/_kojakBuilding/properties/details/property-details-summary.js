import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { useLocales } from 'src/locales';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function PropertyDetailsSummary({ spaceFeatures, spaceType, hideSummery = false }) {
  const {
    area,
    bedrooms,
    bathrooms,
    ac,
    parking,
    cctv,
    security,
    healthClub,
    chequesNo,
    mezzanine,
    kitchen = 0,
  } = spaceFeatures;

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
          <OverviewItem
            icon="tabler:ruler-measure"
            label={translate('propertyCard.totalArea')}
            text={`${area} sqft`}
          />
          <OverviewItem
            icon="carbon:floorplan"
            label={translate('propertyCard.spaceType')}
            text={translate(`propertyCard.${spaceType.toLowerCase()}`)}
          />
          {bedrooms !== 0 && (
            <OverviewItem
              icon="fluent:bed-24-regular"
              label={translate('propertyCard.bedrooms')}
              text={bedrooms}
            />
          )}
          {bathrooms !== 0 && (
            <OverviewItem
              icon="cil:shower"
              label={translate('propertyCard.bathrooms')}
              text={`${bathrooms}`}
            />
          )}
          {kitchen !== 0 && (
            <OverviewItem
              icon="tabler:tools-kitchen-2"
              label={translate('propertyCard.kitchen')}
              text={kitchen}
            />
          )}
          {mezzanine && (
            <OverviewItem
              icon="lucide:m-square"
              label={translate('propertyCard.mezzanine')}
              text={translate('propertyCard.available')}
            />
          )}

          <OverviewItem
            icon="iconoir:air-conditioner"
            label={translate('propertyCard.ac')}
            text={ac}
          />

          <OverviewItem
            icon="tabler:parking"
            label={translate('propertyCard.parking')}
            text={parking === 0 ? translate('propertyCard.notAvailable') : `${parking}`}
          />

          <OverviewItem
            icon="bx:cctv"
            label={translate('propertyCard.cctv')}
            text={
              cctv === true
                ? translate('propertyCard.available')
                : translate('propertyCard.notAvailable')
            }
          />

          <OverviewItem
            icon="healthicons:security-worker-outline"
            label={translate('propertyCard.security')}
            text={
              security === true
                ? translate('propertyCard.available')
                : translate('propertyCard.notAvailable')
            }
          />

          <OverviewItem
            icon="iconoir:gym"
            label={translate('propertyCard.gym')}
            text={
              healthClub === true
                ? translate('propertyCard.available')
                : translate('propertyCard.notAvailable')
            }
          />

          <OverviewItem
            icon="material-symbols:payments-outline"
            label={translate('propertyCard.payment')}
            text={`${chequesNo} ${translate('propertyCard.cheques')}`}
          />
        </Box>
      </Stack>

      {!hideSummery && <Divider sx={{ borderStyle: 'dashed' }} />}

      {!hideSummery && (
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

          <Stack>
            <Typography variant="h5"> {translate('propertyCard.summery.spaces.title')}</Typography>
            <Typography>{translate('propertyCard.summery.spaces.text')}</Typography>
          </Stack>

          <Stack>
            <Typography variant="h5">
              {' '}
              {translate('propertyCard.summery.locations.title')}
            </Typography>
            <Typography>{translate('propertyCard.summery.locations.text')}</Typography>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}

PropertyDetailsSummary.propTypes = {
  spaceType: PropTypes.string,
  hideSummery: PropTypes.bool,
  spaceFeatures: PropTypes.shape({
    area: PropTypes.string,
    bedrooms: PropTypes.number,
    bathrooms: PropTypes.number,
    ac: PropTypes.string,
    parking: PropTypes.number,
    kitchen: PropTypes.number,
    cctv: PropTypes.bool,
    security: PropTypes.bool,
    healthClub: PropTypes.bool,
    mezzanine: PropTypes.bool,
    chequesNo: PropTypes.string,
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
