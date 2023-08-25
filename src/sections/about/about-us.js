import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';

import { useLocales } from 'src/locales';
import Image from 'src/components/image';
import { bgGradient } from 'src/theme/css';
import CountUp from 'src/components/count-up';
import { fShortenNumber } from 'src/utils/format-number';

// ----------------------------------------------------------------------

const SUMMARY = [
  { name: 'carsRepaired', number: 3200 },
  { name: 'happyCustomers', number: 2800 },
  { name: 'technicians', number: 22 },
  { name: 'experience', number: 12 },
];

// ----------------------------------------------------------------------

const StyledSection = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  borderRadius: theme.shape.borderRadius * 2,
  marginTop: theme.spacing(5),
  [theme.breakpoints.up('md')]: {
    marginTop: theme.spacing(10),
  },
}));

const StyledOverlay = styled('div')(({ theme }) => ({
  ...bgGradient({
    startColor: `${alpha(theme.palette.common.black, 0)} 0%`,
    endColor: `${theme.palette.common.black} 75%`,
  }),
  top: 0,
  left: 0,
  zIndex: 8,
  width: '100%',
  height: '100%',
  position: 'absolute',
  [theme.breakpoints.up('md')]: {
    right: 0,
    width: '75%',
    left: 'auto',
  },
  [theme.breakpoints.up('lg')]: {
    width: '50%',
  },
}));

// ----------------------------------------------------------------------

export default function CareerAbout() {
  return (
    <Container
      sx={{
        pt: 5,
        pb: { xs: 5, md: 10 },
      }}
    >
      <Typography variant="h1" sx={{ textAlign: 'center', mb: 2 }}>
        We Make The Best For All Our Customers.
      </Typography>
      <Typography sx={{ textAlign: 'center' }}>
        Welcome to Kojak Auto Maintenance, where automotive excellence meets a passion for
        precision. At Kojak, we take pride in being the premier destination for Mercedes enthusiasts
        in UAE seeking top-notch service and care for their luxury vehicles.
      </Typography>
      <Section />
    </Container>
  );
}

// ----------------------------------------------------------------------

function Section() {
  const { translate } = useLocales();
  return (
    <StyledSection>
      <Stack
        sx={{
          py: 10,
          zIndex: 9,
          ml: 'auto',
          position: 'relative',
          px: { xs: 2.5, md: 10 },
          width: { md: 0.75, lg: 0.5 },
        }}
      >
        <Stack
          sx={{
            mb: 5,
            color: 'common.white',
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Typography variant="h2" paragraph>
            The numbers speaks itself
          </Typography>
          <Typography>
            {` Founded in 2001, Kojak Auto Maintenance has established itself as the region's leading authority on Mercedes-Benz vehicles. With a team of Mercedes-certified technicians and cutting-edge diagnostic equipment, we provide specialized services that cater exclusively to the unique needs of Mercedes owners.`}
          </Typography>
        </Stack>

        <Box
          sx={{
            gap: 5,
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          {SUMMARY.map((value) => (
            <Stack key={value.name} spacing={1}>
              <Typography variant="h2" sx={{ color: 'primary.main' }}>
                <CountUp
                  start={value.number / 5}
                  end={value.number}
                  formattingFn={(newValue) => fShortenNumber(newValue)}
                />

                <Typography variant="h3" component="span" sx={{ verticalAlign: 'top', ml: 0.5 }}>
                  +
                </Typography>
              </Typography>

              <Typography>{translate(`hero.${value.name}`)}</Typography>
            </Stack>
          ))}
        </Box>
      </Stack>

      <StyledOverlay />

      <Box sx={{ position: 'absolute', width: 1, height: 1, top: 0 }}>
        <Image
          alt="career about"
          src="/assets/images/repair/repair-img-2.jpg"
          sx={{ width: 1, height: 1 }}
        />
      </Box>
    </StyledSection>
  );
}
