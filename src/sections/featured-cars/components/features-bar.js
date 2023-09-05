import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';

import { Box, alpha, Stack, Button, Container, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import Image from 'src/components/image/Image';

function FeaturesBar({ selectedCardInfo, images }) {
  const navigate = useNavigate();
  const features = Object.values(selectedCardInfo.features)
    .filter((feature) => ['price', 'year', 'engine type', 'hp'].includes(feature[0]?.toLowerCase()))
    .sort((a, b) => a[0].localeCompare(b[0]));

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 0,
        // right: 0,
        height: '17%',
        width: 1,
        pt: 2,
        px: 10,
        background: '#FFFFFF',
        zIndex: 10,
        borderTop: 'solid 1px #333',
      }}
    >
      <Stack sx={{ justifyContent: 'space-evenly', alignItems: 'center' }} direction="row">
        <Stack direction="column">
          <Typography variant="h1" color="secondary">
            {selectedCardInfo.brand}
          </Typography>
          <Typography variant="h4" sx={{ color: 'grey.400' }}>
            {selectedCardInfo.model}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={6}>
          {features.map((feature) => (
            <Stack direction="column" key={feature[0]}>
              <Typography variant="h5" color="secondary">
                {feature[0]}
              </Typography>
              <Typography variant="h6" sx={{ color: 'grey.400' }}>
                {feature[1]}
              </Typography>
            </Stack>
          ))}

          <Stack direction="column" alignItems="center">
            <Typography variant="h5" color="secondary">
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

        {/* <Stack direction="row" spacing={1}>
          {images.map(
            (url, index) =>
              index !== 0 && <Image src={url} height="10vh" sx={{ borderRadius: 1 }} key={url} />
          )}
        </Stack> */}

        <Box>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate(paths.website.serviceDetails + selectedCardInfo.id)}
          >
            View Details
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
export default FeaturesBar;

FeaturesBar.propTypes = {
  selectedCardInfo: PropTypes.object,
  images: PropTypes.array,
};
