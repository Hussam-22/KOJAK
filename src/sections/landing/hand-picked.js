import PropTypes from 'prop-types';

import { Box, Card, Stack, Button, Container, Typography } from '@mui/material';

import Image from 'src/components/image/Image';

function HandPicked() {
  return (
    <Box>
      <Container sx={{ py: 8 }}>
        <Stack
          direction="column"
          spacing={2}
          alignItems="left"
          justifyContent={{ xs: 'left', md: 'space-between' }}
          sx={{
            mb: 4,
            textAlign: 'left',
            //   maxWidth: { md: '65%' },
          }}
        >
          <Typography variant="h5" color="white">
            Hand-Picked
          </Typography>
          <Typography variant="h2" color="white">
            A Glance from our companies
          </Typography>
        </Stack>

        <Card sx={{ p: 3 }}>
          <Stack>
            <Typography>Kojak Auto Maintenance</Typography>
          </Stack>
        </Card>
      </Container>
    </Box>
  );
}
export default HandPicked;
// HandPicked.propTypes = { tables: PropTypes.array };
