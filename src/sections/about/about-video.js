/* eslint-disable jsx-a11y/media-has-caption */
// @mui
import { Stack, Container, Typography } from '@mui/material';

// Hooks
import { useLocales } from 'src/locales';

// ----------------------------------------------------------------------

export default function AboutVideo() {
  const { translate } = useLocales();

  return (
    <Container sx={{ py: 4 }}>
      <Stack spacing={6} sx={{ textAlign: 'center' }}>
        <Stack spacing={3}>
          <Typography variant="h2" sx={{ color: 'primary.main' }}>
            Behind the Scenes at Kojak
          </Typography>

          {/* <Typography variant="h5"></Typography> */}
        </Stack>

        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{ position: 'relative', width: 1, borderRadius: 2, overflow: 'hidden' }}
        >
          <video width="100%" height="25%" muted loop autoPlay playsInline>
            <source src="/assets/demo-video.mp4" type="video/webm" />
            Your browser does not support the video tag.
          </video>
          {/* <Player controls url="/assets/videos/students_class.mp4" /> */}
        </Stack>
      </Stack>
    </Container>
  );
}
