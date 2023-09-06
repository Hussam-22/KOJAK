import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import { Box, Stack, Button, Skeleton, Container, Typography } from '@mui/material';

import Image from 'src/components/image/Image';
import { useAuthContext } from 'src/auth/hooks';
import VehicleCard from 'src/sections/services/vehicle-card';

function VehiclesList() {
  const { addNewCar, getCars, fsListAllFolderItems } = useAuthContext();
  const [vehiclesList, setVehiclesList] = useState([]);
  const [imagesList, setImagesList] = useState([]);

  //   console.log(imagesList?.items?.filter((item) => item._location.path.includes('200x200')));

  useEffect(() => {
    (async () => {
      setVehiclesList(await getCars());
      //   setImagesList(await fsListAllFolderItems('GIUOlkdajcxIyQ3LJUW9'));
    })();
  }, [fsListAllFolderItems, getCars]);

  const addCar = async () => addNewCar();
  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <Container
        maxWidth="xl"
        sx={{
          py: 15,
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Stack sx={{ mb: 5 }}>
          <Typography variant="h1">Explore Our Inventory</Typography>
          <Typography>{`We take pride in offering a wide range of products that cater to various preferences and requirements. Whether you're a casual shopper or a dedicated collector, there's something here for everyone.`}</Typography>
        </Stack>
        {/* <Button onClick={addCar}>Add Car</Button> */}
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
