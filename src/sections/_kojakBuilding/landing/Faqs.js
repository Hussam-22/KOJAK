import { m } from 'framer-motion';
import { useNavigate } from 'react-router';

import { useTheme } from '@mui/system';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import { Box, Card, Button } from '@mui/material';
import Typography from '@mui/material/Typography';

import { useLocales } from 'src/locales';
import { paths } from 'src/routes/paths';
import { varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

export default function FAQs() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { translate } = useLocales();

  return (
    <Box sx={{ bgcolor: 'background.neutral', overflow: 'hidden' }}>
      <Container
        sx={{
          py: 10,
        }}
        maxWidth="xl"
      >
        <Stack direction="column" spacing={5}>
          <Box
            sx={{ maxWidth: { md: '60%', xs: '100%' }, textAlign: { md: 'left', xs: 'center' } }}
          >
            <Typography variant="h2" sx={{ color: 'common.black', mb: 3 }}>
              {translate('faq.title')}
            </Typography>
            <Typography
              sx={{ color: 'common.black', fontWeight: theme.typography.fontWeightLight }}
            >
              {translate('faq.subTitle')}
            </Typography>
          </Box>

          <Box
            sx={{
              rowGap: 2.5,
              columnGap: 3,
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',
                md: 'repeat(3, 1fr)',
              },
            }}
          >
            {[...Array(6)].map((_, index) => (
              <Card sx={{ p: 3 }} key={index}>
                <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
                  {translate(`faq.${index + 1}.question`)}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ textAlign: 'center', fontWeight: theme.typography.fontWeightLight }}
                >
                  {translate(`faq.${index + 1}.answer`)}
                </Typography>
              </Card>
            ))}
          </Box>
        </Stack>

        <Box sx={{ mt: 10, textAlign: 'center' }}>
          <Typography variant="h2">{translate('faq.join')}</Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ px: 4, typography: 'h4', mt: 2 }}
            onClick={() => navigate(paths.website.properties)}
          >
            {translate('common.exploreProperties')}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
