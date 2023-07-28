import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Stack, Button, Unstable_Grid2 as Grid } from '@mui/material';

import Image from 'src/components/image/Image';
import { useAuthContext } from 'src/auth/hooks';
import Iconify from 'src/components/iconify/Iconify';
import { useResponsive } from 'src/hooks/use-responsive';
import PropertyCard from 'src/sections/_kojakBuilding/properties/property-card';

// ----------------------------------------------------------------------
export default function WhatWeOffer() {
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');
  const [spaces, setSpaces] = useState([]);
  const { getAllSpacesInfo, addNewSpace } = useAuthContext();

  const addListing = async () => {
    const data = await addNewSpace();
    console.log(data);
  };

  const scrollToElement = () => {
    document.getElementById('scrollToForm').scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    (async () => {
      setSpaces(await getAllSpacesInfo());
    })();
  }, [getAllSpacesInfo]);

  const commercialSpaces = useCallback(
    () => spaces.filter((space) => space.type.toLowerCase() === 'commercial'),
    [spaces]
  );

  const residentialSpaces = useCallback(
    () => spaces.filter((space) => space.type.toLowerCase() === 'residential'),
    [spaces]
  );

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
              <Typography variant="h2" color="secondary" sx={{ textTransform: 'capitalize' }}>
                We offer a variety of residential and commercial spaces
              </Typography>

              <Typography>
                At{' '}
                <Box component="span" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
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
            <Stack direction="row" spacing={4}>
              {spaces.length !== 0 &&
                residentialSpaces()
                  .slice(0, 1)
                  .map((space) => <PropertyCard key={space.id} space={space} />)}

              {spaces.length !== 0 &&
                commercialSpaces()
                  .slice(0, 1)
                  .map((space) => <PropertyCard key={space.id} space={space} />)}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
