import PropTypes from 'prop-types';

import {
  Box,
  Stack,
  alpha,
  Button,
  useTheme,
  Container,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material';

import { useLocales } from 'src/locales';
import Image from 'src/components/image/Image';
import { bgBlur, bgGradient } from 'src/theme/css';
import Iconify from 'src/components/iconify/Iconify';
import { useResponsive } from 'src/hooks/use-responsive';
import ContactUsForm from 'src/sections/contact-us/contactUsForm';

const FACTS = [
  { title: '+50 Countries', icon: 'fluent-mdl2:world' },
  { title: '+8450 Exported Cars', icon: 'simple-icons:mercedes' },
  { title: 'Secure Transactions', icon: 'fa6-solid:money-bill-transfer' },
  { title: '+3020 Happy Customers', icon: 'wpf:happy' },
];

function InternationalBusiness() {
  const theme = useTheme();
  const { translate } = useLocales();
  const mdUp = useResponsive('up', 'md');
  return (
    <Box
      sx={{
        position: 'relative',
        height: '100dvh',
        overflow: 'hidden',
        scrollSnapAlign: 'start',
        background: 'linear-gradient(45deg, #000000, #1C4F7C)' /* fallback for old browsers */,
      }}
    >
      <Container maxWidth="xl" sx={{ height: 1 }}>
        <Grid
          container
          sx={{
            alignItems: 'center',
            justifyContent: 'left',
            height: '100%',
            backgroundImage: 'url(/assets/illustrations/illustration_map.svg)',
            backgroundSize: 'contain',
            backgroundPosition: 'right',
            backgroundRepeat: 'no-repeat',
          }}
          spacing={3}
        >
          <Grid
            md={6}
            xs={12}
            sx={{
              position: 'relative',
              px: 3,
            }}
          >
            <Stack spacing={3}>
              <Typography variant="h2">
                International Destination for Mercedes-Benz automotive
              </Typography>
              <Typography sx={{ fontSize: '1.5rem', fontWeight: theme.typography.fontWeightLight }}>
                Catering to discerning customers from over 50 countries worldwide, Kojak-Exclusive
                has established itself as a global leader in the luxury automotive industry. Our
                commitment to delivering top-tier Mercedes-Benz vehicles and unrivaled service knows
                no borders. With a clientele that spans the globe, we take immense pride in being a
                trusted destination for individuals seeking luxury, quality, and distinction in
                their automotive choices. Our international reach is a testament to the excellence
                we consistently provide, and we look forward to expanding our global family of
                satisfied customers
              </Typography>
              <Box>
                <Button variant="contained" size="large" color="info">
                  Explore Inventory
                </Button>
              </Box>
            </Stack>
          </Grid>

          <Grid md={6} xs={12} sx={{ position: 'relative' }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 2 }}>
              {FACTS.map((fact) => (
                <Stack
                  key={fact.title}
                  spacing={2}
                  justifyContent="center"
                  textAlign="center"
                  alignItems="center"
                  sx={{ border: 'solid 1px #FFFFFF', borderRadius: 1, py: 3 }}
                >
                  <Box>
                    <Iconify icon={fact.icon} width={64} height={64} />
                  </Box>
                  <Typography variant="h4">{fact.title}</Typography>
                </Stack>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
export default InternationalBusiness;
// LandingAbout.propTypes = { tables: PropTypes.array };
