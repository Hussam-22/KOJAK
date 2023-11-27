import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';

import { Box, Stack, Button, Typography } from '@mui/material';

import { useLocales } from 'src/locales';
import { paths } from 'src/routes/paths';
import { fNumber } from 'src/utils/format-number';
import VehicleFeature from 'src/sections/services/components/vehicle-feature';

function FeaturesBar({ vehicleInfo }) {
  const { translate, currentLang } = useLocales();
  const navigate = useNavigate();
  const { year, price, milage, engineType } = vehicleInfo.data;

  return (
    <Box>
      <Stack direction="column" sx={{ mb: 2 }}>
        <Typography variant="overline" sx={{ color: 'common.white' }}>
          {translate(`common.${vehicleInfo.data.brand.toLowerCase()}`)}
        </Typography>
        <Typography variant="h3" sx={{ color: 'common.white' }}>
          {vehicleInfo.data.model}
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
        <VehicleFeature icon="mdi:car-seat" value={vehicleInfo.data.interiorColorString} />
        <VehicleFeature icon="mdi:car-door" value={vehicleInfo.data.exteriorColorString} />
        <Box>
          <Button
            variant="contained"
            size="small"
            onClick={() =>
              navigate(paths(currentLang.value).website.servicesDetails + vehicleInfo.data.docID)
            }
            color="primary"
          >
            {translate('common.moreDetails')}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
export default FeaturesBar;

FeaturesBar.propTypes = {
  vehicleInfo: PropTypes.object,
  // images: PropTypes.array,
};
