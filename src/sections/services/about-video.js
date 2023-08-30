import { Masonry } from '@mui/lab';
import { Stack, Container, Typography } from '@mui/material';

import { useLocales } from 'src/locales';
import Image from 'src/components/image/Image';

export default function ServicesAbout() {
  const { translate } = useLocales();
  return (
    <Container sx={{ py: 5 }}>
      <Stack spacing={3} sx={{ textAlign: 'center', mb: 5 }}>
        <Typography variant="h1">{translate('services.howItWork')}</Typography>
        <Typography>{translate('services.description')}</Typography>
      </Stack>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ position: 'relative', width: 1, borderRadius: 2, overflow: 'hidden' }}
      >
        {/* <video width="100%" height="25%" muted loop autoPlay playsInline>
          <source src="/assets/demo-video.mp4" type="video/webm" />
          Your browser does not support the video tag.
        </video> */}
        <Masonry
          columns={{ xs: 1, sm: 2, md: 3 }}
          spacing={1}
          defaultColumns={1}
          defaultSpacing={4}
          sx={{
            mx: { xs: 'unset', sm: 0 },
          }}
        >
          {[...Array(6)].map((_, index) => (
            <Image
              src={`/assets/images/original/${index + 1}.webp`}
              alt={`service-page-image-${index + 1}`}
              key={index}
            />
          ))}
        </Masonry>
      </Stack>
    </Container>
  );
}

// ['4/3', '3/4', '6/4', '4/6', '16/9', '9/16', '21/9', '9/21', '1/1']
