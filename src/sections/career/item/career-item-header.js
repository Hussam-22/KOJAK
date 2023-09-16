import PropTypes from 'prop-types';

import { Box, Stack, Button, Container, Typography } from '@mui/material';

import Image from 'src/components/image/Image';
import ContactUsForm from 'src/sections/contact-us/contactUsForm';

function CareerItemHeader() {
  return (
    <Box sx={{ bgcolor: 'primary.lighter', py: 4 }}>
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Stack direction="column" spacing={2}>
            <Box>
              <Typography variant="overline">Job ID: IT-2023-1</Typography>
              <Typography variant="h2">Full Stack Developer</Typography>
            </Box>
            <Stack direction="row" spacing={2}>
              <Typography variant="caption">Kojak Group</Typography>
              <Typography variant="caption">IT Department</Typography>
              <Typography variant="caption">Sharjah, Industrial Area 4</Typography>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
export default CareerItemHeader;
// CareerListHeader.propTypes = { tables: PropTypes.array };
