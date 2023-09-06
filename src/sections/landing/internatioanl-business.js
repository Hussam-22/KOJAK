import { Box, Stack, Button, useTheme, Container, Typography } from '@mui/material';

import { useLocales } from 'src/locales';
import Iconify from 'src/components/iconify/Iconify';
import { useResponsive } from 'src/hooks/use-responsive';

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
        // background: `linear-gradient(45deg, ${theme.palette.grey[900]}, ${theme.palette.primary.dark})` /* fallback for old browsers */,
        py: 8,
        bgcolor: 'primary.lighter',
        mb: 8,
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          alignItems: 'center',
          justifyContent: 'left',
          height: '100%',
          backgroundImage: 'url(/assets/illustrations/illustration_map.svg)',
          backgroundSize: 'contain',
          backgroundPosition: 'right',
          backgroundRepeat: 'no-repeat',
          // py: 8,
        }}
      >
        <Stack spacing={3} sx={{ maxWidth: '60%' }}>
          <Typography variant="h2">
            International Destination for Mercedes-Benz automotive
          </Typography>
          <Typography
            sx={{
              fontWeight: theme.typography.fontWeightLight,
            }}
          >
            Catering to discerning customers from over 50 countries worldwide, Kojak-Exclusive has
            established itself as a global leader in the luxury automotive industry. Our commitment
            to delivering top-tier Mercedes-Benz vehicles and unrivaled service knows no borders.
            With a clientele that spans the globe, we take immense pride in being a trusted
            destination for individuals seeking luxury, quality, and distinction in their automotive
            choices. Our international reach is a testament to the excellence we consistently
            provide, and we look forward to expanding our global family of satisfied customers
          </Typography>

          <Box>
            <Button variant="contained" size="large" color="primary">
              Explore Inventory
            </Button>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4,auto)', gap: 0, mt: 2 }}>
            {FACTS.map((fact) => (
              <Stack key={fact.title} spacing={2} textAlign="center">
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Iconify
                    icon={fact.icon}
                    width={32}
                    height={32}
                    sx={{ color: 'secondary.main' }}
                  />
                </Box>
                <Typography variant="h6" sx={{ color: 'secondary.main' }}>
                  {fact.title}
                </Typography>
              </Stack>
            ))}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
export default InternationalBusiness;
// LandingAbout.propTypes = { tables: PropTypes.array };
