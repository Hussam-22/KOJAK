import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import InputBase, { inputBaseClasses } from '@mui/material/InputBase';

import Image from 'src/components/image';
import { useLocales } from 'src/locales';

// ----------------------------------------------------------------------

export default function JoinNewsletter() {
  const { translate } = useLocales();
  return (
    <Box
      sx={{
        py: { xs: 5, md: 10 },
        overflow: 'hidden',
        bgcolor: 'background.neutral',
      }}
    >
      <Container>
        <Grid
          container
          spacing={{ xs: 5, md: 3 }}
          alignItems={{ md: 'center' }}
          justifyContent={{ md: 'space-between' }}
          direction={{ xs: 'column-reverse', md: 'row' }}
        >
          <Grid xs={12} md={5} sx={{ textAlign: 'center', color: 'grey.800' }}>
            <Typography variant="h3">{translate('newsLetter.title')}</Typography>

            <Typography sx={{ mt: 2.5, mb: 5 }}>{translate('newsLetter.subTitle')}</Typography>

            <InputBase
              fullWidth
              placeholder={translate('form.email')}
              endAdornment={
                <InputAdornment position="end">
                  <Button color="primary" size="large" variant="contained">
                    {translate('form.register')}
                  </Button>
                </InputAdornment>
              }
              sx={{
                pr: 0.5,
                pl: 1.5,
                height: 56,
                maxWidth: 560,
                borderRadius: 1,
                bgcolor: 'common.white',
                transition: (theme) => theme.transitions.create(['box-shadow']),
                [`&.${inputBaseClasses.focused}`]: {
                  boxShadow: (theme) => theme.customShadows.z4,
                },
              }}
            />
          </Grid>

          <Grid xs={12} md={5}>
            <Image
              alt="newsletter"
              src="/assets/illustrations/illustration_newsletter.svg"
              sx={{ maxWidth: 366, mx: 'auto' }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
