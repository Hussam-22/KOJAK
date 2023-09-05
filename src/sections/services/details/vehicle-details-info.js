import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';

import { Box, Stack, Button, Container, Typography } from '@mui/material';

import Image from 'src/components/image/Image';
import { useAuthContext } from 'src/auth/hooks';

function VehicleDetailsInfo() {
  const { vehicleID } = useParams();
  const { getVehicleInfo } = useAuthContext();
  const [vehicleInfo, setVehicleInfo] = useState();
  const vehicleFeatures = Object.values(vehicleInfo?.features || {});
  console.log(vehicleFeatures.filter((item) => typeof item === 'array'));

  useEffect(() => {
    (async () => {
      setVehicleInfo(await getVehicleInfo(vehicleID));
    })();
  }, [getVehicleInfo, vehicleID]);

  return (
    <Stack>
      <Stack direction="row">{/* <Typography></Typography> */}</Stack>
    </Stack>
  );
}
export default VehicleDetailsInfo;
// VehicleDetailsInfo.propTypes = { tables: PropTypes.array };
