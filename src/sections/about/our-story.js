import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';

import Image from 'src/components/image';
import { bgGradient } from 'src/theme/css';
import CountUp from 'src/components/count-up';
import { fShortenNumber } from 'src/utils/format-number';
import { useResponsive } from 'src/hooks/use-responsive';

// ----------------------------------------------------------------------

const SUMMARY = [
  { name: 'Spare Parts Sold', number: 2214850 },
  { name: 'Global Destination', number: 50 },
  { name: 'Spare Parts In Stock', number: 500000 },
  { name: 'Years in Business', number: 40 },
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

export default function OurStory() {
  const mdUp = useResponsive('up', 'md');
  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <Container
        maxWidth="xl"
        sx={{
          py: 8,
          px: mdUp ? 'unset' : 4,
        }}
      >
        <Typography paragraph variant="overline" color="primary">
          Our Commitment
        </Typography>
        <Typography variant="h1">Our Commitment is Threefold</Typography>
        <Typography>
          {`We invite you to explore our comprehensive online catalog or reach out to our dedicated
            team for personalized assistance. Whether you're a Mercedes-Benz enthusiast or a
            professional mechanic, Kojak Spare Parts is your trusted partner for all your Mercedes
            spare part needs.`}
        </Typography>

        <Section />
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

function Section() {
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
            Our Journey
          </Typography>
          <Typography sx={{ whiteSpace: 'pre-line' }}>
            {`In 1983, Kojak Spare Parts was founded with a singular passion - Mercedes-Benz vehicles. Our founders shared a vision: to provide an extensive selection of top-quality spare parts to ensure that every Mercedes-Benz, from classic models to the latest releases, remains in peak condition.

What began as a modest venture has grown into a global force in the spare parts industry. Located in the thriving city of Sharjah, we've embraced our central position to serve our local clientele with ease while efficiently reaching customers worldwide. Over nearly four decades, we've cultivated expertise and excellence in providing the best Mercedes spare parts.`}
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

              <Typography variant="body2" sx={{ color: 'grey.500' }}>
                {value.name}
              </Typography>
            </Stack>
          ))}
        </Box>
      </Stack>

      <StyledOverlay />

      <Box sx={{ position: 'absolute', width: 1, height: 1, top: 0 }}>
        <Image
          alt="career about"
          src="/assets/images/original/container.jpg"
          sx={{ width: 1, height: 1 }}
        />
      </Box>
    </StyledSection>
  );
}
