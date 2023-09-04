import PropTypes from 'prop-types';

import { Box, alpha, Stack, Button, Container, Typography } from '@mui/material';

import Image from 'src/components/image/Image';

function FeaturesBar({ selectedCardInfo }) {
  console.log(selectedCardInfo);

  const features = Object.values(selectedCardInfo.features)
    .filter((feature) => ['price', 'year', 'engine type', 'hp'].includes(feature[0]?.toLowerCase()))
    .sort((a, b) => a[0].localeCompare(b[0]));

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 0,
        // right: 0,
        height: '18dvh',
        width: 1,
        pt: 2,
        px: 10,
        background: alpha('#FFFFFF', 0.85),
        zIndex: 2,
      }}
    >
      <Stack sx={{ justifyContent: 'space-between', alignItems: 'center' }} direction="row">
        <Stack direction="column">
          <Typography variant="h1" color="primary">
            {selectedCardInfo.brand}
          </Typography>
          <Typography variant="h4" sx={{ color: 'grey.400' }}>
            {selectedCardInfo.model}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={6}>
          {features.map((feature) => (
            <Stack direction="column" key={feature[0]}>
              <Typography variant="h5" color="primary">
                {feature[0]}
              </Typography>
              <Typography variant="h6" sx={{ color: 'grey.400' }}>
                {feature[1]}
              </Typography>
            </Stack>
          ))}

          <Stack direction="column" alignItems="center">
            <Typography variant="h5" color="primary">
              Color
            </Typography>
            <Stack direction="row" spacing={1}>
              <Box
                sx={{
                  width: 25,
                  height: 25,
                  border: 'solid 1px #000',
                  borderRadius: '50%',
                  backgroundColor: selectedCardInfo.features.interiorColor[1],
                }}
              />
              <Box
                sx={{
                  width: 25,
                  height: 25,
                  border: 'solid 1px #000',
                  borderRadius: '50%',
                  backgroundColor: selectedCardInfo.features.exteriorColor[1],
                }}
              />
            </Stack>
          </Stack>
        </Stack>

        <Stack direction="row" spacing={1}>
          <Image src="/assets/images/cars/car-1.webp" height="7vh" sx={{ borderRadius: 1 }} />
          <Image src="/assets/images/cars/car-2.webp" height="7vh" sx={{ borderRadius: 1 }} />
          <Image src="/assets/images/cars/car-3.webp" height="7vh" sx={{ borderRadius: 1 }} />
        </Stack>

        <Box>
          <Button variant="contained" size="large">
            View Details
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
export default FeaturesBar;

FeaturesBar.propTypes = { selectedCardInfo: PropTypes.object };
