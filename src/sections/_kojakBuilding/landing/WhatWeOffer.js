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
import SpaceItem from 'src/sections/_kojakBuilding/spaces/space-item';

// ----------------------------------------------------------------------
export default function WhatWeOffer() {
  const theme = useTheme();
  const mdUp = useResponsive('up', 'md');
  const [spaces, setSpaces] = useState([]);
  const { getAllSpacesInfo, addNewSpace } = useAuthContext();

  const addListing = () => addNewSpace();

  const scrollToElement = () => {
    document.getElementById('scrollToForm').scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    (async () => {
      setSpaces(await getAllSpacesInfo());
    })();
  }, [getAllSpacesInfo]);

  const commercialSpaces = useCallback(
    () => spaces.filter((space) => space.type === 'commercial'),
    [spaces]
  );

  const residentialSpaces = useCallback(
    () => spaces.filter((space) => space.type === 'residential'),
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
              <Typography variant="h2" color="primary" sx={{ textTransform: 'capitalize' }}>
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
              {spaces.length !== 0 &&
                residentialSpaces().map((space) => <SpaceItem key={space.id} space={space} />)}
            </Box>
          </Grid>

          <Grid xs={12} md={12}>
            <Typography variant="h3" sx={{ mb: 2 }}>
              Commercial
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
              {spaces.length !== 0 &&
                commercialSpaces().map((space) => <SpaceItem key={space.id} space={space} />)}
            </Box>
          </Grid>

          <Grid xs={12} md={12}>
            <Stack
              spacing={3}
              direction="row"
              sx={{
                p: 3,
                borderRadius: 1,
                alignItems: 'center',
                border: 'dashed 1px #999999',
                justifyContent: 'center',
              }}
            >
              <Image src="/assets/kojak-building/illustration/house-property.svg" width="7%" />
              <Stack direction="column">
                <Typography variant="h3">Did not find what you are looking for ?</Typography>
                <Box>
                  {/* <Button
                    variant="contained"
                    endIcon={<Iconify icon="iconamoon:send-duotone" />}
                    onClick={addListing}
                  >
                    Add Listing
                  </Button> */}

                  <Button
                    variant="contained"
                    color="primary"
                    endIcon={<Iconify icon="iconamoon:send-duotone" />}
                    onClick={scrollToElement}
                  >
                    Drop us a message
                  </Button>
                </Box>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
