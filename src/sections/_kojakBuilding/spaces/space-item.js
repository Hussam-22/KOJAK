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

// ----------------------------------------------------------------------

export default function SpaceItem({ space }) {
  const {
    id,
    buildingName,
    location,
    rent,
    rentSale,
    listingDate,
    coverImgID,
    features: { bedrooms, bathrooms, area },
  } = space;
  const navigate = useNavigate();
  const [coverImgURL, setCoverImgURL] = useState('');
  const { fsGetImgDownloadUrl } = useAuthContext();

  console.log(bedrooms);

  const listingDateTime = new Date(listingDate.seconds * 1000).toDateString();

  useEffect(() => {
    (async () => {
      setCoverImgURL(await fsGetImgDownloadUrl(id, coverImgID));
    })();
  }, [coverImgID, fsGetImgDownloadUrl, id]);

  const openSpaceCard = () => {
    navigate(paths.building.spaceView + id);
  };

  return (
    <Card sx={{ borderRadius: 1, display: 'flex', flexDirection: 'column' }}>
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
            typography: 'subtitle2',
            bgcolor: 'secondary.main',
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
          {fCurrency(rent)}
        </Stack>
      </Stack>

      <Image alt={buildingName} src={coverImgURL} ratio="4/3" />

      <Stack spacing={2} direction="column" sx={{ p: 2.5, flexGrow: 1 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {location}
        </Typography>

        <Link component={RouterLink} href={paths.building.spaceView + id} color="inherit">
          <Typography variant="h6">
            {bedrooms !== 0 ? `${bedrooms} Bedroom - ${buildingName}` : buildingName}
          </Typography>
        </Link>

        <Stack
          direction="row"
          spacing={2}
          divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
          sx={{ alignItems: 'center' }}
        >
          <Box>
            <Iconify icon="carbon:floorplan" width={18} sx={{ mr: 1 }} />
            {area}
          </Box>

          <Box sx={{ alignItems: 'center' }}>
            <Iconify icon="fluent:bed-24-regular" width={18} sx={{ mr: 1 }} />
            {bedrooms === 0 ? 'N/A' : `${bedrooms}`}
          </Box>

          <Box sx={{ alignItems: 'center' }}>
            <Iconify icon="cil:shower" width={18} sx={{ mr: 1 }} />
            {bathrooms === 0 ? 'N/A' : `${bathrooms}`}
          </Box>
        </Stack>
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Stack direction="row" alignItems="center" sx={{ p: 2.5 }}>
        <Stack
          flexGrow={1}
          spacing={3}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
          sx={{ typography: 'body2', color: 'text.disabled' }}
        >
          <Box>
            <Iconify icon="ph:calendar-light" width={16} sx={{ mr: 1 }} /> {listingDateTime}
          </Box>
          <Box>
            <Button variant="contained" color="secondary" onClick={openSpaceCard}>
              More details
            </Button>
          </Box>
        </Stack>
      </Stack>
    </Card>
  );
}

SpaceItem.propTypes = {
  space: PropTypes.shape({
    id: PropTypes.string,
    coverImgID: PropTypes.string,
    listingDate: PropTypes.object,
    location: PropTypes.string,
    rent: PropTypes.number,
    rentSale: PropTypes.number,
    buildingName: PropTypes.string,

    features: PropTypes.shape({
      bedrooms: PropTypes.number,
      bathrooms: PropTypes.number,
      area: PropTypes.string,
    }),
  }),
};
