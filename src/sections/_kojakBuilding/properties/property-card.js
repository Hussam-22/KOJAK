import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { useLocales } from 'src/locales';
import Image from 'src/components/image';
import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { useAuthContext } from 'src/auth/hooks';
import { fNumber } from 'src/utils/format-number';
import { RouterLink } from 'src/routes/components';
import TextMaxLine from 'src/components/text-max-line/text-max-line';

// ----------------------------------------------------------------------

export default function PropertyCard({ space, vertical }) {
  const {
    id,
    bucketID,
    buildingName,
    city,
    location,
    rent,
    rentSale,
    listingDate,
    coverImgID,
    type,
    isAvailable,
    spaceType,
    description,
    descriptionAr,
    features: { bedrooms, bathrooms, area },
  } = space;
  const navigate = useNavigate();
  const [coverImgURL, setCoverImgURL] = useState('');
  const { fsGetImgDownloadUrl } = useAuthContext();
  const { translate, currentLang } = useLocales();

  const descriptionValue = currentLang.value === 'ar' ? descriptionAr?.ar || '' : description;

  useEffect(() => {
    (async () => {
      if (bucketID !== '') setCoverImgURL(await fsGetImgDownloadUrl(bucketID, coverImgID));
    })();
  }, [coverImgID, fsGetImgDownloadUrl, bucketID]);

  const openSpaceCard = () => {
    navigate(paths.website.propertyDetails + id);
  };

  return (
    <Card
      sx={{
        display: { sm: 'flex' },
        ...(vertical && {
          flexDirection: 'column',
        }),
        borderRadius: 1,
      }}
    >
      <Box sx={{ flexShrink: { sm: 0 } }}>
        <Image
          alt={buildingName}
          src={coverImgURL === '' ? '/assets/kojak-building/no_preview.jpg' : coverImgURL}
          ratio="4/3"
          sx={{
            height: 1,
            objectFit: 'cover',
            width: { sm: 240, xs: 1 },
            ...(vertical && {
              width: { xs: 1 },
            }),
            filter: !isAvailable && 'grayscale(1) blur(1px)',
          }}
        />
      </Box>

      {/* <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          pt: 1.5,
          pl: 2,
          pr: 1.5,
          top: 0,
          width: 1,
          zIndex: 9,
          position: 'absolute',
        }}
      >
         <Stack
          spacing={0.5}
          direction="row"
          sx={{
            px: 1,
            borderRadius: 0.75,
            typography: 'h5',
            bgcolor: 'primary.main',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
          }}
        >
          {rentSale > 0 && (
            <Box
              sx={{
                color: 'grey.200',
                textDecoration: 'line-through',
                mx: 0.5,
              }}
            >
              {fNumber(rentSale)}
            </Box>
          )}
          {isAvailable ? `${rent} AED` : 'Not Available'}
        </Stack> 
      </Stack> */}

      <Stack spacing={2} direction="column" sx={{ p: 2.5, flexGrow: 1 }}>
        <Typography variant="body2">
          {translate(`propertyCard.${city.toLowerCase()}`)} {` - ${location}`}
        </Typography>

        <Link component={RouterLink} href={paths.website.propertyDetails + id} color="inherit">
          <TextMaxLine line={1} variant="h6">
            {descriptionValue === '' ? translate('propertyCard.noDesc') : descriptionValue}
          </TextMaxLine>
        </Link>

        <Stack
          direction="row"
          spacing={2}
          divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
          sx={{ alignItems: 'center' }}
        >
          <Typography variant="caption">
            <Iconify icon="tabler:ruler-measure" width={14} sx={{ mx: 1 }} />
            {area}
          </Typography>

          <Typography variant="caption">
            <Iconify icon="carbon:floorplan" width={14} sx={{ mx: 1 }} />
            {translate(`propertyCard.${spaceType.toLowerCase().replaceAll(' ', '')}`)}
          </Typography>

          {/* {bedrooms !== 0 && (
            <Typography variant="caption">
              <Iconify icon="fluent:bed-24-regular" width={14} sx={{ mx: 1 }} />
              {bedrooms}
            </Typography>
          )}

          {bathrooms !== 0 && (
            <Typography variant="caption">
              <Iconify icon="cil:shower" width={14} sx={{ mx: 1 }} />
              {bathrooms}
            </Typography>
          )} */}
        </Stack>

        {/* <Divider sx={{ borderStyle: 'dashed' }} /> */}

        <Stack direction="row" alignItems="center">
          <Stack
            flexGrow={1}
            spacing={3}
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            sx={{ typography: 'body2', color: 'text.disabled' }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <Button variant="contained" color="secondary" onClick={openSpaceCard}>
                {translate('common.moreDetails')}
              </Button>
            </Box>
            <Typography variant="h6" color="primary">
              {rent.length > 7
                ? `${translate('common.aed')}${rent}`
                : `${translate('common.aed')} ${fNumber(rent)}`}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}

PropertyCard.propTypes = {
  vertical: PropTypes.bool,
  space: PropTypes.shape({
    id: PropTypes.string,
    spaceType: PropTypes.string,
    description: PropTypes.string,
    descriptionAr: PropTypes.object,
    bucketID: PropTypes.string,
    coverImgID: PropTypes.string,
    listingDate: PropTypes.object,
    location: PropTypes.string,
    city: PropTypes.string,
    rent: PropTypes.any,
    rentSale: PropTypes.any,
    buildingName: PropTypes.string,
    type: PropTypes.string,
    isAvailable: PropTypes.bool,

    features: PropTypes.shape({
      bedrooms: PropTypes.number,
      bathrooms: PropTypes.number,
      area: PropTypes.string,
    }),
  }),
};
