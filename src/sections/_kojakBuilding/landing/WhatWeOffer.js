import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Stack, Unstable_Grid2 as Grid } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';
import SpaceItem from 'src/sections/_kojakBuilding/spaces/space-item';

// ----------------------------------------------------------------------

const RESIDENTIAL = [
  {
    id: 'R-1',
    coverUrl:
      'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1600',
    rent: 33000,
    bed: 3,
    bath: 3,
    size: '1200 sqft',
    location: 'Sharjah - Al Qasimeyah',
    datePosted: new Date().toDateString(),
    slug: '3 Bedroom - The ACE Tower',
  },
  {
    id: 'R-2',
    coverUrl:
      'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=1600',
    rent: 29000,
    bed: 2,
    bath: 2,
    size: '1000 sqft',
    location: 'Dubai - Motor City',
    datePosted: new Date().toDateString(),
    slug: '3 Bedroom - The White Tower',
  },
  {
    id: 'R-3',
    coverUrl:
      'https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg?auto=compress&cs=tinysrgb&w=1600',
    rent: 25000,
    bed: 1,
    bath: 1,
    size: '800 sqft',
    location: 'Sharjah - Taawoun',
    datePosted: new Date().toDateString(),
    slug: '3 Bedroom - The Address Tower',
  },
  {
    id: 'R-4',
    coverUrl:
      'https://images.pexels.com/photos/2089698/pexels-photo-2089698.jpeg?auto=compress&cs=tinysrgb&w=1600',
    rent: 33000,
    bed: 3,
    bath: 2,
    size: '1200 sqft',
    location: 'Sharjah - Buhairah',
    datePosted: new Date().toDateString(),
    priceSale: 31000,
    slug: '3 Bedroom - The Point Tower',
  },
];

const COMMERCIAL = [
  {
    id: 'R-1',
    coverUrl:
      'https://images.pexels.com/photos/17105610/pexels-photo-17105610/free-photo-of-hedge-along-white-house-wall.jpeg?auto=compress&cs=tinysrgb&w=1600',
    rent: 33000,
    bed: 3,
    bath: 3,
    size: '1200 sqft',
    location: 'Sharjah - Al Qasimeyah',
    datePosted: new Date().toDateString(),
    slug: '3 Bedroom - The ACE Tower',
  },
  {
    id: 'R-2',
    coverUrl:
      'https://images.pexels.com/photos/15832365/pexels-photo-15832365/free-photo-of-steps-leading-to-a-white-building.jpeg?auto=compress&cs=tinysrgb&w=1600',
    rent: 29000,
    bed: 2,
    bath: 2,
    size: '1000 sqft',
    location: 'Dubai - Motor City',
    datePosted: new Date().toDateString(),
    slug: '3 Bedroom - The White Tower',
  },
  {
    id: 'R-3',
    coverUrl:
      'https://alzajelrealestate.com/wp-content/uploads/2019/02/jebel-ali-labor-camp-178-01.jpg',
    rent: 25000,
    bed: 1,
    bath: 1,
    size: '800 sqft',
    location: 'Sharjah - Taawoun',
    datePosted: new Date().toDateString(),
    slug: '3 Bedroom - The Address Tower',
  },
  {
    id: 'R-4',
    coverUrl:
      'https://alzajelrealestate.com/wp-content/uploads/2019/02/jebel-ali-labor-camp-88-01.jpg',
    rent: 33000,
    bed: 3,
    bath: 2,
    size: '1200 sqft',
    location: 'Sharjah - Buhairah',
    datePosted: new Date().toDateString(),
    priceSale: 31000,
    slug: '3 Bedroom - The Point Tower',
  },
];
// ----------------------------------------------------------------------
export default function WhatWeOffer() {
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');

  return (
    <Box
      sx={{
        overflow: 'hidden',
        bgcolor: 'background.neutral',
        py: 8,
      }}
    >
      <Container
        sx={{
          display: { md: 'flex' },
          alignItems: { md: 'center' },
        }}
        maxWidth="xl"
      >
        <Grid container spacing={10}>
          <Grid xs={12} md={12}>
            <Stack spacing={2}>
              <Typography variant="h2" sx={{ textTransform: 'capitalize' }}>
                We offer a variety of residential and commercial spaces
              </Typography>

              <Typography>
                At{' '}
                <Box component="span" sx={{ fontWeight: 'bold', color: 'secondary.main' }}>
                  Kojak Building
                </Box>{' '}
                , we take pride in offering an extensive selection of both commercial and
                residential spaces that cater to all your needs. Whether you&#39;re looking to
                upgrade your business headquarters or find a cozy abode to call home, we&#39;ve got
                you covered.
              </Typography>
            </Stack>
          </Grid>

          <Grid xs={12} md={12}>
            <Typography variant="h3" sx={{ mb: 2 }}>
              Residential
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gap: { xs: 4, md: 3 },
                gridTemplateColumns: {
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(4, 1fr)',
                },
              }}
            >
              {RESIDENTIAL.map((space) => (
                <SpaceItem key={space.id} space={space} />
              ))}
            </Box>
          </Grid>

          <Grid xs={12} md={12}>
            <Typography variant="h3" sx={{ mb: 2 }}>
              Commercial
            </Typography>
            <Box
              sx={{
                display: 'grid',
                mb: { xs: 8, md: 10 },
                gap: { xs: 4, md: 3 },
                gridTemplateColumns: {
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(4, 1fr)',
                },
              }}
            >
              {COMMERCIAL.map((space) => (
                <SpaceItem key={space.id} space={space} />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
