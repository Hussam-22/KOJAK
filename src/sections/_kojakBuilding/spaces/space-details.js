import { useEffect } from 'react';
import { useParams } from 'react-router';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { _tours, _socials } from 'src/_mock';
import { useBoolean } from 'src/hooks/use-boolean';
import { SplashScreen } from 'src/components/loading-screen';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import SpaceDetailsHeader from 'src/sections/_kojakBuilding/spaces/details/space-details-header';
import SpaceDetailsSummary from 'src/sections/_kojakBuilding/spaces/details/space-details-summary';
import SpaceDetailsGallery from 'src/sections/_kojakBuilding/spaces/details/space-details-gallery';
import SpaceDetailsContactForm from 'src/sections/_kojakBuilding/spaces/details/space-details-contact-form';

const _mockTour = _tours[0];

const _mockSpace = {
  gallery: [
    'https://images.pexels.com/photos/2462015/pexels-photo-2462015.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=1600',
  ],
};

export default function SpaceDetails() {
  const { spaceId } = useParams();
  const loading = useBoolean(true);
  console.log(_mockSpace);

  useEffect(() => {
    const fakeLoading = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      loading.onFalse();
    };
    fakeLoading();
  }, [loading]);

  if (loading.value) {
    return <SplashScreen />;
  }

  return (
    <Container sx={{ overflow: 'hidden' }}>
      <CustomBreadcrumbs
        links={[
          { name: 'Home', href: '/' },
          { name: 'Tours', href: paths.travel.tours },
          { name: _mockTour.slug },
        ]}
        sx={{ mt: 3, mb: 5 }}
      />

      <SpaceDetailsGallery images={_mockSpace.gallery} />

      <Grid container columnSpacing={8} rowSpacing={5} direction="row-reverse">
        <Grid xs={12} md={5} lg={4}>
          <SpaceDetailsContactForm tour={_mockTour} />
        </Grid>

        <Grid xs={12} md={7} lg={8}>
          <SpaceDetailsHeader tour={_mockTour} />

          <Divider sx={{ borderStyle: 'dashed', my: 5 }} />

          <SpaceDetailsSummary tour={_mockTour} />

          <Stack direction="row" flexWrap="wrap" sx={{ mt: 5 }}>
            <Typography variant="subtitle2" sx={{ mt: 0.75, mr: 1.5 }}>
              Share:
            </Typography>

            <Stack direction="row" alignItems="center" flexWrap="wrap">
              {_socials.map((social) => (
                <Button
                  key={social.value}
                  size="small"
                  variant="outlined"
                  startIcon={<Iconify icon={social.icon} />}
                  sx={{
                    m: 0.5,
                    flexShrink: 0,
                    color: social.color,
                    borderColor: social.color,
                    '&:hover': {
                      borderColor: social.color,
                      bgcolor: alpha(social.color, 0.08),
                    },
                  }}
                >
                  {social.label}
                </Button>
              ))}
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
