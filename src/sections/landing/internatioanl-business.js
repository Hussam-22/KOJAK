import { Box, Stack, Button, useTheme, Container, Typography } from '@mui/material';

import { useLocales } from 'src/locales';
import CountUp from 'src/components/count-up/count-up';
import { useResponsive } from 'src/hooks/use-responsive';

const SUMMARY = [
  { name: 'fact1', number: 40 },
  { name: 'fact2', number: 3022 },
  { name: 'fact3', number: 8450 },
  { name: 'fact4', number: 50 },
];

function InternationalBusiness() {
  const theme = useTheme();
  const { translate } = useLocales();
  const mdUp = useResponsive('up', 'md');
  return (
    <Box
      sx={{
        position: 'relative',
        bgcolor: 'primary.main',
        py: { md: 20, xs: 10 },
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          alignItems: 'center',
          justifyContent: 'left',
          height: '100%',
          backgroundImage: mdUp && 'url(/assets/illustrations/illustration_map.svg)',
          backgroundSize: 'contain',
          backgroundPosition: 'right',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Stack spacing={3} sx={{ maxWidth: { md: '60%' } }}>
          <Typography variant="h2" color="white">
            {translate('landing.international.title')}
          </Typography>
          <Typography
            color="white"
            sx={{
              fontWeight: theme.typography.fontWeightLight,
            }}
          >
            {translate('landing.international.subTitle')}
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { md: 'repeat(4,auto)', xs: 'repeat(2,auto)' },
              gap: 4,
              mt: 2,
            }}
          >
            {SUMMARY.map((value) => (
              <Stack key={value.name} spacing={1}>
                <Typography variant="h2" color="secondary">
                  <CountUp
                    start={value.number / 5}
                    end={value.number}
                    formattingFn={(newValue) => newValue}
                  />

                  <Typography variant="h3" component="span" sx={{ verticalAlign: 'top', ml: 0.5 }}>
                    +
                  </Typography>
                </Typography>

                <Typography variant="h6" color="white">
                  {translate(`why.${value.name}`)}
                </Typography>
              </Stack>
            ))}
          </Box>

          <Box sx={{ textAlign: { md: 'left', xs: 'center' } }}>
            <Button variant="contained" size="large" color="secondary">
              {translate('common.actionButton')}
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
export default InternationalBusiness;
// LandingAbout.propTypes = { tables: PropTypes.array };
