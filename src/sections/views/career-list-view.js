import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import { Box, Stack, Button, Container, Typography } from '@mui/material';

import Image from 'src/components/image/Image';
import { useAuthContext } from 'src/auth/hooks';
import CareerListCard from 'src/sections/career/list/career-list-card';

function CareerListView() {
  const { addNewCareerPost, getCareersList } = useAuthContext();
  const [careersList, setCareersList] = useState([]);

  console.log(careersList);

  const addNewJobHandler = async () => addNewCareerPost();

  useEffect(() => {
    (async () => {
      setCareersList(await getCareersList());
    })();
  }, [getCareersList]);

  return (
    <Container sx={{ py: 5 }}>
      <Stack sx={{ mb: 4 }}>
        <Typography variant="h1">Our Careers</Typography>
        <Typography>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed consectetur fugit nesciunt
          eveniet ducimus sit qui id iste aliquid, asperiores omnis quos eligendi. Fugiat totam,
          adipisci quaerat iusto maxime delectus?
        </Typography>
        <Box>
          <Button variant="contained" onClick={addNewJobHandler}>
            Add New Job
          </Button>
        </Box>
      </Stack>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2 }}>
        {careersList.map((jobDetails) => (
          <CareerListCard key={jobDetails.id} jobDetails={jobDetails} />
        ))}
      </Box>
    </Container>
  );
}
export default CareerListView;
// CareerList.propTypes = { tables: PropTypes.array };
