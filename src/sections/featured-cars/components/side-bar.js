import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import { alpha } from '@mui/system';
import { Box, Stack, Button, Container, Typography } from '@mui/material';

import Image from 'src/components/image/Image';
import { useAuthContext } from 'src/auth/hooks';

function SideBar({ featuredCars, selectedVehicleID }) {
  return (
    <Box
      sx={{
        position: 'absolute',
        right: 20,
        top: '40%',
        zIndex: 2,
        background: alpha('#000000', 0.15),
        p: 2,
        borderRadius: 1,
      }}
    >
      <Stack direction="column" spacing={2}>
        {featuredCars.map((car, index) => (
          <Thumbnail
            key={car.id}
            vehicleInfo={car}
            selectedVehicleID={selectedVehicleID}
            index={index}
          />
        ))}
      </Stack>
    </Box>
  );
}
export default SideBar;
SideBar.propTypes = {
  selectedVehicleID: PropTypes.func,
  featuredCars: PropTypes.array,
};

function Thumbnail({ vehicleInfo, selectedVehicleID, index }) {
  const [url, setUrl] = useState('');
  const { fsGetImgDownloadUrl } = useAuthContext();

  useEffect(() => {
    (async () => {
      setUrl(await fsGetImgDownloadUrl(vehicleInfo.id, 0));
    })();
  }, [fsGetImgDownloadUrl, vehicleInfo.id]);

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      spacing={2}
      key={vehicleInfo.id}
    >
      <Typography>{vehicleInfo.class}</Typography>
      {url && (
        <Image
          src={url}
          height="5vh"
          width="6vw"
          sx={{ borderRadius: 1, cursor: 'pointer' }}
          onClick={() => selectedVehicleID(vehicleInfo.id)}
        />
      )}
    </Stack>
  );
}

Thumbnail.propTypes = {
  selectedVehicleID: PropTypes.func,
  vehicleInfo: PropTypes.object,
  index: PropTypes.number,
};
