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
    gallery: [
      'https://images.pexels.com/photos/322154/pexels-photo-322154.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    ],
    rent: 33000,
    bed: 3,
    bath: 3,
    size: '1200 sqft',
    location: 'Sharjah - Al Qasimeyah',
    datePosted: new Date().toDateString(),
    slug: 'The ACE Tower',
  },
  {
    id: 'R-2',
    gallery: [
      'https://images.pexels.com/photos/1717272/pexels-photo-1717272.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    ],
    rent: 29000,
    bed: 2,
    bath: 2,
    size: '1000 sqft',
    location: 'Dubai - Motor City',
    datePosted: new Date().toDateString(),
    slug: 'The White Tower',
  },
  {
    id: 'R-3',
    gallery: [
      'https://images.pexels.com/photos/1031593/pexels-photo-1031593.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    ],
    rent: 25000,
    bed: 1,
    bath: 1,
    size: '800 sqft',
    location: 'Sharjah - Taawoun',
    datePosted: new Date().toDateString(),
    slug: 'The Address Tower',
  },
  {
    id: 'R-4',
    gallery: [
      'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    ],
    rent: 33000,
    bed: 3,
    bath: 2,
    size: '1200 sqft',
    location: 'Sharjah - Buhairah',
    datePosted: new Date().toDateString(),
    priceSale: 31000,
    slug: 'The Point Tower',
  },
];

const COMMERCIAL = [
  {
    id: 'C-1',
    gallery: [
      'https://images.pexels.com/photos/434139/pexels-photo-434139.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    ],
    rent: 33000,
    bed: 3,
    bath: 3,
    size: '1200 sqft',
    location: 'Sharjah - Al Qasimeyah',
    datePosted: new Date().toDateString(),
    slug: '3 Bedroom - The ACE Tower',
  },
  {
    id: 'C-2',
    gallery: [
      'https://images.pexels.com/photos/1436190/pexels-photo-1436190.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    ],
    rent: 29000,
    bed: 2,
    bath: 2,
    size: '1000 sqft',
    location: 'Dubai - Motor City',
    datePosted: new Date().toDateString(),
    slug: '3 Bedroom - The White Tower',
  },
  {
    id: 'C-3',
    gallery: [
      'https://images.pexels.com/photos/280212/pexels-photo-280212.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    ],
    rent: 25000,
    bed: 1,
    bath: 1,
    size: '800 sqft',
    location: 'Sharjah - Taawoun',
    datePosted: new Date().toDateString(),
    slug: '3 Bedroom - The Address Tower',
  },
  {
    id: 'C-4',
    gallery: [
      'https://images.pexels.com/photos/1124461/pexels-photo-1124461.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    ],
    rent: 33000,
    bed: 3,
    bath: 2,
    size: '1200 sqft',
    location: 'Sharjah - Buhairah',
    datePosted: new Date().toDateString(),
    priceSale: 31000,
    slug: 'The Point Tower',
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
            <Stack spacing={2} id="scrollHere">
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
