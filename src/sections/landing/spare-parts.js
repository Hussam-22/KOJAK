import { Box, Stack, Button, useTheme, Container, Typography } from '@mui/material';

import { useLocales } from 'src/locales';
import Image from 'src/components/image/Image';

export default function SpareParts() {
  const theme = useTheme();
  const { translate } = useLocales();
  return (
    <Box
      sx={{
        bgcolor: 'background.neutral',
        py: 8,
      }}
    >
      <Container maxWidth="xl" sx={{ height: 1 }}>
        <Stack
          sx={{
            textAlign: 'center',
          }}
          spacing={3}
        >
          <Typography variant="h2">{translate('landing.spareParts.mainText')}</Typography>
          <Typography variant="body1">{translate('landing.spareParts.subText')}</Typography>

          <Box
            sx={{
              // bgcolor: 'background.paper',
              borderRadius: 2,
              px: 1,
            }}
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { md: 'repeat(4,1fr)', xs: 'repeat(2,1fr)' },
                gap: 1,
                my: 6,
              }}
            >
              {[...Array(8)].map((part, index) => (
                <Image
                  key={`/assets/images/parts/part-${index + 1}.webp`}
                  src={`/assets/images/parts/part-${index + 1}.webp`}
                  alt={`car-part-${index + 1}`}
                  sx={{ borderRadius: 1 }}
                />
              ))}
            </Box>
          </Box>

          <Box>
            <Button
              variant="contained"
              size="large"
              color="secondary"
              sx={{ bgcolor: 'custom.spareParts' }}
              // onClick={() => navigate(paths.website.bookAppointment)}
            >
              {translate('landing.spareParts.buttonText')}
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
