import { m } from 'framer-motion';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';

import { Masonry } from '@mui/lab';
import { useTheme } from '@mui/system';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Box, Stack, Button, Unstable_Grid2 as Grid } from '@mui/material';

import Image from 'src/components/image/Image';
import Iconify from 'src/components/iconify/Iconify';
import { useResponsive } from 'src/hooks/use-responsive';
import { varFade, MotionViewport } from 'src/components/animate';

const IMAGES = [
  'https://firebasestorage.googleapis.com/v0/b/kojak-building/o/C1001-1%2F7_800x800.webp?alt=media&token=61abc91b-8c56-41fd-b155-ccdea058eb9b',
  'https://firebasestorage.googleapis.com/v0/b/kojak-building/o/C1001-1%2F0_800x800.webp?alt=media&token=c0c61571-7806-445f-88b7-1bb1fccf1e1e',
  'https://firebasestorage.googleapis.com/v0/b/kojak-building/o/C1001-1%2F2_800x800.webp?alt=media&token=80fbc453-f963-43f3-958c-ea7bb8957558',
  'https://firebasestorage.googleapis.com/v0/b/kojak-building/o/C1001-1%2F14_800x800.webp?alt=media&token=04f8f006-3c7f-43bd-9fee-0f880ae8f736',
  'https://firebasestorage.googleapis.com/v0/b/kojak-building/o/C1001-1%2F8_800x800.webp?alt=media&token=d8d0e537-2ffe-48e8-a4cb-9b4eff691793',
];

export default function FeaturedProperty() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMdUp = useResponsive('up', 'md');

  return (
    <Box
      sx={{
        background: `linear-gradient(180deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.darker} 100%)`,
        overflow: 'hidden',
      }}
    >
      <MotionViewport disableAnimatedMobile>
        <Container
          sx={{
            py: 10,
            textAlign: { md: 'left', xs: 'center' },
          }}
          component={m.div}
          variants={varFade().inRight}
          maxWidth="xl"
        >
          <Typography variant="h2" sx={{ color: 'common.white', mb: 3 }}>
            Hot Deal Property
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: 'common.white', fontWeight: theme.typography.fontWeightLight }}
          >
            Expand your business with 5000 sqft at our commercial shop space in Motor City, Dubai
          </Typography>

          {!isMdUp && (
            <Box
              sx={{
                boxShadow: `8px 8px 0 0 ${theme.palette.common.black}`,
                borderRadius: 1,
                mt: 4,
              }}
            >
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/kojak-building/o/C1001-1%2F7_800x800.webp?alt=media&token=61abc91b-8c56-41fd-b155-ccdea058eb9b"
                alt="property-img-1"
                ratio="4/3"
                sx={{ borderRadius: 1 }}
              />
            </Box>
          )}

          <Grid container columnSpacing={12}>
            <Grid md={6} xs={12}>
              <Box
                sx={{
                  rowGap: 2.5,
                  columnGap: 3,
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                  },
                  my: 6,
                }}
              >
                <OverviewItem icon="icomoon-free:office" label="Type" text="Commercial" />
                <OverviewItem icon="carbon:location" label="Location" text="Dubai, Motor City" />
                <OverviewItem icon="tabler:ruler-measure" label="Total Area" text="5000 sqft" />
                {/* <OverviewItem icon="mdi:tape-measure" label="Rent per sq Ft" text="300/AED" /> */}
                <OverviewItem icon="carbon:floorplan" label="Layout" text="Shops" />
                <OverviewItem icon="iconoir:air-conditioner" label="AC Type" text="Emicool" />
                <OverviewItem icon="tabler:parking" label="Parking" text="100 Open Space" />
                <OverviewItem icon="bx:cctv" label="CCTV" text="Available" />
                <OverviewItem
                  icon="healthicons:security-worker-outline"
                  label="Security"
                  text="Available"
                />
                <OverviewItem
                  icon="material-symbols:payments-outline"
                  label="Payment Terms"
                  text="4-6 Cheques"
                />
              </Box>
              <Button
                variant="contained"
                size="large"
                sx={{ backgroundColor: 'common.white', color: 'primary.main' }}
                onClick={() => navigate('/properties/C1001-1')}
              >
                Contact our agent
              </Button>
            </Grid>
            {isMdUp && (
              <Grid md={6} xs={12} sx={{ my: 6, zIndex: 9 }}>
                <Masonry columns={{ xs: 1, md: 2 }} spacing={3}>
                  {IMAGES.map((url, index) => (
                    <Image
                      key={index}
                      src={url}
                      // ratio="4/3"
                      sx={{
                        borderRadius: 1,
                        boxShadow: `8px 8px 0 0 ${theme.palette.common.black}`,
                      }}
                    />
                  ))}
                </Masonry>
              </Grid>
            )}
          </Grid>
        </Container>
      </MotionViewport>
    </Box>
  );
}

// ----------------------------------------------------------------------

function OverviewItem({ icon, label, text = '-' }) {
  const theme = useTheme();
  const isMdUp = useResponsive('up', 'md');

  return (
    <Box
      sx={{
        border: `solid 2px ${theme.palette.primary.main}`,
        p: isMdUp ? 3 : 1.5,
        borderRadius: 2,
      }}
    >
      <Stack spacing={1.5} direction="column" alignItems="center">
        <Iconify icon={icon} width={isMdUp ? 65 : 32} color="common.white" />
        <Typography sx={{ color: 'common.white', typography: { md: 'h5', xs: 'body1' } }}>
          {label}
        </Typography>
        <Typography sx={{ color: 'common.white', typography: { md: 'h5', xs: 'body1' } }}>
          {text}
        </Typography>
      </Stack>
    </Box>
  );
}

OverviewItem.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  label: PropTypes.string,
  text: PropTypes.string,
};
