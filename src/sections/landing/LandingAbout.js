import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Card, useTheme } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useLocales } from 'src/locales';
import Image from 'src/components/image/Image';

// ----------------------------------------------------------------------

const CORE_VALUES = [
  'Transparent_Transactions',
  'Customer_Satisfaction',
  'Prime_Locations',
  'Unbeatable_Prices',
];

// ----------------------------------------------------------------------

export default function LandingAbout() {
  const theme = useTheme();
  const { translate } = useLocales();
  return (
    <Container maxWidth="xl" sx={{ py: 15 }}>
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
          }}
        >
          <Typography variant="h2" sx={{ textTransform: 'capitalize' }}>
            {translate('why.title')}
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: theme.typography.fontWeightLight }}>
            {translate('why.subTitle')}
          </Typography>
        </Stack>
        <Image src="/assets/images/advisor/advisor-1.png" />
      </Box>
    </Container>
  );
}
