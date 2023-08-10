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

import { paths } from 'src/routes/paths';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { useAuthContext } from 'src/auth/hooks';
import { RouterLink } from 'src/routes/components';
import { fCurrency } from 'src/utils/format-number';
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
    features: { bedrooms, bathrooms, area },
  } = space;
  const navigate = useNavigate();
  const [coverImgURL, setCoverImgURL] = useState('');
  const { fsGetImgDownloadUrl } = useAuthContext();

  const listingDateTime = new Date(listingDate.seconds * 1000).toDateString();

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
        '&:hover': {
          boxShadow: (theme) => theme.customShadows.z24,
        },
        ...(vertical && {
          flexDirection: 'column',
        }),
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

      <Stack
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
                mr: 0.5,
              }}
            >
              {fCurrency(rentSale)}
            </Box>
          )}
          {isAvailable ? fCurrency(rent) : 'Not Available'}
        </Stack>
      </Stack>

      <Stack spacing={2} direction="column" sx={{ p: 2.5, flexGrow: 1 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {`${city} - ${location}`}
        </Typography>

        <Link component={RouterLink} href={paths.website.propertyDetails + id} color="inherit">
          {/* <Typography variant="h5" sx={{ flexGrow: 1, pr: { md: 10 } }}>
            {spaceType} - {description}
          </Typography> */}
          <TextMaxLine line={1} variant="h5" sx={{ flexGrow: 1, pr: { md: 10 } }}>
            {spaceType} - {description}
          </TextMaxLine>
        </Link>

        <Stack
          direction="row"
          spacing={2}
          divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
          sx={{ alignItems: 'center' }}
        >
          <Box>
            <Iconify icon="tabler:ruler-measure" width={18} sx={{ mr: 1 }} />
            {area}
          </Box>

          <Box sx={{ alignItems: 'center' }}>
            <Iconify icon="carbon:floorplan" width={18} sx={{ mr: 1 }} />
            {spaceType}
          </Box>

          {bedrooms !== 0 && (
            <Box sx={{ alignItems: 'center' }}>
              <Iconify icon="fluent:bed-24-regular" width={18} sx={{ mr: 1 }} />
              {bathrooms === 0 ? 'N/A' : `${bathrooms}`}
            </Box>
          )}

          {bathrooms !== 0 && (
            <Box sx={{ alignItems: 'center' }}>
              <Iconify icon="cil:shower" width={18} sx={{ mr: 1 }} />
              {bathrooms === 0 ? 'N/A' : `${bathrooms}`}
            </Box>
          )}
        </Stack>

        {/* <Divider sx={{ borderStyle: 'dashed' }} /> */}

        <Stack direction="row" alignItems="center">
          <Stack
            flexGrow={1}
            spacing={3}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ typography: 'body2', color: 'text.disabled' }}
          >
            <Typography variant="caption">Listed on: {listingDateTime}</Typography>
            <Box sx={{ flexGrow: 1, textAlign: 'right' }}>
              <Button variant="contained" color="secondary" onClick={openSpaceCard}>
                More details
              </Button>
            </Box>
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
    bucketID: PropTypes.string,
    coverImgID: PropTypes.string,
    listingDate: PropTypes.object,
    location: PropTypes.string,
    city: PropTypes.string,
    rent: PropTypes.number,
    rentSale: PropTypes.number,
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
