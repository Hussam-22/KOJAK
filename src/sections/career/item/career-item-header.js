import { Box, Stack, Divider, Container, Typography } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

function CareerItemHeader() {
  const isMobile = useResponsive('down', 'sm');

  return (
    <Box sx={{ bgcolor: 'primary.lighter', py: 4 }}>
      <Container>
        <Stack direction={{ md: 'row', xs: 'column' }} justifyContent="space-between">
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
          {isMobile && <Divider sx={{ my: 2 }} />}
          <Stack direction="column" spacing={1}>
            <Typography variant="h4">Apply Now</Typography>
            <Typography>Send your CV to</Typography>
            <Typography color="primary">info@kojak-group.com</Typography>
            <Typography variant="caption">Expiry Date: 25-12-2023</Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
export default CareerItemHeader;
// CareerListHeader.propTypes = { tables: PropTypes.array };
