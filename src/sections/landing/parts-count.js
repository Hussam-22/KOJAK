import React from 'react';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Box, Stack, useTheme, Container, Typography } from '@mui/material';

import { useLocales } from 'src/locales';
import SvgColor from 'src/components/svg-color/svg-color';
import { _partsCategory } from 'src/_mock/_partsCategory';

function PartsCount() {
  const theme = useTheme();
  const { translate } = useLocales();

  return (
    <Box
      sx={{
        py: 8,
        bgcolor: 'background.neutral',
      }}
    >
      <Container maxWidth="xl">
        <Grid container>
          <Grid md={12} xs={12} sx={{ px: 1 }}>
            <Stack spacing={3}>
              <Box>
                <Typography variant="overline" color="primary">
                  Out Parts Inventory
                </Typography>
                <Typography variant="h1">A Steadfast Commitment to Availability</Typography>
              </Box>
              <Typography
                sx={{
                  fontWeight: theme.typography.fontWeightLight,
                }}
                variant="h5"
              >
                {`At Kojak Spare Parts, we understand the importance of having the right part when you
                need it. That's why we maintain a substantial inventory of Mercedes spare parts,
                ensuring that many critical components are always in stock and readily available for
                our customers.`}
              </Typography>
            </Stack>
          </Grid>
          <Grid md={12} xs={12}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  lg: `repeat(7,1fr)`,
                  md: `repeat(5,1fr)`,
                  xs: `repeat(2,1fr)`,
                },
                gap: 2,
                px: 1,
                mt: 2,
              }}
            >
              {_partsCategory
                .sort((a, b) => a.icon.localeCompare(b.icon))
                .map((option) => (
                  <Stack
                    spacing={1}
                    // component={Button}
                    key={option.category}
                    direction="column"
                    alignItems="center"
                    textAlign="center"
                    justifyContent="center"
                    sx={{ border: 'solid 1px #333', borderRadius: 1, py: 3 }}
                  >
                    <SvgColor
                      src={`/assets/images/icons/${option.icon}.svg`}
                      sx={{ width: 48, height: 48 }}
                    />
                    {/* <Image src={`/assets/images/icons/${option.icon}.svg`} width={82} height={82} /> */}
                    {option.category}
                    <Typography color="primary" variant="h6">
                      {option.totalAvailable}{' '}
                      <Box
                        component="span"
                        sx={{ typography: 'caption', color: 'secondary.light' }}
                      >
                        parts available
                      </Box>
                    </Typography>
                  </Stack>
                ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

PartsCount.propTypes = {
  // Add your prop types here if needed
};

export default PartsCount;
