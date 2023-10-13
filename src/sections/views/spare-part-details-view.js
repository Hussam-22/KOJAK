import PropTypes from 'prop-types';
import { useParams } from 'react-router';

import { Box, Stack, Button, Container, Typography } from '@mui/material';

import Image from 'src/components/image/Image';

function SparePartDetailsView() {
  const { partNumber } = useParams();
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="md">
        <Typography>{partNumber}</Typography>
      </Container>
    </Box>
  );
}
export default SparePartDetailsView;
// SparePartDetailsView.propTypes = { tables: PropTypes.array };
