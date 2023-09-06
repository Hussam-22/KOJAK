import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';

import { Box, Stack, alpha, Button, useTheme, Container, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import Image from 'src/components/image/Image';

function FeaturesBar({ selectedCardInfo }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const features = Object.values(selectedCardInfo.features)
    .filter((feature) => ['price', 'year', 'engine type', 'hp'].includes(feature[0]?.toLowerCase()))
    .sort((a, b) => a[0].localeCompare(b[0]));

  return (
    <Box
      sx={{
        py: 2,
        background: theme.palette.common.white,
        borderRadius: '0 0 15px 15px',
      }}
    >
      <Stack sx={{ justifyContent: 'space-evenly', alignItems: 'center' }} direction="row">
        <Stack direction="column">
          <Typography variant="overline" color="secondary">
            {selectedCardInfo.brand}
          </Typography>
          <Typography variant="h3" color="primary">
            {selectedCardInfo.model}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={6}>
          {features.map((feature) => (
            <Stack direction="column" key={feature[0]}>
              <Typography color="secondary">{feature[0]}</Typography>
              <Typography color="primary">{feature[1]}</Typography>
            </Stack>
          ))}

          <Stack direction="column" alignItems="center">
            <Typography color="secondary">Color</Typography>
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

        <Box>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate(paths.website.servicesDetails + selectedCardInfo.id)}
            color="primary"
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
  // images: PropTypes.array,
};
