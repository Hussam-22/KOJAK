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
    <>
      <Button onClick={addCar}>Add Car</Button>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 3 }}>
        {vehiclesList.length === 0
          ? [...Array(9)].map((_, index) => (
              <Skeleton key={index} variant="rectangular" width={200} height={200} />
            ))
          : vehiclesList.map((vehicle) => <VehicleCard vehicleInfo={vehicle} key={vehicle.id} />)}
      </Box>
    </>
  );
}
export default VehiclesList;
// VehiclesList.propTypes = { tables: PropTypes.array };
