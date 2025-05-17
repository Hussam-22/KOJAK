import { Box, Button, Container, Stack, Typography, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';

import Image from 'src/components/image/Image';
import { AUTO_URL } from 'src/config-global';
import { useLocales } from 'src/locales';

function FixOffer() {
  const theme = useTheme();
  const { translate } = useLocales();

  return (
    <Box sx={{ py: 8, px: { xs: 3 } }}>
      <Container maxWidth="xl" sx={{ bgcolor: 'info.main', borderRadius: 1, p: 3 }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', alignItems: 'center' }}>
            <Stack spacing={2}>
              <Typography variant="h1" color="white">
                5% Discount
              </Typography>
              <Typography variant="h5" color="white">
                Get 5% discount on Spare Parts price when you chose to Fix/Install Spare Part by our
                Auto Maintenance Shop
              </Typography>
              <Box>
                <Button
                  variant="contained"
                  size="large"
                  href={AUTO_URL}
                  target="_blank"
                  rel="noopener"
                  aria-label="Kojak Auto Maintenance Website  - Book an Appointment"
                >
                  Book an Appointment
                </Button>
              </Box>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Image
              src="https://cdnb.artstation.com/p/assets/images/images/054/299/461/large/roman-tikhonov-05-15-03.jpg?1664222669"
              ratio="21/9"
              sx={{ borderRadius: 1 }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default FixOffer;
