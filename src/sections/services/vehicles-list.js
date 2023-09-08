import { useState, useEffect } from 'react';

import { Box, Stack, useTheme, Skeleton, Container, Typography } from '@mui/material';

import { useAuthContext } from 'src/auth/hooks';
import VehicleCard from 'src/sections/services/vehicle-card';

function VehiclesList() {
  const theme = useTheme();
  const { addNewCar, getCars, fsListAllFolderItems } = useAuthContext();
  const [vehiclesList, setVehiclesList] = useState([]);

  useEffect(() => {
    (async () => {
      setVehiclesList(await getCars());
      //   setImagesList(await fsListAllFolderItems('GIUOlkdajcxIyQ3LJUW9'));
    })();
  }, [fsListAllFolderItems, getCars]);

  const addCar = async () => addNewCar();

  return (
    <Box sx={{ bgcolor: 'background.neutral' }}>
      <Container
        // maxWidth="xl"
        sx={{
          pt: 5,
        }}
      >
        <Stack spacing={2} sx={{ mb: 5, textAlign: 'center' }}>
          <Typography variant="h1" sx={{ textTransform: 'capitalize' }}>
            Find your dream car,{' '}
            <Box
              component="span"
              sx={{
                background: `-webkit-linear-gradient(45deg,${theme.palette.primary.light},${theme.palette.primary.dark})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              make it yours !!
            </Box>
          </Typography>
          <Typography>{`We take pride in offering a wide range of products that cater to various preferences and requirements. Whether you're a casual shopper or a dedicated collector, there's something here for everyone.`}</Typography>
        </Stack>
      </Container>

      <Container maxWidth="xl" sx={{ pb: { xs: 5, md: 10 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { md: 'repeat(3,1fr)', xs: 'repeat(1,1fr)' },
            gap: 3,
          }}
        >
          {vehiclesList.length === 0
            ? [...Array(6)].map((_, index) => (
                <Skeleton
                  key={index}
                  variant="rectangular"
                  width={500}
                  height={500}
                  sx={{ borderRadius: 3 }}
                />
              ))
            : vehiclesList.map((vehicle) => <VehicleCard vehicleInfo={vehicle} key={vehicle.id} />)}
        </Box>
      </Container>
    </Box>
  );
}
export default VehiclesList;
// VehiclesList.propTypes = { tables: PropTypes.array };
