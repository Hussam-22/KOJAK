import PropTypes from 'prop-types';

import { Box, Stack, Button, Container, Typography } from '@mui/material';

import Image from 'src/components/image/Image';
import { useAuthContext } from 'src/auth/hooks';

function CareerList() {
  const { addNewCareerPost } = useAuthContext();

  const addNewJobHandler = async () => addNewCareerPost;

  return (
    <Container>
      <Button variant="contained" onClick={addNewJobHandler}>
        Add New Job
      </Button>
    </Container>
  );
}
export default CareerList;
// CareerList.propTypes = { tables: PropTypes.array };
