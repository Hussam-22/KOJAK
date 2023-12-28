import PropTypes from 'prop-types';

import { Box, Stack, Divider, Container, Typography } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

function CareerItemHeader({ jobPostDetails }) {
  const { title, group, department, expiryDate } = jobPostDetails;
  const isMobile = useResponsive('down', 'sm');

  const lastDateToApply = new Date(expiryDate).toDateString();

  return (
    <Box sx={{ bgcolor: 'primary.lighter', py: 4 }}>
      <Container>
        <Stack direction={{ md: 'row', xs: 'column' }} justifyContent="space-between">
          <Stack direction="column" spacing={2}>
            <Box>
              <Typography variant="h2">{title}</Typography>
            </Box>
            <Stack direction="row" spacing={2}>
              <Typography variant="caption">{group}</Typography>
              <Typography variant="caption">{department}</Typography>
            </Stack>
          </Stack>
          {isMobile && <Divider sx={{ my: 2 }} />}
          <Stack direction="column" spacing={1}>
            <Typography variant="h4">Apply Now</Typography>
            <Typography>Send your CV to</Typography>
            <Typography color="primary">info@kojak-group.com</Typography>
            <Typography variant="caption">Expiry Date: {lastDateToApply}</Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
export default CareerItemHeader;
CareerItemHeader.propTypes = { jobPostDetails: PropTypes.object };
