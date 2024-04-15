import PropTypes from 'prop-types';

import { Box, Stack, Divider, Container, Typography } from '@mui/material';

import Iconify from 'src/components/iconify';
import { useResponsive } from 'src/hooks/use-responsive';

function CareerItemHeader({ jobPostDetails }) {
  const { title, group, department, expiryDate, contractType } = jobPostDetails;
  const isMobile = useResponsive('down', 'sm');

  const lastDateToApply = new Date(expiryDate).toDateString();

  return (
    <Box sx={{ bgcolor: 'primary.lighter', py: 4 }}>
      <Container>
        <Stack
          direction={{ sm: 'row', xs: 'column' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Stack direction="column" spacing={2}>
            <Box>
              <Typography variant="h2">{title}</Typography>
            </Box>
            <Stack direction="row" spacing={3}>
              <Stack spacing={1} direction="row">
                <Iconify icon="clarity:organization-line" />
                <Typography variant="caption">{group}</Typography>
              </Stack>
              <Stack spacing={1} direction="row">
                <Iconify icon="tabler:building" />
                <Typography variant="caption">{department}</Typography>
              </Stack>
              <Stack spacing={1} direction="row">
                <Iconify icon="formkit:time" />
                <Typography variant="caption">{contractType}</Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack direction="column" spacing={1}>
            <Typography>Send your CV to</Typography>
            <Typography color="primary">cv@kojak-group.com</Typography>
            <Typography variant="caption">Expiry Date: {lastDateToApply}</Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
export default CareerItemHeader;
CareerItemHeader.propTypes = { jobPostDetails: PropTypes.object };
