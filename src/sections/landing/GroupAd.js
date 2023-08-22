import {
  Box,
  Card,
  Stack,
  Button,
  useTheme,
  Container,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material';

import Image from 'src/components/image/Image';
import Iconify from 'src/components/iconify/Iconify';

export default function GroupAd() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        bgcolor: 'background.neutral',
        m: 8,
        backgroundImage: 'url(/assets/shape/bbblurry.svg)',
        // backgroundSize: 'cover',
        borderRadius: 3,
        py: 10,
      }}
    >
      <Container>
        <Stack spacing={3}>
          <Typography variant="h2">Experience the Difference</Typography>
          <Typography
            sx={{ fontWeight: theme.typography.fontWeightLight }}
          >{`At KOJAK, we're more than an auto repair shop; we're your automotive partners. Whether you need maintenance, repairs, spare parts, or a new Mercedes, you can trust us to deliver excellence and dedication. Visit us today and explore our Mercedes spare parts and car sales showroom. Discover why Mercedes-Benz enthusiasts choose KOJAK as their trusted partner in all things Mercedes-Benz.`}</Typography>

          <Grid container spacing={5} sx={{ height: 600 }}>
            <Grid md={6} xs={12}>
              <Card
                sx={{
                  bgcolor: 'grey.1000',
                  height: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: `-5px 5px 0 0 ${theme.palette.custom.gold}`,
                }}
              >
                <Stack direction="column" sx={{ flexGrow: 1, p: 3 }} spacing={2}>
                  <Typography variant="h3" sx={{ color: 'custom.gold' }}>
                    KOJAK Exclusive
                  </Typography>
                  <Typography sx={{ fontWeight: theme.typography.fontWeightLight }}>
                    {`At KOJAK, we're proud to offer more than just exceptional auto repair and maintenance services. Our commitment to enhancing your automotive journey extends to providing you with an exquisite collection of Mercedes cars that embody luxury, performance, and sophistication`}
                  </Typography>
                  <Box>
                    <Button
                      variant="contained"
                      color="secondary"
                      endIcon={<Iconify icon="solar:map-arrow-up-bold-duotone" />}
                    >
                      Visit website
                    </Button>
                  </Box>
                </Stack>

                <Image src="/assets/images/group/car-6.jpg" />
              </Card>
            </Grid>
            <Grid md={6} xs={12}>
              <Card
                sx={{
                  bgcolor: 'grey.1000',
                  height: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: `-5px 5px 0 0 ${theme.palette.custom.red}`,
                }}
              >
                <Stack direction="column" sx={{ flexGrow: 1, p: 3 }} spacing={2}>
                  <Typography variant="h3" sx={{ color: 'custom.red' }}>
                    KOJAK Spare Parts
                  </Typography>
                  <Typography
                    sx={{ fontWeight: theme.typography.fontWeightLight }}
                  >{`At KOJAK, we're not just your trusted destination for automotive repairs and services; we're also your go-to source for genuine Mercedes spare parts. We believe in offering our valued customers a comprehensive solution that encompasses both top-notch auto care and access to the finest Mercedes-Benz components`}</Typography>
                  <Box>
                    <Button
                      variant="contained"
                      color="secondary"
                      endIcon={<Iconify icon="solar:map-arrow-up-bold-duotone" />}
                    >
                      Visit website
                    </Button>
                  </Box>
                </Stack>
                <Image src="/assets/images/group/car-7.jpg" />
              </Card>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}
