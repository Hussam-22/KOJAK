import { useState, useEffect } from 'react';

import { Box, Stack, Skeleton, useTheme, Container, Typography } from '@mui/material';

import { useLocales } from 'src/locales';
import { useAuthContext } from 'src/auth/hooks';
import VehicleCard from 'src/sections/services/vehicle-card';

function VehiclesList() {
  const theme = useTheme();
  const { translate } = useLocales();
  const { addNewCar, getCars, fsListAllFolderItems, fsUpdateDoc } = useAuthContext();
  const [vehiclesList, setVehiclesList] = useState([]);

  useEffect(() => {
    (async () => {
      setVehiclesList(await getCars());
    })();
  }, [fsListAllFolderItems, getCars]);

  // const addCar = async () => addNewCar();
  // const addCar = async () => fsUpdateDoc();

  return (
    <Box sx={{ bgcolor: 'background.neutral' }}>
      <Container
        sx={{
          py: 8,
        }}
      >
        {/* <Button onClick={addCar}>Add New Car</Button> */}
        <Stack spacing={2} sx={{ mb: 5, textAlign: 'center' }}>
          <Box>
            <Typography variant="h1" sx={{ textTransform: 'capitalize' }}>
              {translate('inventory.title')}
            </Typography>
            <Typography
              variant="h1"
              sx={{
                background: `-webkit-linear-gradient(45deg,${theme.palette.primary.light},${theme.palette.primary.dark})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {translate('inventory.titlePartTwo')}
            </Typography>
          </Box>
          <Typography>{translate('inventory.subTitle')}</Typography>
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
            : vehiclesList.map((vehicle) => (
                <VehicleCard vehicleInfo={vehicle} key={vehicle.data.docID} />
              ))}
        </Box>
      </Container>
    </Box>
  );
}
export default VehiclesList;
// VehiclesList.propTypes = { tables: PropTypes.array };
