import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box, alpha, Stack, Button, Divider, useTheme, Container, Typography } from '@mui/material';

import { useLocales } from 'src/locales';
import Iconify from 'src/components/iconify';
import Image from 'src/components/image/Image';
import { useAuthContext } from 'src/auth/hooks';
import { rdxAddFeaturedProperty } from 'src/redux/slices/siteStore';

function FeaturedProperty() {
  const dispatch = useDispatch();
  const { fsGetFeaturedProperty, fsGetImgDownloadUrl } = useAuthContext();
  const { featuredProperty } = useSelector((state) => state.siteStore);
  const [coverUrlOne, setCoverUrlOne] = useState('');
  const [coverUrlTwo, setCoverUrlTwo] = useState('');

  useEffect(() => {
    (async () => {
      dispatch(rdxAddFeaturedProperty(await fsGetFeaturedProperty()));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {
      if (featuredProperty.id)
        setCoverUrlOne(
          await fsGetImgDownloadUrl('kojak-building', featuredProperty.bucketID, 1, '800x800')
        );
      setCoverUrlTwo(
        await fsGetImgDownloadUrl('kojak-building', featuredProperty.bucketID, 2, '800x800')
      );
    })();
  }, [featuredProperty.bucketID, featuredProperty.id, fsGetImgDownloadUrl]);

  return (
    <>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Image src={coverUrlOne} ratio="21/9" sx={{ borderRadius: 1 }} />
        <Image src={coverUrlTwo} ratio="21/9" sx={{ borderRadius: 1 }} />
      </Stack>
      {featuredProperty.id && (
        <PropertyDetailsSummary
          description={featuredProperty.description}
          rent={featuredProperty.rent}
          spaceFeatures={featuredProperty.features}
          spaceType={featuredProperty.spaceType}
          hideSummery
        />
      )}
    </>
  );
}
export default FeaturedProperty;
// Property.propTypes = { tables: PropTypes.array };

// ----------------------------------------------------------------------------
function PropertyDetailsSummary({
  description,
  rent,
  spaceFeatures,
  spaceType,
  hideSummery = false,
}) {
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
        <Typography variant="h5">{`${description} - ${rent} AED `}</Typography>
        <Box
          sx={{
            rowGap: 2.5,
            columnGap: 3,
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              md: 'repeat(5, 1fr)',
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
            text={translate(`propertyCard.${spaceType.toLowerCase().replace(' ', '')}`)}
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
      )}
    </Stack>
  );
}

PropertyDetailsSummary.propTypes = {
  description: PropTypes.string,
  rent: PropTypes.string,
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
        <Typography variant="h6" sx={{ color: 'grey.400' }}>
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
