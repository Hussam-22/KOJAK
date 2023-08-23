import Box from '@mui/material/Box';
import { alpha } from '@mui/system';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Card, Button, useTheme } from '@mui/material';

import { useLocales } from 'src/locales';
import Image from 'src/components/image/Image';

// ----------------------------------------------------------------------

const SUMMARY = [
  { label: 'happyCustomers', value: 2800, icon: 'ion:happy-outline' },
  { label: 'carsRepaired', value: 3200, icon: 'solar:document-outline' },
  { label: 'experience', value: 12, icon: 'bx:building-house' },
];

// ----------------------------------------------------------------------

export default function LandingAbout() {
  const theme = useTheme();
  const { translate } = useLocales();
  return (
    <Container maxWidth="xl" sx={{ py: 10 }}>
      <Box
        sx={{
          // width: '85%',
          borderLeft: `solid 4px ${theme.palette.primary.main}`,
          mx: 'auto',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          // bgcolor: 'secondary.main',
          bgcolor: 'background.neutral',
          px: 2,
        }}
      >
        <Stack
          spacing={3}
          direction="column"
          justifyContent={{ md: 'space-between' }}
          sx={{
            my: 8,
            maxWidth: { md: '55%', xs: '100%' },
            textAlign: { md: 'left', xs: 'center' },
            ml: 4,
          }}
        >
          <Typography variant="h2" sx={{ textTransform: 'capitalize' }}>
            {translate('why.title')}
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: theme.typography.fontWeightLight }}>
            {translate('why.subTitle')}
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3,1fr)',
            }}
          >
            {SUMMARY.map((item, index) => (
              <Stack
                key={item.value}
                spacing={0.5}
                sx={{
                  position: 'relative',
                  textAlign: 'center',
                  justifySelf: 'start',
                }}
              >
                <Typography
                  // variant="h4"
                  color="primary"
                  sx={{
                    fontSize: '3rem',
                    WebkitTextStroke: `1px ${alpha(theme.palette.primary.main, 1)}`,
                    color: alpha(theme.palette.background.default, 0),
                  }}
                >
                  {item.value}+
                </Typography>
                <Typography variant="h5">{translate(`hero.${item.label}`)}</Typography>
              </Stack>
            ))}
          </Box>
        </Stack>
        <Image src="/assets/images/advisor/advisor-1.png" />
      </Box>
    </Container>
  );
}
