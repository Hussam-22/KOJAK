import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import { Divider, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

import { useLocales } from 'src/locales';
import Image from 'src/components/image/Image';
import { useResponsive } from 'src/hooks/use-responsive';

const DATA = [
  {
    title: 'Global Leadership',
    description:
      'Our vision is to lead the global market in providing authentic Mercedes spare parts, setting new industry standards and connecting with customers all over the world.',
    icon: 'icon-global-leadership', // Replace with the actual icon name or URL
  },
  {
    title: 'Authentic Excellence',
    description:
      'We aspire to ensure the authenticity and quality of every Mercedes spare part we offer, establishing ourselves as the ultimate source for genuine Mercedes-Benz components.',
    icon: 'icon-authentic-excellence', // Replace with the actual icon name or URL
  },
  {
    title: 'Affordability',
    description:
      'Our vision is to provide competitive pricing without compromising quality, making excellence affordable for all Mercedes owners and professionals.',
    icon: 'icon-affordability', // Replace with the actual icon name or URL
  },
  {
    title: 'Customer Satisfaction',
    description:
      'We aim to build lasting relationships with our customers by offering a seamless and satisfying experience, complete with expert guidance and support for their Mercedes vehicles.',
    icon: 'icon-customer-satisfaction', // Replace with the actual icon name or URL
  },
  {
    title: 'Global Reach',
    description:
      'Our goal is to expand our global reach, connecting with more Mercedes-Benz enthusiasts and professionals worldwide, making genuine Mercedes spare parts accessible to all Mercedes vehicle owners.',
    icon: 'icon-global-reach', // Replace with the actual icon name or URL
  },
  {
    title: 'Innovation Focus',
    description:
      'We are dedicated to embracing innovation and staying at the forefront of the Mercedes spare parts industry, adapting to the evolving automotive landscape and customer preferences.',
    icon: 'icon-innovation', // Replace with the actual icon name or URL
  },
];

export default function Vision() {
  const { translate } = useLocales();
  const mdUp = useResponsive('up', 'md');
  const theme = useTheme();
  return (
    <Box
      sx={{
        py: 8,
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid md={12} xs={12} sx={{ p: 4 }}>
            <Stack spacing={3} direction="column" justifyContent={{ md: 'space-between' }}>
              <Box>
                <Typography variant="overline" color="primary">
                  {translate('about.vision')}
                </Typography>
                <Typography variant="h1">Turning vision into a reality</Typography>
              </Box>
              <Typography>
                At Kojak Spare Parts, we envision a future where every Mercedes-Benz owner and
                professional can easily access the finest spare parts and components to maintain and
                enhance their vehicles. We are committed to being the driving force behind this
                vision, consistently striving to:
              </Typography>
            </Stack>

            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 3, mt: 4 }}>
              {DATA.map((item, index) => (
                <Box sx={{ border: 'dashed 1px #333', p: 3, borderRadius: 3 }}>
                  <Typography variant="h5" sx={{ color: 'info.main' }}>
                    {item.title}
                  </Typography>
                  <Typography sx={{ fontWeight: theme.typography.fontWeightLight }}>
                    {item.description}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
