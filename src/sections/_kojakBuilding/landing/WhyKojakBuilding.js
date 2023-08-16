import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Card, useTheme } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useLocales } from 'src/locales';
import Image from 'src/components/image/Image';
import { useResponsive } from 'src/hooks/use-responsive';

// ----------------------------------------------------------------------

const CORE_VALUES = [
  'Transparent_Transactions',
  'Customer_Satisfaction',
  'Prime_Locations',
  'Unbeatable_Prices',
];

// ----------------------------------------------------------------------

export default function WhyKojakBuilding() {
  const theme = useTheme();
  const { translate } = useLocales();
  return (
    <Container maxWidth="xl" sx={{ my: 15 }}>
      <Stack
        spacing={3}
        direction="column"
        justifyContent={{ md: 'space-between' }}
        sx={{
          my: 8,
          maxWidth: { md: '60%', xs: '100%' },
          textAlign: { md: 'left', xs: 'center' },
        }}
      >
        <Typography variant="h2" sx={{ textTransform: 'capitalize' }}>
          {translate('why.title')}
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: theme.typography.fontWeightLight }}>
          {translate('why.subTitle')}
        </Typography>
      </Stack>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { md: 'repeat(4,1fr)', xs: 'repeat(1,1fr)' },
          gap: 3,
        }}
      >
        {CORE_VALUES.map((value, index) => (
          <Card
            key={value.title}
            sx={{
              textAlign: 'center',
              p: 3,
              bgcolor: 'primary.lighter',
            }}
          >
            <Image src={`/assets/kojak-building/illustration/${value}.svg`} alt={value} />

            <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
              {translate(`why.cards.${index + 1}.title`)}
            </Typography>

            <Typography sx={{ fontWeight: theme.typography.fontWeightLight }}>
              {translate(`why.cards.${index + 1}.subTitle`)}
            </Typography>
          </Card>
        ))}
      </Box>
    </Container>
  );
}
