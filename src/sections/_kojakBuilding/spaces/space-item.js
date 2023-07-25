import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import Image from 'src/components/image';
import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';
import { fCurrency } from 'src/utils/format-number';

// ----------------------------------------------------------------------

export default function SpaceItem({ space }) {
  const { id, slug, location, rent, priceSale, datePosted, gallery, bed, bath, size } = space;
  const navigate = useNavigate();

  const openSpaceCard = () => {
    navigate(paths.building.spaceView + id);
  };

  return (
    <Card sx={{ borderRadius: 1 }}>
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
            bgcolor: 'custom.bluishPurpleDark',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
          }}
        >
          {priceSale > 0 && (
            <Box
              sx={{
                color: 'grey.200',
                textDecoration: 'line-through',
                mr: 0.5,
              }}
            >
              {fCurrency(priceSale)}
            </Box>
          )}
          {fCurrency(rent)}
        </Stack>
      </Stack>

      <Image alt={slug} src={gallery[0]} ratio="4/3" />

      <Stack spacing={2} sx={{ p: 2.5 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {location}
        </Typography>

        <Link component={RouterLink} href={paths.building.spaceView + id} color="inherit">
          <Typography variant="h6">{`${bed} Bedroom - ${slug}`}</Typography>
        </Link>

        <Stack
          direction="row"
          spacing={2}
          divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
          sx={{ alignItems: 'center' }}
        >
          <Box>
            <Iconify icon="carbon:floorplan" width={18} sx={{ mr: 1 }} />
            {size}
          </Box>

          <Box sx={{ alignItems: 'center' }}>
            <Iconify icon="fluent:bed-24-regular" width={18} sx={{ mr: 1 }} />
            {bed}
          </Box>

          <Box sx={{ alignItems: 'center' }}>
            <Iconify icon="cil:shower" width={18} sx={{ mr: 1 }} />
            {bath}
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
            <Iconify icon="ph:calendar-light" width={16} sx={{ mr: 1 }} /> {datePosted}
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
    gallery: PropTypes.array,
    datePosted: PropTypes.string,
    location: PropTypes.string,
    rent: PropTypes.number,
    priceSale: PropTypes.number,
    slug: PropTypes.string,
    bed: PropTypes.number,
    bath: PropTypes.number,
    size: PropTypes.string,
  }),
};
