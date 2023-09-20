import { Masonry } from '@mui/lab';
import { Stack, Container, Typography } from '@mui/material';

import { useLocales } from 'src/locales';
import Image from 'src/components/image/Image';
import { useResponsive } from 'src/hooks/use-responsive';

export default function ServicesAbout() {
  const { translate } = useLocales();
  const mdUp = useResponsive('up', 'md');
  return (
    <Container sx={{ py: 5 }}>
      <Stack spacing={3} sx={{ textAlign: 'center', mb: 5 }}>
        <Typography variant="h1">{translate('services.howItWork')}</Typography>
        <Typography>{translate('services.description')}</Typography>
      </Stack>

      <Masonry
        columns={{ xs: 1, sm: 2, md: 3 }}
        spacing={1}
        defaultColumns={1}
        defaultSpacing={4}
        sx={{
          mx: { xs: 'unset', sm: 0 },
        }}
      >
        {[...Array(mdUp ? 6 : 1)].map((_, index) => (
          <Image
            src={`/assets/images/original/${index + 1}.webp`}
            alt={`service-page-image-${index + 1}`}
            key={index}
          />
        ))}
      </Masonry>
    </Container>
  );
}

// ['4/3', '3/4', '6/4', '4/6', '16/9', '9/16', '21/9', '9/21', '1/1']
