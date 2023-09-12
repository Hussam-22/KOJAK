import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';

import { Box, Stack, Button, Typography } from '@mui/material';

import { useLocales } from 'src/locales';
import { paths } from 'src/routes/paths';
import { fNumber } from 'src/utils/format-number';
import VehicleFeature from 'src/sections/services/components/vehicle-feature';

function FeaturesBar({ vehicleInfo }) {
  const { translate } = useLocales();
  const navigate = useNavigate();
  const { year, price, milage, engineType } = vehicleInfo;

  return (
    <Box>
      <Stack direction="column" sx={{ mb: 2 }}>
        <Typography variant="overline" sx={{ color: 'common.white' }}>
          {translate(`common.${vehicleInfo.brand.toLowerCase()}`)}
        </Typography>
        <Typography variant="h3" sx={{ color: 'common.white' }}>
          {vehicleInfo.model}
        </Typography>
      </Stack>

      <Stack
        spacing={6}
        sx={{ justifyContent: 'space-evenly', alignItems: 'center' }}
        direction="row"
      >
        <VehicleFeature icon="iwwa:year" value={year} />
        <VehicleFeature icon="tdesign:money" value={price} />
        <VehicleFeature icon="fa-solid:road" value={`${fNumber(milage)} Km`} />
        <VehicleFeature icon="ph:engine" value={engineType} />

        <Stack direction="column" alignItems="center" spacing={1}>
          <Typography sx={{ color: 'common.white' }}> {translate('common.color')}</Typography>
          <Stack direction="row" spacing={1}>
            <Box
              sx={{
                width: 25,
                height: 25,
                border: 'solid 1px #FFF',
                borderRadius: '50%',
                backgroundColor: vehicleInfo.interiorColor,
              }}
            />
            <Box
              sx={{
                width: 25,
                height: 25,
                border: 'solid 1px #FFF',
                borderRadius: '50%',
                backgroundColor: vehicleInfo.exteriorColor,
              }}
            />
          </Stack>
        </Stack>

        {/* <Box>
          <Button
            variant="contained"
            size="small"
            onClick={() => navigate(paths.website.servicesDetails + vehicleInfo.id)}
            color="primary"
          >
            {translate('common.moreDetails')}
          </Button>
        </Box> */}
      </Stack>
    </Box>
  );
}
export default FeaturesBar;

FeaturesBar.propTypes = {
  vehicleInfo: PropTypes.object,
  // images: PropTypes.array,
};
